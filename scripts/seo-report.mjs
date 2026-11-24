// WONLY 每日 SEO 日报（全面版）——拉 Google Search Console + GA4，推送到飞书。
// 由 .github/workflows/seo-daily.yml 定时/手动触发。依赖：google-auth-library。
// 凭证来自 GitHub Secrets：GOOGLE_SA_KEY / GA4_PROPERTY_ID / FEISHU_WEBHOOK。
import { GoogleAuth } from 'google-auth-library';
import { stageAssess } from './seo-stage.mjs';
import { createHash } from 'node:crypto';

const SA_KEY = process.env.GOOGLE_SA_KEY;
const GA4 = process.env.GA4_PROPERTY_ID;
const FEISHU = process.env.FEISHU_WEBHOOK;
const SITE = 'sc-domain:wonlyglobal.com';
const HOST = 'https://www.wonlyglobal.com';
const HEALTH_PATHS = ['/', '/products/security-doors', '/products/metal-doors/3-0', '/products/smart-locks', '/contact'];

if (!SA_KEY || !GA4 || !FEISHU) { console.error('缺少 GOOGLE_SA_KEY / GA4_PROPERTY_ID / FEISHU_WEBHOOK'); process.exit(1); }

const auth = new GoogleAuth({
  credentials: JSON.parse(SA_KEY),
  scopes: ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/webmasters.readonly'],
});
async function tok() { const c = await auth.getClient(); const t = await c.getAccessToken(); return typeof t === 'string' ? t : t.token; }
const fmt = (d) => d.toISOString().slice(0, 10);
const beijingNow = () => new Date(Date.now() + 8 * 60 * 60 * 1000);
const dAgo = (n) => { const d = beijingNow(); d.setUTCDate(d.getUTCDate() - n); return d; };
const wow = (c, p) => { if (!p) return c ? ' ↑新' : ''; const x = ((c - p) / p) * 100; return ` ${x >= 0 ? '▲' : '▼'}${Math.abs(x).toFixed(0)}%`; };
const dur = (s) => { s = Math.round(Number(s) || 0); return `${Math.floor(s / 60)}分${s % 60}秒`; };
const short = (u) => (u || '').replace(HOST, '') || '/';

// ---------------- Google Search Console ----------------
async function gsc(body) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    { method: 'POST', headers: { Authorization: `Bearer ${await tok()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`GSC ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}
async function gscSitemaps() {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`,
    { headers: { Authorization: `Bearer ${await tok()}` } });
  if (!res.ok) throw new Error(`Sitemaps ${res.status}`);
  return res.json();
}
const tot = (r) => { const x = (r.rows && r.rows[0]) || {}; return { clicks: x.clicks || 0, impressions: x.impressions || 0, ctr: x.ctr || 0, position: x.position || 0 }; };

async function getGsc() {
  const end = fmt(dAgo(3)), start = fmt(dAgo(9)), pEnd = fmt(dAgo(10)), pStart = fmt(dAgo(16));
  const start28 = fmt(dAgo(30)), prevEnd28 = fmt(dAgo(31)), prevStart28 = fmt(dAgo(58));
  const [cur, prev, cur28, prev28, q, q28, pages, pages28, dev, ctry, sm, queryPages] = await Promise.all([
    gsc({ startDate: start, endDate: end }),
    gsc({ startDate: pStart, endDate: pEnd }),
    gsc({ startDate: start28, endDate: end }),
    gsc({ startDate: prevStart28, endDate: prevEnd28 }),
    gsc({ startDate: start, endDate: end, dimensions: ['query'], rowLimit: 25 }),
    gsc({ startDate: start28, endDate: end, dimensions: ['query'], rowLimit: 250 }),
    gsc({ startDate: start, endDate: end, dimensions: ['page'], rowLimit: 1000 }),
    gsc({ startDate: start28, endDate: end, dimensions: ['page'], rowLimit: 1000 }),
    gsc({ startDate: start, endDate: end, dimensions: ['device'] }),
    gsc({ startDate: start, endDate: end, dimensions: ['country'], rowLimit: 6 }),
    gscSitemaps().catch(() => null),
    gsc({ startDate: start28, endDate: end, dimensions: ['query', 'page'], rowLimit: 1000 }),
  ]);
  const qRows = q.rows || [];
  const qRows28 = q28.rows || [];
  const topQ = qRows.slice(0, 10);
  // 机会词仅作候选，不表示修改后必然进入首页。
  const opp = qRows.filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions).slice(0, 5);
  const opp28 = qRows28.filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions).slice(0, 5);
  const purchaseIntent = /manufacturer|supplier|factory|wholesale|distributor|oem|odm|project|rfq|quotation|commercial|hotel|hospital|contractor|bulk|price|cost|采购|批发|经销|项目|报价/i;
  const rankedQueryPages = (queryPages.rows || []).map((r) => {
    const query = r.keys?.[0] || '';
    const page = r.keys?.[1] || '';
    const position = Number(r.position || 0);
    const impressions = Number(r.impressions || 0);
    const clicks = Number(r.clicks || 0);
    const intent = purchaseIntent.test(query);
    const commercialPage = /\/products\//.test(page);
    const positionScore = position >= 8 && position <= 10 ? 25 : position <= 15 ? 20 : position <= 20 ? 14 : 0;
    const demandScore = Math.min(30, Math.round(10 * Math.log10(impressions + 1)));
    const score = demandScore + positionScore + (intent ? 25 : 0) + (commercialPage ? 15 : 0);
    return { query, page, clicks, impressions, ctr: Number(r.ctr || 0), position, intent, commercialPage, score };
  }).filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.score - a.score || b.impressions - a.impressions).slice(0, 8);
  let smLine = '（无法获取）'; let smSubmitted = 0;
  if (sm && sm.sitemap) {
    let submitted = 0; let errs = 0; let warns = 0; let last = '';
    for (const s of sm.sitemap) {
      (s.contents || []).forEach((c) => { submitted += Number(c.submitted || 0); });
      errs += Number(s.errors || 0); warns += Number(s.warnings || 0);
      if (s.lastSubmitted && s.lastSubmitted > last) last = s.lastSubmitted;
    }
    smSubmitted = submitted;
    smLine = `${sm.sitemap.length} 个 sitemap · 提交网址 ${submitted}` + (errs ? ` · ❗${errs}错` : '') + (warns ? ` · ⚠️${warns}警` : '');
  }
  return {
    start, end, start28, cur: tot(cur), prev: tot(prev), days28: tot(cur28), prev28: tot(prev28), topQ, opp, opp28, rankedQueryPages,
    pageCount: (pages.rows || []).length,
    pageCount28: (pages28.rows || []).length,
    topPages: (pages.rows || []).slice(0, 8),
    device: (dev.rows || []).map((r) => `${r.keys[0]} ${r.clicks}点`),
    country: (ctry.rows || []).map((r) => `${r.keys[0]} ${r.clicks}点`),
    sitemap: smLine, sitemapSubmitted: smSubmitted,
  };
}

// Read the rendered HTML of the homepage and key commercial routes. This catches
// route-level canonical/title regressions that a successful HTTP status alone misses.
async function getSiteHealth() {
  return Promise.all(HEALTH_PATHS.map(async (path) => {
    try {
      const response = await fetch(`${HOST}${path}`, { signal: AbortSignal.timeout(10000) });
      const html = await response.text();
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() || '';
      const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]
        || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] || '';
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || '';
      const signature = createHash('sha256').update(html).digest('hex').slice(0, 12);
      return { path, status: response.status, title, canonical, h1, signature };
    } catch (error) { return { path, error: error.message }; }
  }));
}

// ---------------- GA4 ----------------
async function ga(body) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4}:runReport`,
    { method: 'POST', headers: { Authorization: `Bearer ${await tok()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`GA4 ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}
const R7 = [{ startDate: '7daysAgo', endDate: 'yesterday' }];
const RPrev = [{ startDate: '14daysAgo', endDate: '8daysAgo' }];
const R28 = [{ startDate: '28daysAgo', endDate: 'yesterday' }];
const RPrev28 = [{ startDate: '56daysAgo', endDate: '29daysAgo' }];
const ORGANIC = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Organic Search' } } };
const FUNNEL_EVENTS = ['cta_click', 'inquiry_prompt_select', 'form_open', 'form_start', 'form_submit', 'generate_lead', 'form_error', 'form_abandon', 'contact_click'];
const FUNNEL_FILTER = { filter: { fieldName: 'eventName', inListFilter: { values: FUNNEL_EVENTS } } };
const ORGANIC_FUNNEL_FILTER = { andGroup: { expressions: [ORGANIC, FUNNEL_FILTER] } };
const eventCounts = (report) => Object.fromEntries(FUNNEL_EVENTS.map((name) => {
  const row = (report.rows || []).find((item) => item.dimensionValues?.[0]?.value === name);
  return [name, Number(row?.metricValues?.[0]?.value || 0)];
}));
const funnelLine = (counts) => `CTA ${counts.cta_click} → 意向选择 ${counts.inquiry_prompt_select} → 打开 ${counts.form_open} → 开始 ${counts.form_start} → 提交 ${counts.form_submit} → 成功事件 ${counts.generate_lead} · 错误 ${counts.form_error} · 放弃 ${counts.form_abandon} · 直接联系 ${counts.contact_click}`;

async function getGa4() {
  const [chCur, chPrev, ch28, chPrev28, eng, land, ctry, dev, funnel7, funnelPrev7, funnel28, organicFunnel7, organicFunnelPrev7, organicFunnel28] = await Promise.all([
    ga({ dateRanges: R7, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }),
    ga({ dateRanges: RPrev, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }] }),
    ga({ dateRanges: R28, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }] }),
    ga({ dateRanges: RPrev28, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }] }),
    ga({ dateRanges: R7, metrics: [{ name: 'engagementRate' }, { name: 'averageSessionDuration' }], dimensionFilter: ORGANIC }),
    ga({ dateRanges: R7, dimensions: [{ name: 'landingPagePlusQueryString' }], metrics: [{ name: 'sessions' }], dimensionFilter: ORGANIC, orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 6 }),
    ga({ dateRanges: R7, dimensions: [{ name: 'country' }], metrics: [{ name: 'sessions' }], dimensionFilter: ORGANIC, orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 6 }),
    ga({ dateRanges: R7, dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'sessions' }], dimensionFilter: ORGANIC }),
    ga({ dateRanges: R7, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: FUNNEL_FILTER }),
    ga({ dateRanges: RPrev, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: FUNNEL_FILTER }),
    ga({ dateRanges: R28, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: FUNNEL_FILTER }),
    ga({ dateRanges: R7, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: ORGANIC_FUNNEL_FILTER }),
    ga({ dateRanges: RPrev, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: ORGANIC_FUNNEL_FILTER }),
    ga({ dateRanges: R28, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: ORGANIC_FUNNEL_FILTER }),
  ]);
  const chRows = chCur.rows || [];
  const orgCur = Number((chRows.find((r) => r.dimensionValues[0].value === 'Organic Search') || { metricValues: [{ value: 0 }] }).metricValues[0].value);
  const orgPrev = Number(((chPrev.rows || []).find((r) => r.dimensionValues[0].value === 'Organic Search') || { metricValues: [{ value: 0 }] }).metricValues[0].value);
  const org28 = Number(((ch28.rows || []).find((r) => r.dimensionValues[0].value === 'Organic Search') || { metricValues: [{ value: 0 }] }).metricValues[0].value);
  const orgPrev28 = Number(((chPrev28.rows || []).find((r) => r.dimensionValues[0].value === 'Organic Search') || { metricValues: [{ value: 0 }] }).metricValues[0].value);
  const val = (r) => (r && r.rows && r.rows[0] ? r.rows[0].metricValues : null);
  const engV = val(eng);
  const f7 = eventCounts(funnel7), fPrev7 = eventCounts(funnelPrev7), f28 = eventCounts(funnel28);
  const organicF7 = eventCounts(organicFunnel7), organicFPrev7 = eventCounts(organicFunnelPrev7), organicF28 = eventCounts(organicFunnel28);
  return {
    orgCur, orgPrev, org28, orgPrev28,
    total: chRows.reduce((s, r) => s + Number(r.metricValues[0].value || 0), 0),
    channels: chRows.slice(0, 5).map((r) => `${r.dimensionValues[0].value} ${r.metricValues[0].value}`),
    engRate: engV ? (Number(engV[0].value) * 100).toFixed(0) + '%' : '—',
    avgDur: engV ? dur(engV[1].value) : '—',
    landing: (land.rows || []).map((r) => `${short(r.dimensionValues[0].value)}（${r.metricValues[0].value}）`),
    country: (ctry.rows || []).map((r) => `${r.dimensionValues[0].value} ${r.metricValues[0].value}`),
    device: (dev.rows || []).map((r) => `${r.dimensionValues[0].value} ${r.metricValues[0].value}`),
    funnel7: f7, funnelPrev7: fPrev7, funnel28: f28,
    organicFunnel7: organicF7, organicFunnelPrev7: organicFPrev7, organicFunnel28: organicF28,
    leadCur: organicF7.generate_lead,
    leadPrev: organicFPrev7.generate_lead,
    lead28: organicF28.generate_lead,
    allLeadCur: f7.generate_lead,
    allLeadPrev: fPrev7.generate_lead,
    allLead28: f28.generate_lead,
  };
}

// ---------------- 证据驱动的优先级与行动 ----------------
function advice(g, a, health) {
  const items = [];
  const add = (score, confidence, title, evidence, action, acceptance) => items.push({ score, confidence, title, evidence, action, acceptance });
  const routeRows = (health || []).filter((r) => !r.error);
  const homepage = routeRows.find((r) => r.path === '/');
  const brokenRoutes = routeRows.filter((r) => r.status >= 400);
  const homepageCanonicalRoutes = routeRows.filter((r) => r.path !== '/' && homepage?.canonical && r.canonical === homepage.canonical);
  const duplicateHtmlRoutes = routeRows.filter((r) => homepage?.signature && r.path !== '/' && r.signature === homepage.signature);
  if (brokenRoutes.length) add(100, '高', '先修复商业页可访问性', `${brokenRoutes.map((r) => `${r.path} HTTP ${r.status}`).join('、')}。`, '检查服务器路由、重定向与页面预渲染；修复后逐条复验。', '关键路径返回预期 200，且不被重定向到错误页面。');
  if (homepageCanonicalRoutes.length || duplicateHtmlRoutes.length) {
    const affected = [...new Set([...homepageCanonicalRoutes, ...duplicateHtmlRoutes].map((r) => r.path))];
    add(98, '高', '优先修复商业页静态 SEO 输出', `${affected.join('、')} 与首页共用 canonical${homepageCanonicalRoutes.length ? `（${homepageCanonicalRoutes.length}页）` : ''}${duplicateHtmlRoutes.length ? `，且原始 HTML 哈希相同（${duplicateHtmlRoutes.length}页）` : ''}。`, '检查服务端按 pathname 输出的 title、description、canonical、H1 与正文；不要只依赖客户端切换。', '每个商业 URL 返回独立 title/H1/正文和指向自身的 canonical；检查静态 HTML 后再观察 GSC。');
  }
  if (g) {
    const clickDrop = g.prev.clicks > 0 ? (g.prev.clicks - g.cur.clicks) / g.prev.clicks : 0;
    if (clickDrop >= 0.3) add(90, '中', '核查自然点击下降', `GSC近7天 ${g.cur.clicks} 点击，对比期 ${g.prev.clicks}，下降 ${(clickDrop * 100).toFixed(0)}%；28天 ${g.days28.clicks} 点击。`, '按页面和查询拆分下降贡献，先检查失去点击最多的页面是否仍可索引、canonical 是否正确，再对照排名变化。', '识别贡献最大的3个下滑页面/查询，并确认技术状态及下一步负责人。');
    const pair = g.rankedQueryPages?.[0];
    if (pair) add(Math.min(89, 45 + pair.score), pair.impressions >= 50 ? '中' : '低', '争取高意图查询的排名增量', `查询“${pair.query}”指向 ${short(pair.page)}：28天 ${pair.impressions} 展示、${pair.clicks} 点击、平均第 ${pair.position.toFixed(1)} 名；机会分 ${pair.score}/95（启发式排序，不是流量预测）。`, '核对该查询与页面正文是否一一匹配；补足采购决策所需信息，并从相关产品页/文章加入上下文内链。', '保留目标页与查询基线；7天观察展示、点击和位置，14天再决定扩大或保留。');
    if (!pair && g.opp28?.length) add(55, '低', '复核排名机会词', `近28天有 ${g.opp28.length} 个词处于第8–20名；本轮尚无足够的查询×页面组合可排序。`, '先在GSC逐词查看实际着陆页，避免把词优化到错误页面。', '确认每个目标词唯一对应页面后再改标题或正文。');
  }
  if (a) {
    const sessionDrop = a.orgPrev > 0 ? (a.orgPrev - a.orgCur) / a.orgPrev : 0;
    if (sessionDrop >= 0.3) add(82, '中', '排查自然会话下滑', `GA4自然会话近7天 ${a.orgCur}，对比期 ${a.orgPrev}，下降 ${(sessionDrop * 100).toFixed(0)}%；需与GSC同窗数据交叉判断。`, '比较GSC点击与GA4会话：两者同降优先检查搜索可见度；仅GA4下降则检查埋点、同意模式及渠道归因。', '确定变化发生在搜索点击还是分析采集，并记录对比窗口。');
    const f = a.organicFunnel7, p = a.organicFunnelPrev7;
    const funnelLabels = { cta_click: 'CTA点击', inquiry_prompt_select: '意向选择', form_open: '表单打开', form_start: '开始填写', form_submit: '表单提交', form_error: '表单错误', form_abandon: '表单放弃', contact_click: '直接联系点击' };
    for (const event of Object.keys(funnelLabels)) {
      if (p[event] >= 5 && (p[event] - f[event]) / p[event] >= 0.3) {
        add(75, p[event] >= 15 ? '中' : '低', `检查${funnelLabels[event]}下降`, `GA4自然搜索事件数 ${f[event]}，对比期 ${p[event]}，下降 ${(((p[event] - f[event]) / p[event]) * 100).toFixed(0)}%；这是事件数，不等于去重访客转化率。`, '按落地页、设备和事件参数拆分，先验证事件是否持续正常触发，再定位页面体验。', '同一维度复核事件触发与前期变化；小样本时延长观察，不据此直接改版。');
      }
    }
    if (f.cta_click >= 3 && f.form_open === 0) add(78, '低', '验证 CTA 到表单的路径', `近7天 ${f.cta_click} 次 CTA 事件、${f.form_open} 次表单打开事件。`, '用真实页面路径检查锚点、弹窗和跨页导航，并确认 form_open 埋点触发条件。', '不提交测试询盘；只验证交互和埋点，随后用真实流量观察。');
    if (f.form_submit > f.generate_lead) add(88, '中', '核对提交事件与真实投递', `GA4记录 ${f.form_submit} 次表单提交、${f.generate_lead} 次 generate_lead；事件差异不能单独证明邮件/CRM未收到。`, '核对接口成功响应、服务端投递日志及CRM入库；将分析事件与真实询盘到达分开报告。', '至少对照一条匿名化服务端成功计数与CRM入库计数，不记录个人信息。');
    if (f.form_error > 0) add(85, '中', '定位表单错误来源', `近7天自然流量记录 ${f.form_error} 次 form_error；当前报告未按错误类型分组。`, '增加/读取不含个人数据的错误类别、页面和设备维度，先区分验证失败、网络错误和服务端错误。', '错误类别可归因且修复后事件数回落；绝不提交测试表单。');
    if (a.leadCur > 0) add(50, '低', '核验询盘是否真实到达', `GA4记录 ${a.leadCur} 次 generate_lead；这只是分析事件，不代表已确认邮箱或CRM收到。`, '与服务端投递成功日志、CRM入库汇总对账后再计为有效询盘。', '报告分别列出GA事件与已核实的真实到达数。');
  }
  if (!g && !a) add(10, '低', '当前无法形成增长结论', 'GSC与GA4本轮均未成功读取；空数据不能解释为零点击、零会话或零询盘。', '恢复对应API权限/凭证后重跑；保留本轮为数据缺口，不对SEO表现下结论。', 'GSC与GA4均显示明确统计窗口、成功状态和指标。');
  items.sort((x, y) => y.score - x.score);
  const top = items.slice(0, 3);
  if (!top.length) return '未发现达到本轮证据阈值的行动项；这不代表“SEO平稳”，仅表示当前数据未显示强信号。';
  return top.map((x, i) => `**${i + 1}. [${x.score}分·置信度${x.confidence}] ${x.title}**\n证据：${x.evidence}\n执行：${x.action}\n验收：${x.acceptance}`).join('\n\n');
}

// ---------------- 组装并推送 ----------------
async function main() {
  const today = fmt(beijingNow());
  const errors = [];
  let g = null, a = null, gscMd, ga4Md;
  let health = [];

  try {
    g = await getGsc();
    const list = (rows, f) => rows.length ? rows.map(f).join('\n') : '（暂无数据）';
    gscMd =
      `**🔍 GSC 搜索表现**（${g.start} ~ ${g.end} · 近7天，对比上周）\n`
      + `点击 **${g.cur.clicks}**${wow(g.cur.clicks, g.prev.clicks)}　｜　展示 **${g.cur.impressions}**${wow(g.cur.impressions, g.prev.impressions)}\n`
      + `CTR **${(g.cur.ctr * 100).toFixed(1)}%**　｜　平均排名 **${g.cur.position.toFixed(1)}**　｜　有展示页面 **${g.pageCount}**\n`
      + `设备：${g.device.join(' / ') || '—'}\n`
      + `搜索来源国：${g.country.join(' / ') || '—'}\n`
      + `收录：${g.sitemap}\n\n`
      + `**28天趋势：** 点击 ${g.days28.clicks}${wow(g.days28.clicks, g.prev28.clicks)} · 展示 ${g.days28.impressions}${wow(g.days28.impressions, g.prev28.impressions)} · CTR ${(g.days28.ctr * 100).toFixed(1)}% · 排名 ${g.days28.position.toFixed(1)}\n\n`
      + `**🔑 热门查询词 Top10：**\n${list(g.topQ, (r) => `· ${r.keys[0]}（${r.clicks}点/${r.impressions}展·第${r.position.toFixed(0)}名）`)}\n\n`
      + `**📄 热门落地页 Top8：**\n${list(g.topPages, (r) => `· ${short(r.keys[0])}（${r.clicks}点/${r.impressions}展）`)}\n\n`
      + `**🚀 机会词（8–20名·需核对页面意图）：**\n${list(g.opp, (r) => `· ${r.keys[0]}（第${r.position.toFixed(0)}名·${r.impressions}展）`)}\n\n`
      + `**🧩 查询×页面机会（近28天，启发式排序分）：**\n${g.rankedQueryPages.length ? g.rankedQueryPages.map((r) => `· ${r.query} → ${short(r.page)}（第${r.position.toFixed(1)}名·${r.impressions}展/${r.clicks}点·CTR ${(r.ctr * 100).toFixed(1)}%·排序分 ${r.score}）`).join('\n') : '未发现满足展示与排名条件的组合'}\n分数用于候选排序，不是流量预测，未估工作量与风险。`;
  } catch (e) { errors.push('GSC ' + e.message); gscMd = `**🔍 GSC**：拉取失败\n${e.message}`; }

  try {
    a = await getGa4();
    ga4Md =
      `**📊 GA4 流量与询盘**（近7天，对比上周）\n`
      + `自然搜索会话 **${a.orgCur}**${wow(a.orgCur, a.orgPrev)}　｜　全站会话 ${a.total}\n`
      + `SEO generate_lead事件 **${a.leadCur}**${wow(a.leadCur, a.leadPrev)}　｜　全渠道事件 ${a.allLeadCur}${wow(a.allLeadCur, a.allLeadPrev)}\n`
      + `28天自然会话 **${a.org28}**${wow(a.org28, a.orgPrev28)}　｜　28天SEO事件 **${a.lead28}**　｜　全渠道事件 ${a.allLead28}\n`
      + `**SEO漏斗：** ${funnelLine(a.organicFunnel7)}\n`
      + `**全渠道漏斗：** ${funnelLine(a.funnel7)}\n`
      + `参与度 ${a.engRate}　｜　平均时长 ${a.avgDur}\n`
      + `渠道占比：${a.channels.join(' / ') || '—'}\n`
      + `自然流量设备：${a.device.join(' / ') || '—'}\n\n`
      + `**自然流量 Top 落地页：**\n${a.landing.length ? a.landing.map((x) => '· ' + x).join('\n') : '（暂无）'}\n\n`
      + `**自然流量 Top 国家：**\n${a.country.length ? a.country.map((x) => '· ' + x).join('\n') : '（暂无）'}`;
  } catch (e) { errors.push('GA4 ' + e.message); ga4Md = `**📊 GA4**：拉取失败\n${e.message}`; }

  try { health = await getSiteHealth(); }
  catch (e) { errors.push('官网页面检查 ' + e.message); }
  const healthMd = `**🌐 官网关键路径检查**\n${health.length ? health.map((r) => {
    if (r.error) return `· ${r.path}：未获取（${r.error}）`;
    return `· ${r.path}：HTTP ${r.status} · title「${r.title || '缺失'}」 · canonical ${r.canonical || '缺失'} · H1「${r.h1 || '缺失'}」`;
  }).join('\n') : '未获取'}\n· 原始HTML哈希仅用于发现重复输出线索，须结合状态码与元数据判断。`;

  // SEO 增长阶段（28天滚动窗口降低单周波动，近7天数据继续用于实时观察）
  const st = stageAssess(g, a);
  const stageMd =
    `**🧭 SEO 增长阶段（28天滚动评估）**\n`
    + (g && a ? `当前：${st.bar}　**阶段 ${st.idx}/4 · ${st.name}**（观测评分 ${st.score}/100）\n${st.plain}\n阶段评分是观察代理指标，不代表排名承诺或已核实询盘。\n\n` : `当前：**评估不完整**（GSC ${g ? '已获取' : '未获取'} · GA4 ${a ? '已获取' : '未获取'}）；不将缺失当作零。\n\n`)
    + `**28天依据**：展示 ${g ? g.days28.impressions : '—'} · 点击 ${g ? g.days28.clicks : '—'} · CTR ${g ? (g.days28.ctr * 100).toFixed(1) + '%' : '—'} · 平均排名 ${g ? g.days28.position.toFixed(1) : '—'} · 有展示页 ${g ? g.pageCount28 : '—'} · 机会词 ${g ? g.opp28.length : '—'} · 自然会话 ${a ? a.org28 : '—'} · generate_lead事件 ${a ? a.lead28 : '—'}\n`
    + `**近7天观察**：点击 ${g ? g.cur.clicks : '—'} · 展示 ${g ? g.cur.impressions : '—'} · 自然会话 ${a ? a.orgCur : '—'} · generate_lead事件 ${a ? a.leadCur : '—'}\n`
    + `GA4事件仅代表埋点记录，不证明询盘已送达邮箱或CRM。\n`
    + (g && a ? `**进入下一阶段（${st.next}）需**：${st.target}\n**本阶段重点**：${st.focus}` : '**阶段与目标**：待GSC和GA4数据恢复后评估。');

  const card = {
    msg_type: 'interactive',
    card: {
      config: { wide_screen_mode: true },
      header: { template: 'blue', title: { tag: 'plain_text', content: `WONLY SEO 日报 · ${today}` } },
      elements: [
        { tag: 'div', text: { tag: 'lark_md', content: stageMd } },
        { tag: 'hr' },
        { tag: 'div', text: { tag: 'lark_md', content: gscMd } },
        { tag: 'hr' },
        { tag: 'div', text: { tag: 'lark_md', content: ga4Md } },
        { tag: 'hr' },
        { tag: 'div', text: { tag: 'lark_md', content: healthMd } },
        { tag: 'hr' },
        { tag: 'div', text: { tag: 'lark_md', content: `**🎯 今日优先行动（按证据与影响排序）**\n${advice(g, a, health)}` } },
        { tag: 'note', elements: [{ tag: 'lark_md', content: `wonlyglobal.com · GSC 有 2–3 天延迟属正常${errors.length ? ' · ⚠️ ' + errors.join('；') : ''}` }] },
      ],
    },
  };

  // Keep a machine-readable, non-secret snapshot in the private Actions log so
  // future optimisation work can be verified without relying on the Feishu UI.
  console.log('SEO_REPORT_SNAPSHOT ' + JSON.stringify({
    reportDate: today,
    stage: g && a ? { evaluated: true, index: st.idx, name: st.name, percent: st.pct, score: st.score } : { evaluated: false },
    siteHealth: health.map(({ path, status, title, canonical, h1, signature, error }) => ({ path, status, title, canonical, h1, signature, error })),
    gsc: g ? {
      period: [g.start, g.end], current: g.cur, previous: g.prev,
      visiblePages: g.pageCount, sitemap: g.sitemap,
      topQueries: g.topQ.map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
      opportunities: g.opp.map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
      queryPageOpportunities: g.rankedQueryPages,
      topPages: g.topPages.map((r) => ({ page: short(r.keys[0]), clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
      countries: g.country, devices: g.device,
    } : null,
    ga4: a ? {
      organicSessions: a.orgCur, previousOrganicSessions: a.orgPrev,
      totalSessions: a.total, organicLeads: a.leadCur, previousOrganicLeads: a.leadPrev,
      allChannelLeads: a.allLeadCur, previousAllChannelLeads: a.allLeadPrev,
      organicFunnel7: a.organicFunnel7, organicFunnel28: a.organicFunnel28,
      allChannelFunnel7: a.funnel7, allChannelFunnel28: a.funnel28,
      engagementRate: a.engRate, averageDuration: a.avgDur,
      landingPages: a.landing, countries: a.country, devices: a.device,
    } : null,
    errors,
  }));

  const res = await fetch(FEISHU, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(card) });
  const txt = await res.text();
  console.log('飞书返回：', res.status, txt);
  if (!res.ok) process.exit(1);
  try { const j = JSON.parse(txt); if (j.code && j.code !== 0) { console.error('飞书报错', j); process.exit(1); } } catch {}
}

main().catch((e) => { console.error(e); process.exit(1); });
