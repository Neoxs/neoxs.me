---
title: "Securing a production app: what I learned by asking the right questions"
date: "2026-05-05"
description: "I ran a security audit on this portfolio — running on a public GitHub repo and a VPS — and fixed 16 real issues. I am not a security expert. I just stopped ignoring the subject."
tags: ["security", "devops", "kubernetes", "docker", "nginx", "github-actions", "learning"]
readingTime: 18
---

## The honest starting point

I want to be upfront about something before this post goes anywhere: I am not a security engineer. I do not have a background in penetration testing or threat modeling. I am a developer who is learning in public, using AI as a learning tool, and trying to understand — not just copy — what good practices look like.

What pushed me to do this was a simple question I asked about my own app: *is this actually secure?*

The app is this portfolio. It runs on a public GitHub repository. It deploys to a VPS over Kubernetes. The source code, infrastructure configuration, CI/CD pipelines, and Helm charts are all public. Anyone can read them.

That last part is what made me pause.

I went through the entire codebase looking at it through a security lens, found 16 issues of varying severity, and fixed all of them in one session. This post explains what each issue was, why it mattered, and how we fixed it — at a level that would have made sense to me six months ago.

---

## How to think about security (the mental model I actually use)

Security is not a checklist you run once before deploying. It is a set of *layers*. Each layer assumes the previous one might fail.

The classic way to phrase this is **defence in depth**. If an attacker gets through your firewall, your application should still limit what they can do. If they exploit a bug in your application, the container it runs in should limit what they can touch. If they escape the container, the host operating system should limit what they can reach.

None of those layers are perfect. Together, they make an attack significantly harder.

When I look at any app I have deployed, I think in three zones:

1. **What is reachable from the internet?** (attack surface)
2. **If something goes wrong, how far can the damage spread?** (blast radius)
3. **How quickly would I know?** (visibility)

This portfolio had a larger attack surface and blast radius than I realised. The visibility was basically zero. Let me walk through what we found.

---

## The issues, explained

### Missing Content-Security-Policy (the big one)

**What it is.** The browser has a security mechanism called Content Security Policy (CSP). You send it as an HTTP header. It tells the browser: "this page is only allowed to load scripts from these sources, images from these sources, and so on." If an attacker manages to inject a `<script>` tag into your page — through a comment section, a compromised npm package, or anything else — CSP stops that script from running.

**Why it mattered here.** This app had none. No CSP header at all. The nginx config and the Kubernetes ConfigMap that injects security headers into every response were both missing it.

**The fix.** We added it to both places: the `docker/nginx/nginx.conf` (used in development and E2E tests) and the `security-headers` ConfigMap in the Helm chart (used in production on Kubernetes).

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

A note on `'unsafe-inline'` and `'unsafe-eval'`: Next.js and Nuxt both generate inline scripts during hydration. Without nonces (a more advanced technique), you need these flags or the frameworks will break. This is not ideal — the goal is eventually to move to nonce-based CSP — but `'unsafe-inline'` with `frame-ancestors 'none'` is still far better than no CSP at all. Start here, tighten later.

---

### Containers running as root

**What it is.** Docker containers run as root by default. The `root` user inside a container is the same Linux user ID (0) as root on the host system. Container isolation is not perfect, and historically there have been escapes. Running as root makes the consequences of an escape catastrophic — the attacker has root on your VPS.

**Why it mattered here.** All four of our Dockerfiles — `shell`, `mfe-blog`, `mfe-lab`, `mfe-infra` — had no `USER` directive in the runtime stage. Every process ran as root.

**The fix for the Node.js containers** (`shell` and `mfe-blog`) was to create a dedicated, unprivileged system user in the Dockerfile and switch to it before the final command:

```dockerfile
RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app/apps/shell/.next/standalone ./
# ...

RUN chown -R app:app /app
USER app
```

`-S` creates a system account (no home directory, no shell, no password). The `chown` step is critical — if the files are owned by root, the `app` user will not be able to read them.

**The fix for the nginx containers** (`mfe-lab` and `mfe-infra`) is slightly different. The `nginx` binary needs to run as root initially to bind to ports and manage worker processes. Worker processes then drop to the `nginx` user automatically. This is normal nginx behaviour and is not a mistake. What we did instead was ensure the static files are owned by the nginx user:

```dockerfile
RUN chown -R nginx:nginx /usr/share/nginx/html/lab
```

---

### No pod securityContext in Kubernetes

**What it is.** Kubernetes has a `securityContext` field in the pod spec that lets you harden the container at the OS level — independent of the Dockerfile. Even if you forget to harden the image, you can enforce constraints from the outside.

**Why it mattered here.** None of the four Helm deployment templates had a `securityContext`. The pods ran with the default Kubernetes settings, which allow privilege escalation, all Linux capabilities, and a writable root filesystem.

**The fix.** We added a `securityContext` block to every container spec.

For the Node.js pods (which now run as a non-root user thanks to the Dockerfile change):

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop: [ALL]
  seccompProfile:
    type: RuntimeDefault
```

Let me explain each line:

- `runAsNonRoot: true` — Kubernetes will refuse to start the container if the image runs as root. This is a safety net on top of the Dockerfile change.
- `runAsUser: 1000` — The UID the process runs as. Alpine's system users typically land in the 1000 range.
- `allowPrivilegeEscalation: false` — Prevents the process from gaining more privileges than its parent. This blocks `sudo` and setuid binaries.
- `readOnlyRootFilesystem: true` — The container's filesystem is mounted read-only. A compromised process cannot write backdoors, modify binaries, or persist malware.
- `capabilities: drop: [ALL]` — Linux capabilities are a fine-grained permission system that sits below root. Even root processes only get the capabilities they need. Dropping all of them and adding none means the process has no special kernel permissions at all.
- `seccompProfile: type: RuntimeDefault` — Restricts which system calls the process can make to the kernel. The runtime default profile blocks the most dangerous syscalls.

For the nginx pods, we cannot set `runAsNonRoot` or `readOnlyRootFilesystem` (nginx master needs root and a writable PID file), but we still drop all unnecessary capabilities:

```yaml
securityContext:
  allowPrivilegeEscalation: false
  capabilities:
    drop: [ALL]
    add: [CHOWN, SETUID, SETGID, DAC_OVERRIDE]
  seccompProfile:
    type: RuntimeDefault
```

---

### Missing HSTS

**What it is.** HTTPS is enabled via cert-manager and Let's Encrypt. That is great. But the browser does not know the site should *always* be HTTPS until it has visited once and received the right header. Without `Strict-Transport-Security`, an attacker positioned between a user and the server on their first visit can potentially strip TLS (redirect them from `https://` to `http://` before the browser notices). This is called an SSL-stripping attack.

**The fix.** One header:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

`max-age=31536000` tells the browser to remember "this site is HTTPS only" for one year. `includeSubDomains` applies the rule to all subdomains.

---

### Personal email committed in a public repo

**Why it mattered.** The cert-manager Let's Encrypt configuration (`clusterissuer.yaml`, `values.production.yaml`, `values.staging.yaml`) had a real email address hardcoded in the repository. This is a public repo. That email is now indexed by GitHub search, bots, spam databases, and anyone who has ever cloned the repo.

**The fix.** We replaced every occurrence with a placeholder and moved the real value to a GitHub Actions secret (`CERT_EMAIL`). The deploy workflow now injects it at runtime:

```yaml
--set certManager.email="${CERT_EMAIL}"
```

The rule here is simple: *anything with a consequence if seen by a stranger does not belong in source code.* An email address is borderline, but the principle is the same as for passwords and API keys.

---

### Deploy workflow accepting `:latest` tags on production

**What it is.** The deploy workflow let you trigger a production deploy with all image tags defaulting to `latest`. The `:latest` tag is a moving target — it is whatever was last pushed to that image name. If you deploy `:latest` without knowing what it points to, you might deploy an image that has not passed tests, or one that was updated between CI and deploy.

**The fix.** We made the tag inputs required (no defaults) and added a validation step that refuses to proceed if any tag is `latest` when the environment is `production`:

```yaml
- name: Reject :latest tag on production
  if: inputs.environment == 'production'
  run: |
    for tag in "${{ inputs.shell_tag }}" "${{ inputs.mfe_blog_tag }}" ...
    do
      if [ "$tag" = "latest" ]; then
        echo "::error::':latest' tags are not allowed on production."
        exit 1
      fi
    done
```

In production, you should always deploy a specific `sha-abc1234` tag that traces back to a known commit and a passed CI run. This makes every deploy reproducible and auditable.

---

### No rate limiting

**What it is.** Without rate limiting, a single client can make thousands of requests per second to your server. The Nuxt Content API at `/api/_content/` is a real server-side endpoint. The Next.js SSR routes do real work on every request. There is no database, but sustained traffic can still exhaust CPU and memory on a small VPS.

**The fix.** Two annotations on the Kubernetes Ingress resource:

```yaml
nginx.ingress.kubernetes.io/limit-rps: "20"
nginx.ingress.kubernetes.io/limit-connections: "10"
```

This limits each source IP to 20 requests per second and 10 simultaneous connections. Legitimate users will never notice. Automated scanners and simple floods will be throttled immediately.

---

### No NetworkPolicy

**What it is.** By default, every pod in a Kubernetes namespace can talk to every other pod freely. If the `mfe-lab` nginx container is somehow compromised, it can make HTTP requests to the `mfe-blog` Nitro server, the `shell` Next.js server, or anything else in the cluster. This is called lateral movement — an attacker pivoting from one compromised component to others.

**The fix.** We added a `NetworkPolicy` Helm template that implements default-deny and then explicitly allows only the traffic that should exist:

- ingress-nginx controller → all pods (so external traffic still works)
- `shell` → `mfe-blog`, `mfe-lab`, `mfe-infra` (so Next.js server-side proxy rewrites work)
- Everything else is denied by default

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}
  policyTypes:
    - Ingress
```

An empty `podSelector` matches all pods. An empty `ingress` list means no ingress is allowed. We then layer explicit allow policies on top. This is the correct default-deny pattern.

---

### KUBECONFIG with full cluster access in CI

**What it is.** The deploy workflow injects a `KUBECONFIG` from a GitHub Actions secret and uses it to run `helm upgrade`. If that kubeconfig belongs to a cluster-admin account — which is the path of least resistance when setting up a new cluster — then a leak of that secret gives an attacker full root access to your Kubernetes cluster.

**Why I have not fully fixed this yet.** This one requires creating a Kubernetes ServiceAccount with a restricted Role, generating a new kubeconfig scoped to that account, and replacing the existing secret. It is the right thing to do but requires care to not accidentally lock yourself out of CD. I have it on the list and will document the full process in a future post.

**The principle.** The deploy workflow only needs to do one thing: run `helm upgrade`. It does not need to read secrets, delete namespaces, modify RBAC, or do anything else. The RBAC role should reflect that.

---

### No dependency vulnerability scanning in CI

**What it is.** The CI pipeline ran tests but never checked whether any of the npm packages had known security vulnerabilities. A package you installed six months ago might have a published CVE today.

**The fix: two steps.**

First, we added `pnpm audit` to the test workflow:

```yaml
- name: Audit dependencies for known vulnerabilities
  run: pnpm audit --audit-level=high
```

This checks every package in the lockfile against the npm advisory database and fails the build if any high or critical vulnerabilities are found.

Second, we added a Trivy scan to the Docker build workflow, which runs after the image is pushed:

```yaml
- name: Scan image for vulnerabilities (Trivy)
  uses: aquasecurity/trivy-action@v0.36.0
  with:
    image-ref: ${{ inputs.image }}:sha-${{ github.sha }}
    format: table
    exit-code: 1
    severity: CRITICAL,HIGH
    ignore-unfixed: true
```

Trivy scans the container image itself — not just the npm packages, but also the OS packages inside the Alpine base image. `ignore-unfixed: true` means it only fails on vulnerabilities that have a fix available, avoiding noise from vulnerabilities where there is nothing you can do yet.

---

### VPS IP address in a public blog post

**What it is.** The previous deployment blog post included the real VPS IP address in mermaid diagrams, SSH commands, DNS examples, and troubleshooting output. That IP was in the public GitHub repository.

**Why this is a problem.** Automated scanners harvest IPs from public repositories constantly. Having your VPS IP in a public post is an invitation for port scanning, brute-force SSH attempts, and reconnaissance. It also reveals the specific infrastructure behind the domain, which is useful information for targeted attacks.

**The fix.** We replaced all occurrences with `<YOUR_VPS_IP>`. The examples are still clear and useful — they just do not expose the real address.

---

### Nuxt devtools enabled unconditionally

**What it is.** The Nuxt configuration had `devtools: { enabled: true }`. Nuxt DevTools are a development tool that exposes internal app state, component trees, data stores, and server routes in a browser panel. Nuxt typically disables them in production builds, but relying on that implicit behaviour is fragile.

**The fix.** We made it explicit:

```typescript
devtools: { enabled: process.env.NODE_ENV !== 'production' },
```

Now the code clearly states the intent. If something ever changes about how Nuxt detects the environment, this line is the source of truth.

---

### Staging using the production Let's Encrypt issuer

**What it is.** The Let's Encrypt production API has rate limits — 50 certificates per registered domain per week. The staging API has no meaningful limits but issues untrusted certificates (which is fine for testing). The staging Helm values were pointing at the production ClusterIssuer, meaning every failed staging cert attempt counted against the production quota.

**The fix.** One line change in `values.staging.yaml`:

```yaml
certManager:
  clusterIssuer: letsencrypt-staging  # was: letsencrypt-prod
```

---

### /healthz reachable from the internet

**What it is.** The nginx health check endpoint (`/healthz`) returns a plain `200 OK`. From a K8s perspective, probes use the internal cluster IP so the external path is not needed. From the public internet, it is an endpoint that confirms the app is alive, reveals response headers, and is a minor reconnaissance aid.

**The fix.** We added an Exact-match route at the top of the Ingress rules pointing to a non-existent backend port. Requests to `/healthz` from the internet now receive a 503 instead of a 200.

---

## The three headers everyone should add

Three HTTP security headers are simple, have no compatibility risk, and every production app should have them:

**`X-Frame-Options: SAMEORIGIN`** — Prevents your page from being embedded in an `<iframe>` on another domain. This stops clickjacking attacks where an attacker overlays your UI with a transparent iframe to steal clicks.

**`X-Content-Type-Options: nosniff`** — Prevents the browser from guessing the content type of a response. Without this, a browser might execute a JavaScript file served as `text/plain`. Simple and important.

**`Referrer-Policy: strict-origin-when-cross-origin`** — Controls how much of the current page URL is sent in the `Referer` header when navigating to other sites. This prevents leaking internal paths to third-party domains.

This app already had these three. The gaps were everything else.

---

## What I actually learned

Going through this process taught me something I did not expect: most security issues are not clever or exotic. They are missing defaults. Nobody installed a CSP header because nobody asked "what happens if a script gets injected?" Nobody set `runAsNonRoot` because the container worked without it.

The pattern I keep seeing is: the secure option requires a deliberate extra step, and the insecure option works by default. Root is the default. No rate limiting is the default. No network policy is the default. No vulnerability scanning is the default. Security is the layer you add on top of the thing that just works.

I used AI to help me understand what each issue meant and how to fix it. But the understanding is mine now. I know what a seccomp profile does. I know why dropping Linux capabilities matters. I know the difference between the Let's Encrypt staging and production ACME servers. That knowledge came from engaging with the problem, not just running a tool.

If you are learning to build and deploy things, I would encourage you to do exactly this — pick an app you have deployed, open every config file, and ask "what happens if this is wrong?" You will find things. And fixing them will teach you more than any course.

---

*All changes described in this post are in the public repository. The commit history is the source of truth.*
