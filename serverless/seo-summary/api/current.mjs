import current from '../data/current.json' with { type: 'json' };
import { authorize, reply } from '../lib/auth.mjs';

export default function handler(request, response) {
  if (request.method !== 'GET') return reply(response, 405, { error: 'method_not_allowed' });
  if (!authorize(request, '/seo-summary/v1/current')) return reply(response, 401, { error: 'unauthorized' });
  return reply(response, 200, current);
}
