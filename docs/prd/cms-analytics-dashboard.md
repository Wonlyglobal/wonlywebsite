# CMS 数据看板 PRD

## 目标与数据契约

统一展示GA4最近28天、GSC延迟3天的最近28天以及CMS实时询盘数据。所有Google指标必须来自自有服务器只读API同步快照；未连接或失败时明确显示缺失，不使用模拟数或上次值冒充实时值。

- GA4：会话、用户、自然搜索会话、`generate_lead`、参与率。
- GSC：点击、展示、CTR、按展示加权平均排名及查询明细。
- CMS询盘：近28天/前28天、当前新询盘/已联系/有效商机/已关闭。
- 每个快照保留统计周期、Google数据截至时间、实际抓取时间和同步任务ID。
- 仅超级管理员与SEO可发起同步；审核发布和销售可只读。询盘汇总另受销售/审核权限控制。

## 服务配置

运行 `scripts/run-cms-analytics-api.mjs`，服务器配置 `CMS_SUPABASE_URL`、`CMS_SUPABASE_SERVICE_ROLE_KEY`、`CMS_ANALYTICS_ALLOWED_ORIGIN=https://cms.wonlyglobal.com`、`GOOGLE_SA_KEY`、`GA4_PROPERTY_ID`，可选 `GSC_SITE` 和 `PORT`。服务账号OAuth由Node内置RSA签名完成，不依赖额外Google运行时包；浏览器仅配置 `VITE_CMS_ANALYTICS_API_URL`。

## 验收流程

1. 未配置分析服务时所有Google卡片显示未连接，数字不出现0或虚拟值。
2. 超级管理员/SEO可以发起同步，其他角色的数据库请求返回 `permission_denied`。
3. 服务端拒绝非白名单Origin、无效JWT、非请求本人及非pending任务。
4. 一次成功同步必须同时写入GA4与GSC快照；缺任一提供方则整次失败。
5. 对照GA4 Data API和GSC Search Analytics API原始响应核对五项和四项指标。
6. 同步失败保留错误状态与安全截断错误，不覆盖上一次成功快照。
7. CMS询盘汇总与对应日期范围和状态的数据库计数一致。
8. 桌面及390px移动端验证卡片、缺失态、同步历史和错误信息。

数据库迁移、服务器部署、Google真实凭据读取和生产浏览器对账完成前不得标记上线。
