import { useEffect, useState } from "react";

/* ── 全站悬浮联系:邮件按钮 + Crisp 在线聊天──
   读取 content/settings/site.json:
     crispId    非空 → 注入 Crisp 在线聊天脚本
   邮件入口直接调起访客默认邮件客户端，不加载第三方通讯脚本。 */

const SITE_RAW = import.meta.glob("/content/settings/site.json", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const SITE_CFG = (() => {
  try { return JSON.parse(Object.values(SITE_RAW)[0] || "{}"); } catch { return {}; }
})() as { crispId?: string };

const CONTACT_EMAIL = "inquiry@wonlyglobal.com";
const EMAIL_LABEL = "Email WONLY";
const EMAIL_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("WONLY Product Enquiry")}`;
const CRISP_ID = (SITE_CFG.crispId || "").trim();

export default function FloatingContact() {
  const [hover, setHover] = useState(false);

  // 在线聊天仅保留 Crisp；延迟到页面空闲后注入，不拖累首屏。
  useEffect(() => {
    if (!CRISP_ID) return;
    if (document.getElementById("chat-script")) return;
    const load = () => {
      const s = document.createElement("script");
      s.id = "chat-script";
      s.async = true;
      (window as unknown as { $crisp: unknown[] }).$crisp = [];
      (window as unknown as { CRISP_WEBSITE_ID: string }).CRISP_WEBSITE_ID = CRISP_ID;
      s.src = "https://client.crisp.chat/l.js";
      document.body.appendChild(s);
    };
    const t = window.setTimeout(load, 3500);
    return () => window.clearTimeout(t);
  }, []);

  // 聊天气泡占用右下角;启用聊天时邮件按钮上移避让。
  const bottom = CRISP_ID ? 96 : 24;

  return (
    <a
      href={EMAIL_HREF}
      aria-label={EMAIL_LABEL}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed",
        right: 24,
        bottom,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
      }}
    >
      {hover && (
        <span
          style={{
            background: "#221F20",
            color: "#F5F1EA",
            fontSize: 13,
            padding: "8px 14px",
            borderRadius: 99,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          {EMAIL_LABEL}
        </span>
      )}
      <span
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#B08D4F",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 10px 28px rgba(176,141,79,0.4), 0 3px 10px rgba(0,0,0,0.2)",
          transition: "transform 0.18s ease",
          transform: hover ? "scale(1.08)" : "scale(1)",
        }}
      >
        {/* Email glyph */}
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4.5" y="7" width="23" height="18" rx="2.5" />
          <path d="m6.5 9 9.5 7.5L25.5 9" />
        </svg>
      </span>
    </a>
  );
}
