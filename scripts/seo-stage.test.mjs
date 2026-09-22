import assert from 'node:assert/strict';
import { stageAssess } from './seo-stage.mjs';

const assess = (days28, pageCount28, oppCount, org28, lead28) => stageAssess(
  { days28, pageCount28, opp28: Array.from({ length: oppCount }, () => ({})) },
  { org28, lead28 },
);

assert.equal(assess({ impressions: 20, clicks: 0, ctr: 0, position: 70 }, 2, 0, 0, 0).idx, 0);
assert.equal(assess({ impressions: 180, clicks: 2, ctr: 0.011, position: 38 }, 12, 0, 10, 0).idx, 1);
assert.equal(assess({ impressions: 600, clicks: 12, ctr: 0.02, position: 19 }, 35, 2, 35, 0).idx, 2);

const wonly = assess({ impressions: 1250, clicks: 29, ctr: 0.023, position: 16.8 }, 85, 0, 100, 6);
assert.equal(wonly.idx, 3);
assert.equal(wonly.score, 80);

assert.equal(assess({ impressions: 3000, clicks: 80, ctr: 0.04, position: 8 }, 100, 5, 200, 8).idx, 4);
console.log('SEO stage scenarios passed');
