# WONLY · Metal Door 页面落地包（给 agent，一次性）

> 本文件 = 完整落地说明。像素级参考页在同目录：**metal-door-reference.html**
> 浏览器打开 http://localhost:5173/_agent/metal-door-reference.html 可直接预览两块效果。
> markup 与 CSS 一律以参考页为准，一比一复刻。

## 0. 范围
新建 Metal Door 产品页，落地两块：1) Banner（浅香槟英雄区）2) Smart Features（深色 bento 六格：5 视频 + 1 纯 CSS 动效格）。后续板块之后再排。

## 1. 路由 & 导航
- 新建 src/pages/MetalDoor.tsx，App.tsx 加路由 /products/door/metal-door。
- 导航 Product > Door > Metal Door，用 <Link to>，不整页刷新。
- 顺序：Banner -> SmartFeatures。

## 2. 资源（本地引用，禁外链）
- Banner 图：images/door/door-banner6-1920x1000.jpg（已裁 1920x1000）
- Auto Open & Close -> images/door/selling point/Auto Open & Close.mp4
- Smart Anti-Pinch System -> images/door/selling point/Smart Anti-Pinch System.mp4
- Dual Power Supply -> images/door/selling point/power supply3.mp4  (用这个名)
- Smart Perimeter Monitoring -> images/door/selling point/Smart Perimeter Monitoring.mp4
- Smart Voice Message -> images/door/selling point/Smart Voice Message2.mp4
- Formaldehyde Sentinel -> 无视频，纯 CSS/SVG（参考页 .air 复刻）
- React 路径用 ${import.meta.env.BASE_URL}images/door/...（别用开头的 /）。文件名带空格保留或 encodeURI。忽略未采用的 Dual Power Supply2.mp4。

## 3. Section 1 — Banner
见参考页 .hero。文案逐字照抄：
- eyebrow: WONLY · Metal Door
- H1: Pioneer of the （换行，粗体）Robotic Security Door
- sub: Cast-aluminium doors that open as you approach — 30 years of security, reimagined.
- 按钮: Get a Quote →（实心）/ Explore the Range（玻璃描边）
移动端 aspect-ratio:3/4，门图 object-position:74%，scrim 转上下向。

## 4. Section 2 — Smart Features
深色底 #0c0b0a。bento 4 列，行高 210px 210px 300px（最后一行高，已定稿），gap 14px。
六格顺序：big(2x2) Auto Open & Close｜wide Smart Anti-Pinch System｜sm Dual Power Supply｜sm Formaldehyde Sentinel(动效)｜wide Smart Perimeter Monitoring｜wide Smart Voice Message。
视频格：<video autoplay muted loop playsinline preload="metadata"> object-fit:cover，上方深色 scrim，标题白字左上。muted+loop+playsinline 必带。
Formaldehyde 格复制参考页 .air（SVG 环形仪表+数值），JS 改 useEffect+setInterval，卸载 clearInterval。HCHO ≤0.03 mg/m³ = Good。
标题：eyebrow Smart Technology；H2 Six Systems.（金色粗体）One Intelligent Door（结尾无句号）。

## 5. 文案规范（后续板块也照此）
核心：大标题/卡片标题/按钮/导航/eyebrow 一律 Title Case，句末不加标点；副标题/正文句子式加句号。
- eyebrow 全大写无标点；小词(a/the/and/or/of/to/in/on≤4字母介词)非首尾小写。
- 标点：范围 en dash 0.8–3 m；插入语 em dash —（两侧空格）；牛津逗号；弯引号；不用感叹号。
- 数字与单位间空格 90 mm / 4,200 mAh，%/°紧贴，千位逗号。英式拼写 aluminium/customise/centre/colour。
- 固定拼法 WONLY / cast-aluminium / Robotic Security Door / R&D / OEM / ODM。

## 6. 性能
6 个 mp4 原始 1280x720 60fps 6–8MB。视频加 preload="metadata"。可选：IntersectionObserver 进视口再 play()。目录名带空格，部署确认编码。

## 7. 完成后
git add -A && git commit && git push。汇总改了哪些文件。
