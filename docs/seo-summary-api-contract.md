# WONLY SEO Summary Read API v1

Status: reviewable source implementation only. It has not been deployed and does not change existing CMS or Google permissions.

## Purpose and boundary

This service exposes a small, aggregated SEO snapshot to one explicitly authorised server-side CRM identity. It never accepts Google credentials, CMS user JWTs, browser sessions, visitor identifiers or customer records. Version 1 omits search queries, free-form UTM values and all visitor/customer identifiers.

The recommended independent deployment boundary is:

- code: `/opt/wonly-seo-summary/current`
- state: `/var/lib/wonly-seo-summary`
- secrets: `/etc/wonly-seo-summary/api.env` (`root:wonly-seo`, mode `0640`)
- listener: `127.0.0.1:8796`
- reverse proxy: a private service route or dedicated `seo-api.wonlyglobal.com`; do not add it beneath the WONLY-CMS user API until separately approved.

The proposed production URLs, which do not exist until a separately approved deployment, are:

- `https://seo-api.wonlyglobal.com/seo-summary/v1/current`
- `https://seo-api.wonlyglobal.com/seo-summary/v1/history?days=14`

The authorised CRM receiver is the server-side Supabase Edge Function `agent-conversation` in project `plhverjihjilnuhlhlxi`. Its exact Chloe identity gate remains a separate CRM-side requirement. The API credential grants that function read-only `seo_summary.read`; it grants no Google, CMS, database-write or snapshot-generation capability. Grace may analyse the returned aggregates through the already approved Alibaba Cloud Bailian Beijing model, but neither the model nor the browser receives the HMAC secret.

## Endpoints

### `GET /seo-summary/v1/current`

Returns the newest valid snapshot. No query parameters are accepted.

### `GET /seo-summary/v1/history?days=14`

Returns one snapshot per UTC `generated_at` date, newest first. `days` is an integer from 1 through 90. A new snapshot for the same generated date replaces the older same-date snapshot only when its `generated_at` is equal or newer. This makes reruns idempotent and prevents duplicates.

## Metric definitions

- `ctr` is a ratio in the inclusive range `0..1`, never a percentage. Display clients multiply it by 100.
- `avg_position` is the Google Search Console `position` value for the exact requested dimensions and date window. It is impression-weighted by GSC; consumers must not average already aggregated position values again.
- A numeric zero means the source explicitly returned zero. Missing, unauthorized or delayed data is `null` and must have a matching `gaps` record.
- Organic and all-channel funnel objects are separate and must never be added together.
- GA4 commonly ends at yesterday. GSC normally ends three days before generation. Every response includes `generated_at`, provider `through`, `lag_days` where applicable, and source status.

The authoritative shape is demonstrated by `docs/examples/seo-summary-current.sample.json`. The sample is synthetic and must not be interpreted as a live snapshot.

## Authentication

Only server-to-server HMAC authentication is supported. Configure an independent mapping in the source service secret store:

```text
SEO_SUMMARY_CLIENTS_JSON={"crm-grace-prod":"at-least-32-random-secret-bytes"}
```

The credential must be provisioned to both services through their secret managers, never committed or sent in chat. The CRM identity receives only the `seo_summary.read` capability at the policy layer.

Required request headers:

- `X-Wonly-Key-Id`
- `X-Wonly-Timestamp`: current Unix seconds
- `X-Wonly-Nonce`: unique 16–64 character `[A-Za-z0-9_-]` value
- `X-Wonly-Signature`: base64url HMAC-SHA256

Canonical signing input (five lines, final body hash is SHA-256 base64url of an empty string for GET):

```text
GET
/seo-summary/v1/history?days=14
<unix-seconds>
<nonce>
<sha256-base64url-of-empty-body>
```

The server permits at most 300 seconds of clock skew and rejects nonce replay during that window. Query order and encoding must exactly match the sent URL. Signature comparison is timing-safe. The service does not emit CORS headers and is not intended for browsers.

## Response limits and errors

- current response: at most 256 KiB
- history response: at most 1 MiB
- stored snapshot input: at most 512 KiB
- cache policy: private, 60 seconds; error responses use a stable JSON code

| HTTP | Code | Meaning |
| ---: | --- | --- |
| 400 | `invalid_query`, `invalid_days` | Unsupported query or range |
| 401 | `invalid_signature` | Missing/unknown key, bad/stale signature, or nonce replay |
| 404 | `not_found` | Unknown route |
| 405 | `method_not_allowed` | Read API received a non-GET request |
| 413 | `response_too_large` | Configured response cap exceeded |
| 500 | `internal_error` | Valid request failed internally; no details leaked |
| 503 | `snapshot_unavailable` | No valid generated snapshot exists yet |

## Snapshot generation

The generator validates all fields and writes atomically:

```bash
node scripts/generate-seo-summary-snapshot.mjs \
  --input /secure-runtime/sanitized-seo-summary.json \
  --store /var/lib/wonly-seo-summary
```

The daily SEO workflow should build the sanitized input directly from the same GA4/GSC aggregates used for the report. It must not parse Feishu messages or expose raw Google responses. SEMrush remains a dated historical snapshot with `stale` status unless a new verified export is available.

## Review and deployment gate

`scripts/run-seo-summary-api.mjs` and `scripts/generate-seo-summary-snapshot.mjs` are the reviewable implementation. Deployment requires a separate approval, creation of the independent service account/directories, a production hostname or private route, TLS, rate limiting and audit logging at the proxy, secrets provisioning on both servers, and a first-snapshot reconciliation. No current CMS role or endpoint should be weakened.

Reviewable deployment templates are under `deployment/seo-summary/`. They are intentionally not wired into the existing WONLY-CMS installer.
