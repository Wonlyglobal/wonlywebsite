// Daily work report → Feishu.
//
// Summarises the last 24h of work on the WONLY site in plain business terms:
// which PAGES were optimised (file paths are mapped to Chinese page names),
// what content/SEO/automation work happened, which articles auto-published,
// and content-schedule progress. Posts an interactive card to the Feishu
// webhook in env FEISHU_WORK_WEBHOOK.
// Runs in GitHub Actions (daily-work-report.yml); needs fetch-depth: 0.

import { execSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";

const WEBHOOK = process.env.FEISHU_WORK_WEBHOOK;
if (!WEBHOOK) { console.error("FEISHU_WORK_WEBHOOK not set"); process.exit(1); }

const sh = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

// ---- Report date (manual resend) or Beijing "today" ----
const bj = new Date(Date.now() + 8 * 3600 * 1000);
const today = process.env.REPORT_DATE || bj.toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error("REPORT_DATE must use YYYY-MM-DD");
  process.exit(1);
}

// ---- File path → 中文页面/模块名 ----
const PAGE_MAP = [
  [/src\/pages\/prototype\//, "首页"],
  [/src\/pages\/home\//, "首页"],
  [/src\/pages\/products\/SecurityDoorX70/, "X70 机器人门产品页"],
  [/src\/pages\/products\/SecurityDoors/, "安全门系列页"],
  [/src\/pages\/products\/SmartLockS80/, "S80 智能锁产品页"],
  [/src\/pages\/products\/SmartLocks/, "智能锁系列页"],
  [/src\/pages\/products\/EngineeringDoors/, "工程防火门页"],
  [/src\/pages\/products\/MedicalDoors/, "医用门页"],
  [/src\/pages\/products\/WoodenDoors/, "木门页"],
  [/src\/pages\/products\/SmartWindows/, "智能门窗页"],
  [/src\/pages\/products\/WholeHouse/, "全屋智能页"],
  [/src\/pages\/products\/EntranceDoor/, "入户门页"],
  [/src\/pages\/products\/YizhaiYishu/, "艺宅艺术门页"],
  [/src\/pages\/products\//, "产品页"],
  [/src\/pages\/advantages\//, "优势页（Why WONLY）"],
  [/src\/pages\/contact\//, "联系页"],
  [/src\/pages\/about\//, "关于我们页"],
  [/src\/pages\/manufacturing\//, "制造与研发页"],
  [/src\/pages\/global-strategy\//, "全球战略页"],
  [/src\/pages\/partnership\//, "合作伙伴页"],
  [/src\/pages\/projects\//, "项目案例页"],
  [/src\/pages\/insights\//, "洞察文章模板页"],
  [/src\/pages\/legal\//, "法律条款页"],
  [/src\/lib\/articles\.ts/, "SEO 文章内容"],
  [/content\/articles\//, "SEO 文章内容"],
  [/public\/admin\//, "内容后台（CMS）"],
  [/src\/lib\/site-ui/, "全站组件（页头/页脚/询盘弹窗）"],
  [/src\/lib\/seo/, "SEO 组件"],
  [/src\/lib\//, "公共组件"],
  [/public\/sitemap\.xml/, "Sitemap"],
  [/public\/robots/, "Robots"],
  [/public\/images\//, "图片素材"],
  [/public\/videos\//, "视频素材"],
  [/\.github\/workflows\//, "自动化流程（CI）"],
  [/scripts\//, "构建/自动化脚本"],
  [/index\.html/, "站点入口与元信息"],
  [/package(-lock)?\.json|vite\.config|tsconfig/, "工程配置"],
];
const pageOf = (file) => {
  for (const [re, name] of PAGE_MAP) if (re.test(file)) return name;
  return "其它";
};

// ---- 分类规则:按页面/模块归入工作类别 ----
const CATEGORY = {
  "📄 页面优化与建设": ["首页", "X70 机器人门产品页", "安全门系列页", "S80 智能锁产品页", "智能锁系列页", "工程防火门页", "医用门页", "木门页", "智能门窗页", "全屋智能页", "入户门页", "艺宅艺术门页", "产品页", "优势页（Why WONLY）", "联系页", "关于我们页", "制造与研发页", "全球战略页", "合作伙伴页", "项目案例页", "洞察文章模板页", "法律条款页", "全站组件（页头/页脚/询盘弹窗）", "公共组件", "站点入口与元信息"],
  "✍️ 内容与文章": ["SEO 文章内容"],
  "🔍 SEO 建设": ["Sitemap", "Robots", "SEO 组件"],
  "🤖 自动化与工程": ["自动化流程（CI）", "构建/自动化脚本", "工程配置"],
  "🖼️ 素材": ["图片素材", "视频素材"],
};
const catOf = (page) => {
  for (const [cat, pages] of Object.entries(CATEGORY)) if (pages.includes(page)) return cat;
  return "🔩 其它";
};

// ---- 1) 近 24h 提交 → 按类别整理成"做了什么" ----
let workByCat = {}; let commitCount = 0;
try {
  const hashes = sh(`git log --since="${today} 00:00:00 +0800" --until="${today} 23:59:59 +0800" --no-merges --pretty=format:"%h"`).split("\n").filter(Boolean);
  commitCount = hashes.length;
  for (const h of hashes) {
    const msg = sh(`git log -1 --pretty=format:"%s" ${h}`);
    const files = sh(`git show --name-only --pretty=format: ${h}`).split("\n").filter(Boolean);
    const pages = [...new Set(files.map(pageOf))];
    // 每个提交挂到它涉及的主类别下(一个提交可跨多类)
    const cats = [...new Set(pages.map(catOf))];
    for (const c of cats) {
      const pagesInCat = pages.filter((p) => catOf(p) === c);
      (workByCat[c] ||= []).push(`• **${pagesInCat.join("、")}**：${msg}`);
    }
  }
} catch { /* no git — leave empty */ }

// ---- 2) 文章:今日上线 + 进度(从 content/articles/*.md 读取) ----
const arts = readdirSync("content/articles")
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const s = readFileSync(`content/articles/${f}`, "utf8");
    return {
      slug: s.match(/^slug:\s*"?([^"\n]+)"?$/m)?.[1] || "",
      title: (s.match(/^title:\s*"?(.+?)"?$/m)?.[1] || "").replace(/\\"/g, '"'),
      date: s.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?$/m)?.[1] || "",
    };
  })
  .filter((a) => a.slug && a.date);
const publishedToday = arts.filter((a) => a.date === today);
const live = arts.filter((a) => a.date <= today);
const scheduled = arts.filter((a) => a.date > today).sort((a, b) => (a.date < b.date ? -1 : 1));
const next = scheduled[0];

// ---- 3) Sitemap ----
let urlCount = "?";
try { urlCount = String((readFileSync("public/sitemap.xml", "utf8").match(/<loc>/g) || []).length); } catch { /* ignore */ }

// ---- 4) 运营/分析工作日志(docs/worklog.md,当天条目) ----
let opsToday = [];
try {
  opsToday = readFileSync("docs/worklog.md", "utf8")
    .split("\n")
    .filter((l) => l.startsWith(today + " |"))
    .map((l) => "• " + l.slice(today.length + 2).trim());
} catch { /* no worklog yet */ }

// ---- 组卡片 ----
const md = [];
md.push(`**📅 ${today} · 个人工作日报**`);
md.push("");
md.push(`**📝 当日自动上线文章**`);
if (publishedToday.length) {
  for (const a of publishedToday) md.push(`• [${a.title}](https://www.wonlyglobal.com/insights/${a.slug}/)`);
} else {
  md.push("• 今日无排期文章");
}
md.push(`**📚 内容进度**：已上线 ${live.length}/${arts.length} 篇${next ? `，下一篇 ${next.date}` : "，排期已发完 ✅"}`);
md.push("");
const catOrder = ["📄 页面优化与建设", "✍️ 内容与文章", "🔍 SEO 建设", "🤖 自动化与工程", "🖼️ 素材", "🔩 其它"];
const catsWithWork = catOrder.filter((c) => workByCat[c]?.length);
if (catsWithWork.length) {
  md.push(`**🔧 当日建设工作**（${commitCount} 次提交）`);
  for (const c of catsWithWork) {
    md.push(`**${c}**`);
    md.push(...workByCat[c].slice(0, 6));
    if (workByCat[c].length > 6) md.push(`• …等共 ${workByCat[c].length} 项`);
  }
} else {
  md.push(`**🔧 当日建设工作**：无代码改动（内容按排期自动发布中）`);
}
if (opsToday.length) {
  md.push("");
  md.push(`**📋 运营与分析工作**`);
  md.push(...opsToday.slice(0, 8));
  if (opsToday.length > 8) md.push(`• …等共 ${opsToday.length} 项`);
}
md.push("");
md.push(`**🗺️ Sitemap**：${urlCount} 个 URL`);
md.push("");
md.push(`[打开网站](https://www.wonlyglobal.com/) · [文章列表](https://www.wonlyglobal.com/insights/) · [Actions](https://github.com/Wonlyglobal/wonlywebsite/actions)`);

const card = {
  msg_type: "interactive",
  card: {
    header: {
      title: { tag: "plain_text", content: `WONLY 个人工作日报 · ${today}` },
      template: publishedToday.length || catsWithWork.length ? "green" : "blue",
    },
    elements: [{ tag: "markdown", content: md.join("\n") }],
  },
};

const res = await fetch(WEBHOOK, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(card),
});
const body = await res.text();
console.log("Feishu response:", res.status, body);
if (!res.ok) process.exit(1);
