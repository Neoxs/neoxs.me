{{/*
_helpers.tpl — reusable template snippets.
Helm includes these with `include "name" context`.
The leading/trailing `{{-` / `-}}` strips whitespace so the output is clean YAML.
*/}}

{{/*
neoxs-me.image: builds a full image reference from global.registry + app image/tag.
Call site: {{ include "neoxs-me.image" (dict "Values" .Values "app" .Values.shell) }}
*/}}
{{- define "neoxs-me.image" -}}
{{- $reg := .Values.global.registry -}}
{{- if $reg -}}{{ $reg }}/{{ .app.image }}:{{ .app.tag }}{{- else -}}{{ .app.image }}:{{ .app.tag }}{{- end -}}
{{- end }}

{{/*
neoxs-me.labels: standard labels applied to every resource.
`app.kubernetes.io/` labels are the community convention — tools like kubectl,
Lens, and k9s use them to group and filter resources.
*/}}
{{- define "neoxs-me.labels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: neoxs-me
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end }}

{{/*
neoxs-me.selectorLabels: labels used in Deployment.spec.selector + Pod template.
Must be stable — changing them forces a Deployment recreation.
Separate from neoxs-me.labels because selector labels cannot include chart version
(which changes on every release, breaking the selector match).
*/}}
{{- define "neoxs-me.selectorLabels" -}}
app.kubernetes.io/name: {{ .name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
