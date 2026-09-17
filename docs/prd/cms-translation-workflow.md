# 多语言翻译工作流 PRD 与验收

## 目标

为固定 WONLY 页面建立阿拉伯语、法语、俄语、西班牙语和葡萄牙语的分配、AI 预览、人工编辑、提交审核、批准/退回流程。AI 不接受任意 URL 或任意文本，结果不自动保存或发布。

## 数据契约与权限

- `cms_translation_jobs` 唯一绑定页面与目标语言，记录源版本、译文版本、责任人、审核人和状态。
- Editor 创建/分配任务；Translator/Editor 保存译文；Translator/Editor/SEO 可提交；Reviewer 审核，禁止自审。
- 源版本变化后旧任务拒绝保存，必须重新分配，避免基于过期英文翻译。
- AI 请求仅发送 `page_id` 和受控 `locale` 到 `VITE_CMS_AI_API_URL/translate`；自有服务器验证登录令牌、读取数据库中的固定页面并调用 DeepSeek。
- AI 返回只进入浏览器预览；管理员点击“应用为翻译草稿”后才调用受控 RPC。
- 批准译文仍不会独立上线，必须随页面整体审批发布。

## 验收流程

1. Editor 为固定页面创建五种语言任务，检查唯一约束和源版本。
2. Translator 请求 AI 预览，检查请求体没有任意文本/URL/密钥，返回结果未写数据库。
3. 点击应用后确认译文版本增加、状态为 `ai_draft`、审计与版本记录存在，正式内容不变。
4. 人工修改后保存、提交；同一操作者用 Reviewer 身份不得自审，另一 Reviewer 可退回或批准。
5. 英文源页变更后，旧任务保存返回 `source_changed_reassign_required`。
6. 未配置接口、接口超时、401、DeepSeek 失败均显示真实错误，不生成模拟译文。
7. 阿拉伯语预览验证 RTL；五语桌面和移动端无溢出，整体发布后再核对 hreflang/canonical。
