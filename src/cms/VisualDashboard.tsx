import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { CMS_PAGES } from "./pageDefinitions";
import { cmsSupabase } from "./supabase";
import { editableImageElements, editableTextElements, visualElementKey, type VisualContent, type VisualItem } from "./visualContent";

type PageRow = { id: string; page_key: string; draft_content: VisualContent; translations: Record<string, VisualContent>; status: "draft" | "published" };
const LANGUAGES = [["en", "English"], ["ar", "العربية"], ["fr", "Français"], ["ru", "Русский"], ["es", "Español"]] as const;

export default function VisualDashboard({ session }: { session: Session }) {
  const [page, setPage] = useState(CMS_PAGES[0]);
  const [language, setLanguage] = useState("en");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [values, setValues] = useState<Record<string, VisualItem>>({});
  const [row, setRow] = useState<PageRow | null>(null);
  const [notice, setNotice] = useState("点击页面中的文字或图片即可编辑");
  const [busy, setBusy] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageTarget = useRef<{ element: HTMLElement; key: string; target: "src" | "background" | "poster" } | null>(null);

  const load = useCallback(async () => {
    if (!cmsSupabase) return;
    const { data, error } = await cmsSupabase.from("cms_pages").select("id,page_key,draft_content,translations,status").eq("page_key", page.key).maybeSingle();
    if (error) return setNotice(error.message);
    const next = data as PageRow | null;
    setRow(next);
    setValues(language === "en" ? (next?.draft_content?.visual ?? {}) : (next?.translations?.[language]?.visual ?? {}));
  }, [language, page.key]);
  useEffect(() => { void load(); }, [load]);

  const enableEditing = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    doc.querySelector("style[data-cms-editor]")?.remove();
    const style = doc.createElement("style");
    style.dataset.cmsEditor = "true";
    style.textContent = `.cms-editable{outline:1px dashed transparent;outline-offset:4px;cursor:text!important}.cms-editable:hover,.cms-editable:focus{outline:2px solid #2864ff!important;background:rgba(40,100,255,.09)!important}img.cms-editable{cursor:pointer!important}`;
    doc.head.appendChild(style);
    const textNodes = editableTextElements(doc);
    textNodes.forEach(element => {
      const key = visualElementKey(element);
      element.classList.add("cms-editable");
      element.contentEditable = "true";
      element.spellcheck = true;
      if (values[key]?.type === "text") element.textContent = values[key].value;
      element.onclick = event => { event.preventDefault(); event.stopPropagation(); element.focus(); setNotice("正在原位编辑文字"); };
      element.onblur = () => setValues(current => ({ ...current, [key]: { type: "text", value: element.textContent?.trim() ?? "" } }));
    });
    const imageElements = editableImageElements(doc);
    imageElements.forEach(element => {
      const key = visualElementKey(element);
      element.classList.add("cms-editable");
      const target = element instanceof HTMLImageElement ? "src" : element instanceof HTMLVideoElement ? "poster" : "background";
      if (values[key]?.type === "image") { if (element instanceof HTMLImageElement) { element.src = values[key].value; element.alt = values[key].alt ?? element.alt; } else if (element instanceof HTMLVideoElement) element.poster = values[key].value; else element.style.backgroundImage = `url("${values[key].value}")`; }
      element.onclick = event => { event.preventDefault(); event.stopPropagation(); imageTarget.current = { element, key, target }; fileRef.current?.click(); };
    });
    setNotice("完整页面已进入编辑模式；悬停会显示蓝色编辑框");
  }, [values]);

  const replaceImage = async (file: File) => {
    if (!cmsSupabase || !imageTarget.current) return;
    if (file.size > 10 * 1024 * 1024) return setNotice("图片不能超过 10MB");
    setBusy(true);
    const path = `${page.key}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error } = await cmsSupabase.storage.from("website-assets").upload(path, file);
    if (error) { setBusy(false); return setNotice(error.message); }
    const { data } = cmsSupabase.storage.from("website-assets").getPublicUrl(path);
    const target = imageTarget.current;
    if (target.element instanceof HTMLImageElement) target.element.src = data.publicUrl;
    else if (target.element instanceof HTMLVideoElement) target.element.poster = data.publicUrl;
    else target.element.style.backgroundImage = `url("${data.publicUrl}")`;
    setValues(current => ({ ...current, [target.key]: { type: "image", value: data.publicUrl, alt: target.element instanceof HTMLImageElement ? target.element.alt : "", target: target.target } }));
    await cmsSupabase.from("cms_assets").insert({ storage_path: path, public_url: data.publicUrl, original_name: file.name, mime_type: file.type, byte_size: file.size, uploaded_by: session.user.id });
    setNotice("图片已替换，请保存草稿");
    setBusy(false);
  };

  const persist = async (publish: boolean) => {
    if (!cmsSupabase) return;
    setBusy(true);
    const draftContent = language === "en" ? { ...(row?.draft_content ?? {}), visual: values } : (row?.draft_content ?? {});
    const translations = { ...(row?.translations ?? {}) };
    if (language !== "en") translations[language] = { ...(translations[language] ?? {}), visual: values };
    const publishedContent = { ...draftContent, translations };
    const payload = { page_key: page.key, page_type: page.type, route: page.route, title: page.title, source_locale: "en", draft_content: draftContent, translations, status: publish ? "published" : (row?.status ?? "draft"), updated_by: session.user.id, ...(publish ? { published_content: publishedContent, published_at: new Date().toISOString() } : {}) };
    const { data, error } = await cmsSupabase.from("cms_pages").upsert(payload, { onConflict: "page_key" }).select().single();
    if (error) { setBusy(false); return setNotice(error.message); }
    await cmsSupabase.from("cms_revisions").insert({ page_id: data.id, action: publish ? "published" : "draft_saved", snapshot: publishedContent, created_by: session.user.id });
    setNotice(publish ? "已发布；重新打开该官网页面即可读取新内容" : "草稿已保存，并生成版本记录");
    await load();
    setBusy(false);
  };

  const localizedRoute = language === "en" ? page.route : `/${language}${page.route === "/" ? "" : page.route}`;
  return <main className="cms-root cms-visual-shell">
    <header className="cms-visual-toolbar"><div className="cms-visual-brand"><strong>WONLY</strong><span>整页编辑</span></div><select aria-label="页面" value={page.key} onChange={event => setPage(CMS_PAGES.find(item => item.key === event.target.value) ?? CMS_PAGES[0])}>{CMS_PAGES.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}</select><select aria-label="语言" value={language} onChange={event => setLanguage(event.target.value)}>{LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select><div className="cms-device-toggle"><button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}>电脑</button><button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}>手机</button></div><div className="cms-visual-actions"><button className="cms-button secondary" onClick={() => setToolsOpen(value => !value)}>{toolsOpen ? "收起工具" : "展开工具"}</button><button className="cms-button secondary" disabled={busy} onClick={() => void persist(false)}>保存草稿</button><button className="cms-button" disabled={busy} onClick={() => void persist(true)}>确认并发布</button><button className="cms-button secondary" onClick={() => cmsSupabase?.auth.signOut()}>退出</button></div></header>
    <div className="cms-visual-status">{notice}</div><section className={`cms-visual-workspace ${toolsOpen ? "panel-open" : ""}`}><div className={`cms-site-canvas ${device}`}><iframe ref={frameRef} title={`${page.title}整页编辑`} src={`${localizedRoute}?cms_canvas=1`} onLoad={enableEditing}/></div>{toolsOpen ? <aside className="cms-visual-panel"><h2>页面工具</h2><p>当前：{page.title}</p><p>语言：{LANGUAGES.find(([code]) => code === language)?.[1]}</p><div className="cms-tool-card"><strong>直接编辑</strong><p>点击文字直接输入；点击图片、背景图或视频封面从电脑上传替换。</p></div><div className="cms-tool-card"><strong>稍后接入</strong><p>SEO、历史版本、导航与 AI 翻译会放在这里，不遮挡完整页面。</p></div><div className="cms-tool-card warning"><strong>发布规则</strong><p>各语言草稿独立保存，不会互相覆盖；只有“确认并发布”才更新网站读取的内容。</p></div></aside> : null}</section>
    <input ref={fileRef} hidden type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={event => { const file = event.target.files?.[0]; if (file) void replaceImage(file); event.currentTarget.value = ""; }}/>
  </main>;
}
