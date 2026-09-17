# 表单构建器 PRD 与验收

## 目标

后台配置官网询盘表单的字段、顺序、标签、必填规则和成功提示，同时复用现有企业邮箱投递、CMS/CRM 归档及 GA4 转化事件，不建立重复通知渠道。

## 数据与权限

- 支持 `name/company/job_title/country/email/phone/business_type/message/consent` 九个受控字段和六种输入类型，最多 20 项且字段键不重复。
- Editor 保存草稿；Reviewer 发布表单定义；Viewer 只读。保存草稿不改变线上表单。
- `cms_published_forms` 只公开已发布 schema，不公开操作者或草稿。
- 官网获取不到已发布定义或数据库不可用时使用代码内现有字段，确保询盘不中断。
- 发布定义只改变允许字段、必填校验和文案；`submitEnquiry` 继续投递绑定邮箱，成功后写入现有 `cms_inquiries`，不额外发官网通知。

## 验收流程

1. 新建 contact_page 表单，添加、删除和拖拽字段；重复键、未知键/类型和超过20项均被数据库拒绝。
2. 保存草稿后刷新，线上联系页保持不变；Reviewer 发布后线上读取发布定义。
3. 隐藏可选字段、调整标签与必填项，验证桌面/390px表单布局、键盘操作及错误提示。
4. 真实提交测试：邮箱收到一封、`cms_inquiries`/CRM 仅产生一条、GA4 仅记录一次 generate_lead；失败不得误报成功。
5. 数据库或配置读取失败时验证现有固定表单仍可提交。
6. Viewer/Translator/SEO 不可保存；Editor 不可发布；Reviewer 不可编辑草稿。
