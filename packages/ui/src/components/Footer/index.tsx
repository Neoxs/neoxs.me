'use client'

import './index.css'

import { FOOTER_DEPLOY_NOTE } from './constants'

export { FOOTER_DEPLOY_NOTE } from './constants'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  tagline?: string
  nav?: FooterLink[]
  socials?: FooterLink[]
  copyright?: string
  /** Stack or framework for this app, e.g. "Next.js", "Nuxt 3", "React · Vite". */
  builtWith: string
  /** Deploy/runtime note; defaults to k3s + Kubernetes context. */
  deployedOn?: string
}

export function Footer({
  tagline,
  nav = [],
  socials = [],
  copyright,
  builtWith,
  deployedOn = FOOTER_DEPLOY_NOTE,
}: FooterProps) {
  return (
    <footer className="footer">
      {/* Main row */}
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">neoxs.me</div>

          {tagline && (
            <p className="footer-tagline">
              {tagline}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="footer-links">
          {/* Nav links */}
          {nav.length > 0 && (
            <div className="footer-nav">
              {nav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link footer-link-nav"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Social links */}
          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-link-social"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-bottom-text">
          {copyright}
        </span>

        <span className="footer-bottom-text">
          built with {builtWith} · {deployedOn}
        </span>
      </div>
    </footer>
  )
}