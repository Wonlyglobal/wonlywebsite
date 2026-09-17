# CMS 权限角色后台 PRD

## 目标与范围

超级管理员可查看管理员、邀请账号、启停账号并调整七类角色。角色包括超级管理员、内容编辑、SEO、翻译、销售、审核发布和只读。

- 列表展示邮箱、角色、启用状态和最近登录。
- 角色变更与启停通过受控数据库函数执行并写审计日志。
- 邀请通过自有服务器 `POST /admins/invite` 执行；浏览器只提交邮箱和角色，禁止持有 Supabase service role。
- 数据库保护最后一个启用中的超级管理员。
- 普通角色不可读取管理员名单或调用管理函数。

## 自有服务器接口合同

请求头为 `Authorization: Bearer <Supabase access token>`；请求体为 `{ "email": "name@company.com", "role": "editor", "redirectTo": "https://cms.wonlyglobal.com/cms" }`。

服务端必须验证 JWT，确认调用者为启用中的超级管理员，使用 Auth Admin API 发送邀请，调用 `cms_register_invited_admin(user_id, email, role)`，写入审计记录，并设置精确 CORS 白名单。

仓库提供 `scripts/run-cms-admin-api.mjs`。服务器需设置 `CMS_SUPABASE_URL`、`CMS_SUPABASE_SERVICE_ROLE_KEY`、`CMS_ADMIN_ALLOWED_ORIGIN=https://cms.wonlyglobal.com` 和可选 `PORT`；前端设置 `VITE_CMS_ADMIN_API_URL`。

## 验收流程

1. 超级管理员登录后能看到账号列表与能力矩阵。
2. 编辑或只读账号不能查看名单，RPC 返回 `permission_denied`。
3. 修改测试账号角色后刷新仍保持，审计日志出现 `admin_role_updated`。
4. 停用测试账号后，该账号不能取得有效 CMS 角色。
5. 停用或降级唯一超级管理员时返回 `last_super_admin_protected`。
6. 未配置服务端地址时邀请明确报错；配置后邮件送达，受邀用户首次登录后出现在列表。
7. 浏览器构建产物和网络请求均不含 service role 密钥。

迁移、服务器邀请接口、生产环境变量、生产构建和以上验收全部通过后，才可标记上线。
