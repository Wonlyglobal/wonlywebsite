# WONLY 官网安全与稳定手册

> 适用:www.wonlyglobal.com(GitHub Pages,仓库 Wonlyglobal/wonlywebsite)
> 安全责任人:chloe(GitHub 组织 Owner)
> 更新:2026-08-04

## 一、架构安全底座(为什么这个站天生比较安全)

纯静态站:没有服务器、没有数据库、没有登录态,常见的注入/提权/拖库攻击无处下手。
全部改动走 Git:每一次变更都有记录、可追溯、可一键回滚。
真正的风险集中在三处:**账号(GitHub/域名)、发布链路(Actions/CMS)、可用性(Pages/DNS)**。

## 二、事故处理 SOP

### 2.1 页面出错/被改坏 → 3 分钟回滚

```
cd /d D:\ai项目\wonly官网
git log --oneline -10        # 找到出问题的提交号
git revert <提交号> --no-edit
git push
```

推送后 2-4 分钟自动部署,线上恢复。**不要用 git reset --hard 处理已推送的提交**。

### 2.2 构建失败(飞书收到"构建/部署失败"告警)

线上不会坏——构建失败时 Pages 继续提供上一个成功版本。处理:打开告警里的
Actions 链接看红叉步骤的日志,通常是最近一次提交的语法错误;修复或 revert 该提交即可。

### 2.3 网站打不开(飞书收到"访问异常"告警)

按顺序排查:
1. https://www.githubstatus.com — GitHub Pages 全球故障?等待恢复即可(历史上通常 1 小时内)。
2. 本机 `nslookup www.wonlyglobal.com` — 应指向 wonlyglobal.github.io。不对=DNS 问题,登录 ename.cn 检查解析记录是否被改。
3. 仓库 Settings → Pages — 确认 Custom domain 仍是 www.wonlyglobal.com 且 HTTPS 打勾。

### 2.4 怀疑 GitHub 账号被盗/PAT 泄露

1. GitHub → Settings → Developer settings → Personal access tokens → 立即 Revoke 可疑令牌。
2. 组织 Settings → People → 移除可疑成员;修改自己密码 + 重置 2FA。
3. `git log --oneline -20` 检查是否有陌生提交,有则 revert。

### 2.5 域名/DNS 被改

ename.cn 登录 → 域名解析 → 恢复:`www` CNAME → `wonlyglobal.github.io`。
**任何时候都不要动 NS 记录。**

## 三、账号与权限规范

### GitHub 组织(Wonlyglobal)
- 组织 Settings → Authentication security → 勾选 **Require two-factor authentication**。
- 成员最小化:只加需要发内容的同事,角色给 Member 不给 Owner。
- 每位同事的 PAT 规范:**Fine-grained** / 只授权 wonlywebsite 一个仓库 / 权限只勾
  Contents: Read and write / 有效期 90 天 / 同事离职当天 Revoke。
- 其他 AI 工具/第三方应用不授权此仓库(2026-08-04 曾有工具向仓库写入 4.5GB 无关文件)。

### 域名(ename.cn)
- 账号开启二次验证(短信/App)。
- 添加 CAA 记录限制证书签发(解析处新增记录):
  `类型 CAA | 主机记录 @ | 值 0 issue "letsencrypt.org"`
  (GitHub Pages 的证书由 Let's Encrypt 签发,此记录能阻止其他机构给这个域名乱签证书。)

### 内容后台(/admin)
- CMS 脚本已锁定版本号(@0.179.0)——不会自动加载上游最新代码,升级需人工改版本号。
- /admin 页面全部 noindex,不会被搜索引擎收录。
- 同事只给 /admin/content/(文章后台)入口;/admin/site/ 站点后台仅管理员使用。

## 四、监控与告警(飞书日报群)

| 告警 | 触发条件 | 频率 |
|---|---|---|
| 构建/部署失败 | 任何一次 Actions 构建红 | 实时 |
| 网站访问异常 | 首页或文章页连续 3 次探测非 200 | 每小时探测 |
| 备份失败 | 每周仓库备份任务失败 | 每周日 |

增强(可选,免注册即弃):UptimeRobot.com 免费版可做 5 分钟粒度探测 + 邮件告警,
注册后添加 HTTP 监控 https://www.wonlyglobal.com 即可,与上表互为补充。

## 五、备份与恢复

- 每周日自动生成整仓 git bundle(Actions → Weekly Repo Backup → Artifacts,保留 90 天)。
- 每季度手动下载一份 bundle 归档到公司内部存储。
- 恢复:`git clone wonlywebsite-YYYYMMDD.bundle 恢复目录` 即得完整仓库与历史。
- 此外每位同事电脑上的 clone、GitHub 云端本身都是天然副本。

## 六、月度安全检查清单(责任人:chloe,每月 1 号)

- [ ] 组织 People 页:成员列表无陌生人,2FA 全绿
- [ ] 自己的 PAT 列表:无不认识的令牌;同事令牌未过期(过期前重发)
- [ ] Actions 页:Deploy/Uptime/Backup 三个工作流最近运行全绿
- [ ] ename.cn:解析记录未被改动(www CNAME → wonlyglobal.github.io)
- [ ] Dependabot alerts 页:无高危依赖告警(有则告知技术处理)
- [ ] 下载最近一次 backup artifact 抽查可用(每季度一次)

## 七、待办(需要付费/审批的项)

- [ ] **仓库转私有**:需 GitHub Team(约 $4/人/月)。路径:Organization Settings →
  Billing 升级后,仓库 Settings → Danger Zone → Change visibility → Private。
  注意:转私有后 Pages 正常,但所有同事 PAT 需确认仍有效。
- [ ] Cloudflare 前置(CDN+DDoS 防护):本季度暂缓,重新评估时找 Claude 出迁移方案。
- [ ] main 分支保护:仓库 Settings → Branches → Add branch ruleset:
  勾选 Block force pushes + Restrict deletions(不勾 require PR,否则后台保存会被挡)。
