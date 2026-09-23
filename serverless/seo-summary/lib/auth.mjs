import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const usedNonces = new Map();
const b64url = (value = '') => createHash('sha256').update(value).digest('base64url');
const safeEqual = (left, right) => {
  try {
    const a = Buffer.from(left, 'base64url');
    const b = Buffer.from(right, 'base64url');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
};

export function authorize(request, pathname) {
  const clients = JSON.parse(process.env.SEO_SUMMARY_CLIENTS_JSON || '{}');
  const keyId = request.headers['x-wonly-key-id'];
  const timestamp = request.headers['x-wonly-timestamp'];
  const nonce = request.headers['x-wonly-nonce'];
  const signature = request.headers['x-wonly-signature'];
  const secret = clients[keyId];
  const now = Math.floor(Date.now() / 1000);
  const seconds = Number(timestamp);
  if (!secret || !nonce || !signature || !Number.isInteger(seconds) || Math.abs(now - seconds) > 300) return false;
  for (const [value, expires] of usedNonces) if (expires <= now) usedNonces.delete(value);
  const nonceKey = `${keyId}:${nonce}`;
  if (usedNonces.has(nonceKey)) return false;
  const url = new URL(request.url, 'https://seo-api.wonlyglobal.com');
  const canonical = ['GET', `${pathname}${url.search}`, String(seconds), nonce, b64url('')].join('\n');
  const expected = createHmac('sha256', secret).update(canonical).digest('base64url');
  if (!safeEqual(signature, expected)) return false;
  usedNonces.set(nonceKey, now + 301);
  return true;
}

export function reply(response, status, body) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(body));
}
