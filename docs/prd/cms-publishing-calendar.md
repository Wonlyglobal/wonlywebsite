# CMS 内容发布日历与定时发布 PRD

## 目标

让有发布权限的管理员把已经审核通过且版本未变化的页面安排到未来时间发布。数据库统一保存 UTC，后台按站点时区（默认 `Asia/Shanghai`）展示。

## 角色与规则

- `reviewer`、`super_admin` 可创建和取消排期；其他角色只读。
- 仅 `workflow_status=approved` 且批准请求版本等于当前 `content_version` 时允许排期。
- 页面修改后旧批准与排期不能发布旧内容；每页只允许一个待执行任务。
- 执行失败保留原因并写审计日志，不伪装为成功。

## 数据契约

`cms_publish_schedules` 保存页面、批准请求、UTC 时间、显示时区、状态、操作者、执行时间和失败原因。

- `cms_schedule_publish(page_id, scheduled_for, timezone)` 创建排期。
- `cms_cancel_schedule(schedule_id)` 取消待执行任务。
- `cms_run_due_publications(limit)` 仅供 `service_role` 调用，复核批准版本后发布。

自有服务器每分钟执行 `node scripts/run-cms-publish-schedules.mjs`；密钥只通过 `CMS_SUPABASE_URL` 与 `CMS_SUPABASE_SERVICE_ROLE_KEY` 环境变量提供，不进入浏览器构建包、仓库或日志。

## 验收流程

1. 普通编辑者不能创建或取消排期。
2. 未批准、批准版本已过期、过去时间均创建失败。
3. 当前批准版本可创建，数据库为 UTC，后台按北京时间显示。
4. 同一页面重复待执行任务被拒绝；取消后不再执行。
5. 服务端运行到期任务后，页面、审批和任务状态同步完成并生成审计记录。
6. 排期后页面被修改时执行失败并保留原因，线上内容不被旧快照覆盖。
7. 桌面与 390px 移动端均可查看、创建和取消。
