/* ── 表单投递配置(在 /admin 站点后台"站点通用"里可改)──
   读取 content/settings/site.json:
     formKey  Web3Forms Access Key —— 决定询盘邮件发到哪个邮箱
              (该邮箱 = 在 web3forms.com 申请这把 key 时填写的收件邮箱)
     formCc   抄送邮箱(多个用英文逗号分隔;部分套餐才支持,留空即不抄送)
   两者留空时回落到下面的默认 key,保证任何情况下表单都不会失效。 */

const RAW = import.meta.glob("/content/settings/site.json", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const CFG = (() => {
  try { return JSON.parse(Object.values(RAW)[0] || "{}"); } catch { return {}; }
})() as { formKey?: string; formCc?: string };

/* 兜底 key(现有 key,历史收件邮箱)——CMS 里填了新 key 就自动切换 */
const FALLBACK_KEY = "5054e990-b5a3-47e9-a659-f8e4dd7e69c7";

export const FORM_ENDPOINT = "https://api.web3forms.com/submit";
export const FORM_KEY = (CFG.formKey || "").trim() || FALLBACK_KEY;
export const FORM_CC = (CFG.formCc || "").trim();

/* 统一投递:自动带上 access_key / 抄送 / 回复地址,页面只传业务字段 */
export async function submitEnquiry(payload: Record<string, string>): Promise<{ success: boolean; message?: string }> {
  const body: Record<string, string> = {
    access_key: FORM_KEY,
    from_name: "WONLY Website",
    ...payload,
  };
  if (FORM_CC) body.ccemail = FORM_CC;
  if (payload.email) body.replyto = payload.email;
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
}
