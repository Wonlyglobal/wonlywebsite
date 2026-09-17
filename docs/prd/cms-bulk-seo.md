# 批量 SEO 管理 PRD 与验收

## 目标与范围

管理员可按页面、路径和类型筛选固定 CMS 页面，一次选择最多 100 页，批量维护 SEO 标题、描述、Canonical、Robots 与分享图。保存只产生新草稿，不直接改动正式网站。

## 权限与数据契约

- 允许 `super_admin`、`editor`、`seo` 保存；其他角色只读。
- RPC：`cms_bulk_update_seo(p_updates jsonb)`；每项包含 `page_id`、`expected_version`、`seo`。
- SEO 只允许 `title`、`description`、`canonical`、`robots`、`ogImage`；标题不超过 70 字符，描述不超过 180 字符。
- Canonical 只接受站内绝对路径或 HTTPS；Robots 只接受三种受控值。
- 任一页面版本冲突则事务整体失败，不出现部分成功。
- 成功后内容版本递增、状态回到草稿、旧审批被作废、待发布任务被取消，并生成版本及审计记录。

## 验收流程

1. SEO 角色登录，搜索并选择两个页面，修改标题/描述后保存。
2. 确认提示为“草稿、尚未发布”，两个页面版本各递增 1，正式内容不变。
3. 检查 `cms_revisions` 产生 `bulk_seo_saved`，`cms_audit_logs` 产生 `bulk_seo_updated`。
4. 用超过 70 字符标题、非法 Canonical、未知 Robots 值测试，确认整批拒绝。
5. 先在另一个会话更新页面，再用旧版本提交，确认返回 `version_conflict` 且无页面被部分修改。
6. Viewer 登录时保存按钮不可用；Editor、SEO、Super admin 可用。
7. 桌面和窄屏检查字段无溢出，搜索与当前结果全选可用。
