export const STAGES = [
  { name: '收录期 Indexing', bar: '●○○○○', min: 0,
    plain: '搜索引擎仍在建立收录与基础可见度。', next: '起量期',
    target: '扩大有效收录页面与稳定展示。', focus: '修复抓取与索引问题，补齐核心页面和基础内容。' },
  { name: '起量期 Emerging', bar: '●●○○○', min: 20,
    plain: '网站已有稳定展示，正在积累非品牌词和初始点击。', next: '爬升期',
    target: '提高前20名关键词、点击和自然会话。', focus: '持续建设主题簇，优化标题、H1与内链。' },
  { name: '爬升期 Climbing', bar: '●●●○○', min: 40,
    plain: '关键词和自然访问正在增长，部分页面接近或进入首页。', next: '流量期',
    target: '28天综合评分达到65，并形成稳定的首页词与自然访问。', focus: '精修高展示页面，扩大有效内链与高质量外链。' },
  { name: '流量期 Traffic', bar: '●●●●○', min: 65,
    plain: '自然搜索已经形成可持续流量，重点转向扩大首页词和询盘转化。', next: '成熟期',
    target: '28天综合评分达到85，并让自然流量持续产生有效询盘。', focus: '提升搜索摘要CTR、商业页转化率和高价值主题覆盖。' },
  { name: '成熟期 Converting', bar: '●●●●●', min: 85,
    plain: '自然流量与询盘形成稳定闭环，SEO进入规模化增长期。', next: '规模化',
    target: '维持核心排名，同时拓展市场、语言和品牌权威。', focus: '提升转化效率，扩展区域内容、数字公关和行业权威链接。' },
];

const points = (value, bands) => {
  for (const [threshold, score] of bands) if (value >= threshold) return score;
  return 0;
};

export function stageAssess(g, a) {
  const g28 = g?.days28 || {};
  const imp = Number(g28.impressions || 0);
  const clk = Number(g28.clicks || 0);
  const ctr = Number(g28.ctr || 0);
  const pos = Number(g28.position || 0);
  const pages = Number(g?.pageCount28 || 0);
  const opp = Number(g?.opp28?.length || 0);
  const org = Number(a?.org28 || 0);
  const lead = Number(a?.lead28 || 0);

  const parts = {
    impressions: points(imp, [[1000, 15], [500, 12], [200, 9], [50, 5]]),
    pages: points(pages, [[50, 10], [25, 8], [10, 5], [1, 2]]),
    ranking: pos > 0 ? (pos <= 10 ? 20 : pos <= 15 ? 17 : pos <= 20 ? 14 : pos <= 30 ? 9 : pos <= 50 ? 5 : 2) : 0,
    clicks: points(clk, [[50, 15], [25, 12], [10, 8], [3, 4]]),
    organic: points(org, [[150, 15], [75, 12], [30, 8], [10, 4]]),
    ctr: points(ctr, [[0.05, 10], [0.03, 9], [0.02, 7], [0.01, 4]]),
    opportunities: points(opp, [[5, 5], [3, 4], [1, 2]]),
    leads: points(lead, [[5, 10], [2, 8], [1, 5]]),
  };
  const score = Math.max(0, Math.min(100, Object.values(parts).reduce((sum, value) => sum + value, 0)));
  let idx = 0;
  for (let i = STAGES.length - 1; i >= 0; i -= 1) {
    if (score >= STAGES[i].min) { idx = i; break; }
  }
  return { idx, score, parts, ...STAGES[idx] };
}
