# WONLY 海外官网 · 项目全景档案

> 用途:项目的"上下文备份"。任何新的 AI 会话或新同事,读完本文件即可接手全部工作。
> 维护:重大变更时更新本文件。最后更新:2026-08-04。

## 一、项目是什么

- 王力安防(WONLY)海外英文 B2B 官网:**www.wonlyglobal.com**
- 面向海外经销商 / 项目采购方;香槟金高端编辑风格
- 技术栈:React + Vite + TypeScript + Tailwind + shadcn/ui,SPA
- 仓库:github.com/Wonlyglobal/wonlywebsite(main 分支)
- 部署:GitHub Actions → GitHub Pages(push 到 main 自动构建部署,另有每日定时构建)
- 本地路径:`D:\ai项目\wonly官网`

## 二、品牌关键事实(文案必用真实数据)

- 门锁第一品牌(2024–2025 全国销量第一);行业唯一上市公司(上交所 SSE: 605268,2021)
- 1996 年创立;1,000+ 专利;30 年无重大安全事故;五大智能制造基地
- 资质:GB 17565 甲级(Class A,最高)、EN 1634 防火 90 分钟(符合海湾/东南亚/中亚规范)、20 万次开合测试、ISO 9001/14001、CE、UL、CMA、CSPA、抗风 12 级、隔音 STC 35+
- 独家卖点:专利圆柱体锁芯(防技开超国标 36 倍、防钻)、机械自弹锁体(16 锁点四边自动上锁)、10.1 寸大屏、无门槛+自动下沉密封、双电供应
- 产品系列:X70 机器人门(旗舰=5.0 代)、4.0 Global、K300 Pro、工程防火门、医用门、YIZHAI YISHU 艺术门、智能锁(S80 等)、全屋智能
- 官方联系邮箱:**inquiry@wonlyglobal.com**(全站统一)

## 三、页面结构(src/pages/)

- 首页 `prototype/Index.tsx`(⚠️ 高危文件:历史上被误删过一次,改动务必单独提交、明确路径,严禁 git add .)
- 产品:`products/`(SecurityDoors 系列页、SecurityDoorX70 旗舰页、SmartLocks/S80、防火/医用/木门/门窗/全屋/艺宅)
- 优势页 `advantages/`(Why WONLY Door=门体、Why WONLY Lock=智能锁、代际说明、认证奖项)
- 其它:about / contact / manufacturing / global-strategy / partnership / projects / insights(文章)/ legal
- 全站组件:`src/lib/site-ui.tsx`(页头/页脚/询盘弹窗);SEO:`src/lib/seo.tsx`

## 四、SEO 内容体系(核心机制)

1. **文章数据**:全部在 `src/lib/articles.ts`(30 篇)。文章对象含 slug/seoTitle/keywords/date/body 块。
2. **定时发布**:`ARTICLES` 导出做了日期门控——`date` 未到的文章在全站不可见。
3. **每日自动构建**:`.github/workflows/deploy.yml` 里 cron `23 1 * * *`(北京 09:23),到期文章自动上架。
4. **sitemap 自动注入**:构建前 `scripts/sync-article-sitemap.mjs` 把已到期文章 URL 注入 sitemap(幂等)。
5. **发文排期**(每周一/三/五,共 20 篇新文,2026-08-03 起至 09-16):
   完整"日期→slug"对照表见 GSC 催收录定时任务的配置,或直接在 articles.ts 里按 date 字段查。
6. **GSC 催收录**:每周一/三/五 10:00(北京)定时任务自动确认当天文章上线并推送提交提醒(GSC 无法全自动提交,最后一步需人工点击)。
7. **关键词资产**:《WONLY-SEO行业长尾词库.xlsx》4,784 词(P1 交易词 2,804);《WONLY-SEO第一批落地与20篇排期.xlsx》。

## 五、自动化清单(GitHub Actions + 定时任务)

| 名称 | 触发 | 作用 |
|---|---|---|
| Deploy to GitHub Pages | push + 每日 09:23(北京) | 构建、sitemap 注入、预渲染、部署;到期文章自动上架 |
| Daily SEO Report | 每日 09:17(北京) | 拉 GSC+GA4 数据 → 飞书(secrets: GOOGLE_SA_KEY/GA4_PROPERTY_ID/FEISHU_WEBHOOK) |
| Daily Work Report | 每日 18:07(北京) | 汇总当天提交(映射中文页面名)+ docs/worklog.md 运营条目 + 文章进度 → 新飞书群(secret: FEISHU_WORK_WEBHOOK) |
| WONLY 发文日 GSC 催收录 | 周一/三/五 10:00(北京,Claude 定时任务) | 确认当天文章上线 + 推送 GSC 提交提醒 |

## 六、工作日志(日报数据源)

- `docs/worklog.md`:非代码类工作(关键词研究/规划/内容生产等)按 `YYYY-MM-DD | 内容` 一行一条记录,日报自动读取当天条目。

## 七、重要教训 / 红线

1. **首页文件红线**:`src/pages/prototype/Index.tsx` 曾被一次提交削掉 ~600 行(轮播等),已建 pre-commit 守卫(.githooks)。改它必须:单独提交、明确路径、推前 `npm run build` 验证。
2. **Windows 编码坑**:PowerShell 处理仓库文件必须显式 UTF-8(`[IO.File]::ReadAllText/WriteAllText` + UTF8Encoding no BOM),否则中文/特殊字符乱码会把构建搞挂(发生过一次,cefe018)。
3. **GitHub cron 整点会被丢**:所有 cron 用错峰分钟(17/23/07 分)。
4. **图片路径**:`alu-*.webp` 在 `images/door/` 子目录,不在 images 根目录。
5. **推送流程**:`git add <明确文件> → commit → git pull --no-edit → push`;推完看 Actions 变绿才算上线。
6. 网络需代理:git push 报 Could not resolve host 时先检查代理,必要时重开终端。

## 八、当前待办 / 观察点

- [ ] 首页开门动效:线上偶发不触发(视频 readyState 0 + 滚动锁未生效)。修复方案已验证(v.load 强制加载 + muted 自动播放 + 9 秒兜底),但需基于 main 上的真实文件重做后再推。
- [ ] 验证:8/5(周三)第二篇文章自动上线 + 催收录定时任务准时推送。
- [ ] 验证:每日工作日报 18:07 正常送达新飞书群。
- [ ] 后续:5 个市场落地页(/markets/uae 等,见落地表);Semrush/Ahrefs 接入后做关键词量级验证。

## 九、给新 AI 会话的接手指引

把本文件整体发给新会话,并说明:"这是 WONLY 海外官网项目的全景档案,请按其中的机制、红线和待办继续工作"。涉及仓库改动时,遵守第七节红线;涉及文案时,只使用第二节的真实数据。
