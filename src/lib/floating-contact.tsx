import { useEffect, useState } from "react";

/* ── 全站悬浮客服:WhatsApp 按钮 + Tawk.to 在线聊天(在 /admin 站点后台配置)──
   读取 content/settings/site.json:
     whatsapp   非空 → 显示右下角 WhatsApp 悬浮按钮(纯链接,零脚本)
     tawkId     非空 → 注入 Tawk.to 聊天脚本(格式 propertyId/widgetId)
   两者都留空则本组件不渲染任何内容,也不加载任何第三方脚本。 */

const SITE_RAW = import.meta.glob("/content/settings/site.json", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const SITE_CFG = (() => {
  try { return JSON.parse(Object.values(SITE_RAW)[0] || "{}"); } catch { return {}; }
})() as { whatsapp?: string; whatsappLabel?: string; tawkId?: string };

const WA_NUMBER = (SITE_CFG.whatsapp || "").replace(/\D/g, "");
const WA_LABEL = SITE_CFG.whatsappLabel?.trim() || "Chat on WhatsApp";
const TAWK_ID = (SITE_CFG.tawkId || "").trim();

export default function FloatingContact() {
  const [hover, setHover] = useState(false);

  // Tawk.to:配置了 ID 才加载,且延迟到页面空闲后注入,不拖累首屏。
  useEffect(() => {
    if (!TAWK_ID) return;
    if (document.getElementById("tawk-script")) return;
    const load = () => {
      const s = document.createElement("script");
      s.id = "tawk-script";
      s.async = true;
      s.src = `https://embed.tawk.to/${TAWK_ID}`;
      s.charset = "UTF-8";
      s.setAttribute("crossorigin", "*");
      document.body.appendChild(s);
    };
    const t = window.setTimeout(load, 3500);
    return () => window.clearTimeout(t);
  }, []);

  if (!WA_NUMBER) return null;

  // Tawk 自带聊天气泡在右下角;有 Tawk 时 WhatsApp 按钮上移避让。
  const bottom = TAWK_ID ? 96 : 24;

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WA_LABEL}
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
          {WA_LABEL}
        </span>
      )}
      <span
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#25D366",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 10px 28px rgba(37,211,102,0.45), 0 3px 10px rgba(0,0,0,0.2)",
          transition: "transform 0.18s ease",
          transform: hover ? "scale(1.08)" : "scale(1)",
        }}
      >
        {/* WhatsApp glyph */}
        <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
          <path d="M16.02 5.33c-5.87 0-10.64 4.77-10.64 10.64 0 1.88.49 3.71 1.43 5.32L5.3 26.7l5.55-1.46a10.6 10.6 0 0 0 5.17 1.34h.01c5.86 0 10.63-4.77 10.63-10.64 0-2.84-1.1-5.51-3.11-7.52a10.57 10.57 0 0 0-7.53-3.1zm0 19.46h-.01a8.8 8.8 0 0 1-4.49-1.23l-.32-.19-3.3.86.88-3.21-.21-.33a8.79 8.79 0 0 1-1.35-4.72c0-4.88 3.97-8.85 8.86-8.85 2.36 0 4.58.92 6.25 2.59a8.8 8.8 0 0 1 2.59 6.26c0 4.88-3.98 8.85-8.86 8.85zm4.86-6.63c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.33-.79-.71-1.33-1.58-1.48-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.44.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.21 0 1.3.95 2.56 1.08 2.74.13.18 1.87 2.86 4.53 4.01.63.27 1.13.44 1.51.56.64.2 1.22.17 1.68.11.51-.08 1.58-.65 1.8-1.27.22-.62.22-1.16.16-1.27-.07-.11-.24-.18-.51-.31z" />
        </svg>
      </span>
    </a>
  );
}
