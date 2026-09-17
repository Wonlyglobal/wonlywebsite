# 发布环境管理 PRD 与验收

## 目标

集中展示 development、staging、production 的真实网址、提供商、分支、健康状态和最近部署；建立可审计的发布申请、双人批准、部署执行与服务器回执链路。

## 数据与权限

- `cms_environments` 只保存环境配置及服务器最后回执，不在浏览器保存部署密钥。
- `cms_releases` 保存 revision/tag、摘要、artifact digest、申请/批准人、提供商运行地址和终态错误。
- 发布角色创建发布；受保护环境默认 `requested` 且禁止自己批准。非保护环境可直接 `approved`。
- 浏览器触发时只向自有部署服务发送 `release_id`；服务端重新验证 JWT、环境和批准状态后执行，并用 service-role RPC 回写 queued/deploying/succeeded/failed。
- 没有健康检查或部署回执时必须显示 unknown/待执行，不推断成功。

## 服务配置

运行 `scripts/run-cms-deploy-api.mjs`，配置 Supabase 服务端变量、`CMS_DEPLOY_ALLOWED_ORIGIN` 和服务器专用 `CMS_DEPLOY_TARGETS`。映射按环境键固定提供商 webhook、认证头、超时及允许的健康检查 origin；浏览器不能传 webhook、命令、分支或健康地址。服务只接受已批准的 release ID，并以真实提供商及健康检查结果回写终态。

## 验收流程

1. 配置三个真实环境，核对域名、provider、branch、保护标识和健康 URL。
2. Staging 创建发布并触发，确认服务端只接受已批准 release_id，状态按 queued→deploying→终态变化。
3. Production 由 A 申请、B 批准；A 自审必须失败。构建失败时记录真实 provider URL 与错误。
4. 成功后环境最近 revision/时间更新；随后执行 health URL、首页与静态资源验证。
5. 接口未配置、超时、401、重复触发、未知 revision 均显示真实失败，不生成假运行记录。
6. 桌面和移动端检查环境卡、发布表单和50条历史无溢出。
