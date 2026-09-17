# WONLY CMS 自有服务器部署清单

## 原则

- 所有密钥只进入服务器权限为 `0600` 的环境文件，不进入 Git、浏览器构建或 CMS 数据表。
- API 仅监听 `127.0.0.1`，由 HTTPS 反向代理暴露固定路径；只允许 `https://cms.wonlyglobal.com` 的 CORS Origin。
- staging 先部署、迁移和验收；production 必须复用相同构建提交并再次取得发布授权。
- 服务日志不得打印 JWT、客户数据、数据库 URL、DeepSeek/Google 密钥或 webhook 认证头。

## 端口与路径

| 服务 | 默认端口 | 反代路径 | 前端变量 |
|---|---:|---|---|
| 管理员邀请 | 8789 | `/api/admin/` | `VITE_CMS_ADMIN_API_URL` |
| GA4/GSC | 8790 | `/api/analytics/` | `VITE_CMS_ANALYTICS_API_URL` |
| 集成健康 | 8791 | `/api/health/` | `VITE_CMS_HEALTH_API_URL` |
| 备份恢复 | 8792 | `/api/backup/` | `VITE_CMS_BACKUP_API_URL` |
| AI 公开页处理 | 8793 | `/api/ai/` | `VITE_CMS_AI_API_URL` |
| 页面质量 | 8794 | `/api/quality/` | `VITE_CMS_QUALITY_API_URL` |
| 发布执行 | 8795 | `/api/deploy/` | `VITE_CMS_DEPLOY_API_URL` |

反向代理需保留脚本内的子路径，例如 AI 的 `/translate`、质量的 `/quality/run`、发布的 `/releases/trigger`。不得把任意上游 URL 暴露为查询参数。

## 后台任务

- `run-cms-publish-schedules.mjs`：每分钟单次执行，只有 service-role 可发布到期且快照仍有效的任务。
- `run-cms-webhook-worker.mjs`：长驻或每 10 秒轮询；端点与 HMAC 密钥来自 `CMS_WEBHOOK_ENDPOINTS`。
- 所有 API 使用独立 `PORT` 覆盖默认端口，进程失败自动重启；发布与恢复进程设置单实例锁。

## 上线前必需证据

1. 每个 API 的预检请求、无令牌、错误角色、错误 Origin、未知 ID 和成功路径均有真实 HTTP 证据。
2. staging 完成 25 份迁移、七角色权限矩阵和桌面/390px 流程；数据库备份恢复在 staging 演练。
3. DeepSeek 只收到固定公开网页正文；GA4/GSC 与官方界面同周期对账；质量扫描有前后问题变化。
4. production 发布由两人审批，记录 commit、提供商运行地址、健康检查和最终资源哈希。
