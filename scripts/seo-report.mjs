// WONLY 每日 SEO 日报（全面版）——拉 Google Search Console + GA4，推送到飞书。
// 由 .github/workflows/seo-daily.yml 定时/手动触发。依赖：google-auth-library。
// 凭证来自 GitHub Secrets：GOOGLE_SA_KEY / GA4_PROPERTY_ID / FEISHU_WEBHOOK。
import { GoogleAuth } from 'google-auth-library';

const SA_KEY = process.env.GOOGLE_SA_KEY;
const GA4 = process.env.GA4_PROPERTY_ID;
const FEISHU = process.env.FEISHU_WEBHOOK;
const SITE = 'sc-domain:wonlyglobal.com';
const HOST = 'https://www.wonlyglobal.com';

if (!SA_KEY || !GA4 || !FEISHU) { console.error('缺少 GOOGLE_SA_KEY / GA4_PROPERTY_ID / FEISHU_WEBHOOK'); process.exit(1); }

const auth = new GoogleAuth({
  credentials: JSON.parse(SA_KEY),
  scopes: ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/webmasters.readonly'],
});
async function tok() { const c = await auth.getClient(); const t = await c.getAccessToken(); return typeof t === 'string' ? t : t.token; }
const fmt = (d) => d.toISOString().slice(0, 10);
const dAgo = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d; };
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
  const [cur, prev, q, pages, dev, ctry, sm] = await Promise.all([
    gsc({ startDate: start, endDate: end }),
    gsc({ startDate: pStart, endDate: pEnd }),
    gsc({ startDate: start, endDate: end, dimensions: ['query'], rowLimit: 25 }),
    gsc({ startDate: start, endDate: end, dimensions: ['page'], rowLimit: 1000 }),
    gsc({ startDate: start, endDate: end, dimensions: ['device'] }),
    gsc({ startDate: start, endDate: end, dimensions: ['country'], rowLimit: 6 }),
    gscSitemaps().catch(() => null),
  ]);
  const qRows = q.rows || [];
  const topQ = qRows.slice(0, 10);
  // 机会词：排名 8–20（第2页附近）、展示较高、还没拿到多少点击 —— 优化后最可能冲进首页
  const opp = qRows.filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions).slice(0, 5);
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
    start, end, cur: tot(cur), prev: tot(prev), topQ, opp,
    pageCount: (pages.rows || []).length,
    topPages: (pages.rows || []).slice(0, 8),
    device: (dev.rows || []).map((r) => `${r.keys[0]} ${r.clicks}点`),
    country: (ctry.rows || []).map((r) => `${r.keys[0]} ${r.clicks}点`),
    sitemap: smLine, sitemapSubmitted: smSubmitted,
  };
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
const ORGANIC = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Organic Search' } } };

async function getGa4() {
  const [chCur, chPrev, eng, land, ctry, dev, leadCur, leadPrev] = await Promise.all([
    ga({ dateRanges: R7, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }),
    ga({ dateRanges: RPrev, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }] }),
    ga({ dateRanges: R7, metrics: [{ name: 'engagementRate' }, { name: 'averageSessionDuration' }], dimensionFilter: ORGANIC }),
    ga({ dateRanges: R7, dimensions: [{ name: 'landingPagePlusQueryString' }], metrics: [{ name: 'sessions' }], dimensionFilter: ORGANIC, orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 6 }),
    ga({ dateRanges: R7, dimensions: [{ name: 'country' }], metrics: [{ name: 'sessions' }], dimensionFilter: ORGANIC, orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 6 }),
    ga({ dateRanges: R7, dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'sessions' }], dimensionFilter: ORGANIC }),
    ga({ dateRanges: R7, metrics: [{ name: 'eventCount' }], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } } }),
    ga({ dateRanges: RPrev, metrics: [{ name: 'eventCount' }], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } } }),
  ]);
  const chRows = chCur.rows || [];
  const orgCur = Number((chRows.find((r) => r.dimensionValues[0].value === 'Organic Search') || { metricValues: [{ value: 0 }] }).metricValues[0].value);
  const orgPrev = Number(((chPrev.rows || []).find((r) => r.dimensionValues[0].value === 'Organic Search') || { metricValues: [{ value: 0 }] }).metricValues[0].value);
  const val = (r) => (r && r.rows && r.rows[0] ? r.rows[0].metricValues : null);
  const engV = val(eng);
  const leadC = val(leadCur), leadP = val(leadPrev);
  return {
    orgCur, orgPrev,
    total: chRows.reduce((s, r) => s + Number(r.metricValues[0].value || 0), 0),
    channels: chRows.slice(0, 5).map((r) => `${r.dimensionValues[0].value} ${r.metricValues[0].value}`),
    engRate: engV ? (Number(engV[0].value) * 100).toFixed(0) + '%' : '—',
    avgDur: engV ? dur(engV[1].value) : '—',
    landing: (land.rows || []).map((r) => `${short(r.dimensionValues[0].value)}（${r.metricValues[0].value}）`),
    country: (ctry.rows || []).map((r) => `${r.dimensionValues[0].value} ${r.metricValues[0].value}`),
    device: (dev.rows || []).map((r) => `${r.dimensionValues[0].value} ${r.metricValues[0].value}`),
    leadCur: leadC ? Number(leadC[0].value) : 0,
    leadPrev: leadP ? Number(leadP[0].value) : 0,
  };
}

// ---------------- 新站 SEO 建设阶段评估 ----------------
// 依据 GSC/GA4 实时数据，把新站 SEO 进度定位到 5 个阶段之一，并给出下一步目标。
const STAGES = [
  { name: '收录期 Indexing', bar: '●○○○○', pct: 8,
    plain: '站点刚上线，Google 仍在收录，几乎没有搜索展现——处于最早期，正常现象。',
    next: '起量期', target: '周展示突破 100、有展示的页面 ≥ 10。',
    focus: '确保收录（sitemap/预渲染正常、无抓取错误）、补齐基础页面与首批内容、修好技术 SEO。' },
  { name: '起量期 Emerging', bar: '●●○○○', pct: 28,
    plain: '已经有搜索展现，但排名普遍在第 2 页以后、点击很少——典型新站"沙盒/积累"期。',
    next: '爬升期', target: '出现 ≥1 个第 2 页机会词（8–20 名）、平均排名进入 20 名内、周点击破 10。',
    focus: '持续产出长尾主题内容、优化 title/H1/内链，围绕核心词搭建主题簇。' },
  { name: '爬升期 Climbing', bar: '●●●○○', pct: 52,
    plain: '部分关键词已冲到第 2 页、开始有零星点击——排名正在稳步爬升。',
    next: '流量期', target: '机会词冲进首页（<10 名）、周点击稳定破 30、自然会话开始上量。',
    focus: '针对机会词精修对应落地页、建高质量外链提升权重、扩展内容集群与内链。' },
  { name: '流量期 Traffic', bar: '●●●●○', pct: 75,
    plain: '关键词进入首页、自然点击/流量已成规模——进入收获前期。',
    next: '成熟期', target: '自然流量稳定带来询盘、非品牌词首页数增多、整体 CTR 提升。',
    focus: '优化标题/描述提 CTR、强化落地页转化与 CTA、放大表现好的主题。' },
  { name: '成熟期 Converting', bar: '●●●●●', pct: 92,
    plain: '自然流量稳定并已带来询盘——SEO 进入成熟变现期。',
    next: '规模化', target: '维持排名的同时拓词、拓语言、建品牌与权威。',
    focus: '提升转化率与客单、内容规模化、多市场/多语言扩展。' },
];
function stageAssess(g, a) {
  const imp = g ? g.cur.impressions : 0;
  const clk = g ? g.cur.clicks : 0;
  const pos = g ? g.cur.position : 0;      // 越小越好；0 表示无展示
  const pages = g ? g.pageCount : 0;
  const opp = g && g.opp ? g.opp.length : 0;
  const org = a ? a.orgCur : 0;
  const lead = a ? a.leadCur : 0;
  let idx;
  if (lead > 0 && org >= 50 && clk >= 30) idx = 4;
  else if ((clk >= 30 || org >= 30) && pos > 0 && pos < 15) idx = 3;
  else if (opp >= 1 || clk >= 5 || (pos > 0 && pos <= 25 && imp >= 150)) idx = 2;
  else if (imp >= 50 || pages >= 10) idx = 1;
  else idx = 0;
  return { idx, ...STAGES[idx] };
}

// ---------------- 规则化"今日建议" ----------------
function advice(g, a) {
  const t = [];
  if (g) {
    if (g.cur.ctr < 0.02 && g.cur.impressions > 50) t.push('整体 CTR 偏低（<2%）：优化核心页 title/description 更贴买家搜索意图。');
    if (g.opp && g.opp.length) t.push(`有 ${g.opp.length} 个"机会词"排在第 2 页（8–20 名），针对性优化对应页面内容可冲进首页。`);
    if (g.cur.clicks < g.prev.clicks) t.push('点击环比下降：核对近期是否有页面掉排名或收录异常。');
  }
  if (a) {
    if (a.orgCur < a.orgPrev) t.push('自然搜索会话环比下降：结合 GSC 排名变化排查。');
    if (a.leadCur > 0) t.push(`自然流量本周带来 ${a.leadCur} 条询盘，保持内容产出与转化跟进。`);
    else t.push('本周自然流量暂无询盘：检查联系表单/CTA 是否显眼、落地页是否对应买家意图。');
  }
  if (!t.length) t.push('各项平稳，持续每月产出文章 + 优化标题即可。');
  return t.map((x) => '· ' + x).join('\n');
}

// ---------------- 组装并推送 ----------------
async function main() {
  const today = fmt(new Date());
  const errors = [];
  let g = null, a = null, gscMd, ga4Md;

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
      + `**🔑 热门查询词 Top10：**\n${list(g.topQ, (r) => `· ${r.keys[0]}（${r.clicks}点/${r.impressions}展·第${r.position.toFixed(0)}名）`)}\n\n`
      + `**📄 热门落地页 Top8：**\n${list(g.topPages, (r) => `· ${short(r.keys[0])}（${r.clicks}点/${r.impressions}展）`)}\n\n`
      + `**🚀 冲首页机会词（第2页附近·展示高）：**\n${list(g.opp, (r) => `· ${r.keys[0]}（第${r.position.toFixed(0)}名·${r.impressions}展）`)}`;
  } catch (e) { errors.push('GSC ' + e.message); gscMd = `**🔍 GSC**：拉取失败\n${e.message}`; }

  try {
    a = await getGa4();
    ga4Md =
      `**📊 GA4 流量与询盘**（近7天，对比上周）\n`
      + `自然搜索会话 **${a.orgCur}**${wow(a.orgCur, a.orgPrev)}　｜　全站会话 ${a.total}\n`
      + `询盘 generate_lead **${a.leadCur}**${wow(a.leadCur, a.leadPrev)}\n`
      + `参与度 ${a.engRate}　｜　平均时长 ${a.avgDur}\n`
      + `渠道占比：${a.channels.join(' / ') || '—'}\n`
      + `自然流量设备：${a.device.join(' / ') || '—'}\n\n`
      + `**自然流量 Top 落地页：**\n${a.landing.length ? a.landing.map((x) => '· ' + x).join('\n') : '（暂无）'}\n\n`
      + `**自然流量 Top 国家：**\n${a.country.length ? a.country.map((x) => '· ' + x).join('\n') : '（暂无）'}`;
  } catch (e) { errors.push('GA4 ' + e.message); ga4Md = `**📊 GA4**：拉取失败\n${e.message}`; }

  // 新站 SEO 阶段（放在最前面，作为"进度定位"）
  const st = stageAssess(g, a);
  const stageMd =
    `**🧭 新站 SEO 建设阶段**\n`
    + `当前：${st.bar}　**阶段 ${st.idx}/4 · ${st.name}**（约 ${st.pct}%）\n`
    + `${st.plain}\n\n`
    + `**判断依据**：展示 ${g ? g.cur.impressions : '—'} · 点击 ${g ? g.cur.clicks : '—'} · 平均排名 ${g ? g.cur.position.toFixed(1) : '—'} · 有展示页 ${g ? g.pageCount : '—'} · 机会词 ${g && g.opp ? g.opp.length : 0} · 自然会话 ${a ? a.orgCur : '—'}/周 · 询盘 ${a ? a.leadCur : '—'}\n`
    + `**进入下一阶段（${st.next}）需**：${st.target}\n`
    + `**本阶段重点**：${st.focus}`;

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
        { tag: 'div', text: { tag: 'lark_md', content: `**🎯 今日建议**\n${advice(g, a)}` } },
        { tag: 'note', elements: [{ tag: 'lark_md', content: `wonlyglobal.com · GSC 有 2–3 天延迟属正常${errors.length ? ' · ⚠️ ' + errors.join('；') : ''}` }] },
      ],
    },
  };

  const res = await fetch(FEISHU, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(card) });
  const txt = await res.text();
  console.log('飞书返回：', res.status, txt);
  if (!res.ok) process.exit(1);
  try { const j = JSON.parse(txt); if (j.code && j.code !== 0) { console.error('飞书报错', j); process.exit(1); } } catch {}
}

main().catch((e) => { console.error(e); process.exit(1); });
