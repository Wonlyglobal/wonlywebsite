import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { CMS_PAGES } from "./pageDefinitions";
import { cmsSupabase } from "./supabase";
import { applyLayoutContent, applyManagedSections, editableImageElements, editableSections, editableTextElements, visualElementKey, type CmsSeo, type VisualContent, type VisualItem } from "./visualContent";
import InquiryDashboard from "./InquiryDashboard";
import CmsSidebar, { type CmsWorkspace } from "./CmsSidebar";
import CmsModuleDashboard from "./CmsModuleDashboard";
import BlockEditor from "./BlockEditor";
import { can, type CmsRole, type CmsSection, type WorkflowStatus } from "./cmsGovernance";
import { useCmsAutosave } from "./useCmsAutosave";

type PageRow = { id: string; page_key: string; draft_content: VisualContent & { sections?: CmsSection[] }; published_content: (VisualContent & { translations?: Record<string, VisualContent>; sections?: CmsSection[] }) | null; translations: Record<string, VisualContent>; status: "draft" | "published"; content_version:number; workflow_status:WorkflowStatus };
const LANGUAGES = [["en", "English"], ["ar", "العربية"], ["fr", "Français"], ["ru", "Русский"], ["es", "Español"], ["pt", "Português"]] as const;
const EMPTY_SEO: CmsSeo = { title: "", description: "", canonical: "", ogImage: "", robots: "index, follow" };
const imageCaptureHandlers = new WeakMap<Document, EventListener>();

function seoFromDocument(doc?: Document | null): CmsSeo {
  if (!doc) return EMPTY_SEO;
  const meta = (selector: string) => doc.head.querySelector<HTMLMetaElement>(selector)?.content?.trim() ?? "";
  const robots = meta('meta[name="robots"]') || EMPTY_SEO.robots!;
  return {
    title: doc.title.trim(),
    description: meta('meta[name="description"]'),
    canonical: doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href?.trim() ?? "",
    ogImage: meta('meta[property="og:image"]'),
    robots: robots.replace(/\s*,\s*/g, ", "),
  };
}

function mergeSeo(existing: CmsSeo | undefined, fallback: CmsSeo): CmsSeo {
  const current = { ...EMPTY_SEO, ...(existing ?? {}) };
  return Object.fromEntries(Object.entries(current).map(([key, value]) => [key, String(value ?? "").trim() || String(fallback[key as keyof CmsSeo] ?? "")])) as CmsSeo;
}

const isImageElement = (element: HTMLElement): element is HTMLImageElement => element.tagName === "IMG";
const isVideoElement = (element: HTMLElement): element is HTMLVideoElement => element.tagName === "VIDEO";

function imageSource(element: HTMLElement) {
  if (isImageElement(element)) return element.currentSrc || element.src;
  if (isVideoElement(element)) return element.poster;
  const background = element.ownerDocument.defaultView?.getComputedStyle(element).backgroundImage ?? "";
  return background.match(/url\(["']?(.*?)["']?\)/)?.[1] ?? "";
}

function changesBetween(current: VisualContent, published?: VisualContent | null) {
  const before = published ?? {};
  const currentVisual = current.visual ?? {};
  const beforeVisual = before.visual ?? {};
  const visual = new Set([...Object.keys(currentVisual), ...Object.keys(beforeVisual)]);
  let text = 0;
  let images = 0;
  visual.forEach(key => {
    if (JSON.stringify(currentVisual[key]) === JSON.stringify(beforeVisual[key])) return;
    if (currentVisual[key]?.type === "image" || beforeVisual[key]?.type === "image") images += 1;
    else text += 1;
  });
  return { text, images, seo: JSON.stringify(current.seo ?? {}) !== JSON.stringify(before.seo ?? {}), layout: JSON.stringify(current.layout ?? {}) !== JSON.stringify(before.layout ?? {}) };
}

export default function VisualDashboard({ session }: { session: Session }) {
  const [workspace, setWorkspace] = useState<CmsWorkspace>("pages");
  const [page, setPage] = useState(CMS_PAGES[0]);
  const [language, setLanguage] = useState("en");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [content, setContent] = useState<VisualContent>({ visual: {}, seo: EMPTY_SEO, layout: {} });
  const [row, setRow] = useState<PageRow | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [notice, setNotice] = useState("点击页面中的文字、图片或板块即可编辑");
  const [busy, setBusy] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);
  const [homeStage, setHomeStage] = useState<"intro" | "main">("intro");
  const [role,setRole]=useState<CmsRole>("viewer");
  const [contentVersion,setContentVersion]=useState(1);
  const [workflowStatus,setWorkflowStatus]=useState<WorkflowStatus>("draft");
  const [sections,setSections]=useState<CmsSection[]>([]);
  const [reviewId,setReviewId]=useState<string|null>(null);
  const [selectedImage, setSelectedImage] = useState<{ key: string; value: string; alt: string; canEditAlt: boolean } | null>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const seoDefaultsRef = useRef<Record<string, CmsSeo>>({});
  const imageTarget = useRef<{ element: HTMLElement; key: string; target: "src" | "background" | "poster" } | null>(null);

  const load = useCallback(async () => {
    if (!cmsSupabase) return;
    const { data, error } = await cmsSupabase.from("cms_pages").select("id,page_key,draft_content,published_content,translations,status,content_version,workflow_status").eq("page_key", page.key).maybeSingle();
    if (error) return setNotice(error.message);
    const next = data as PageRow | null;
    const localized = language === "en" ? next?.draft_content : next?.translations?.[language];
    setRow(next);
    setContentVersion(next?.content_version??1);
    setWorkflowStatus(next?.workflow_status??"draft");
    if(next?.id){const{data:pending}=await cmsSupabase.from("cms_review_requests").select("id").eq("page_id",next.id).eq("status","pending").order("created_at",{ascending:false}).limit(1).maybeSingle();setReviewId(pending?.id??null)}else setReviewId(null);
    const loaded = { visual: {}, seo: EMPTY_SEO, layout: {}, ...(localized ?? {}) } as VisualContent;
    const fallback = seoDefaultsRef.current[`${page.key}:${language}`] ?? EMPTY_SEO;
    setContent({ ...loaded, seo: mergeSeo(loaded.seo, fallback) });
    setSections((loaded as VisualContent & {sections?:CmsSection[]}).sections??[]);
    setSelectedSection(null);
    setSelectedImage(null);
  }, [language, page.key]);
  useEffect(() => { void load(); }, [load]);
  useEffect(()=>{void cmsSupabase?.from("cms_admins").select("role").eq("user_id",session.user.id).maybeSingle().then(({data})=>setRole((data?.role as CmsRole)??"viewer"))},[session.user.id]);
  useEffect(()=>{const doc=frameRef.current?.contentDocument;if(doc)applyManagedSections(doc,sections)},[sections]);
  const autosaveContent=useMemo(()=>({...content,sections}),[content,sections]);
  const autosaveState=useCmsAutosave({client:cmsSupabase,pageId:row?.id,content:autosaveContent,version:contentVersion,locale:language,enabled:Boolean(row)&&can(role,"edit")&&workflowStatus!=="in_review",onSaved:setContentVersion});

  const enableEditing = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    doc.querySelector("style[data-cms-editor]")?.remove();
    const style = doc.createElement("style");
    style.dataset.cmsEditor = "true";
    style.textContent = `.cms-editable{outline:1px dashed transparent;outline-offset:4px;cursor:text!important}.cms-editable:hover,.cms-editable:focus{outline:2px solid #2864ff!important;background:rgba(40,100,255,.09)!important}.cms-section-editable{position:relative;outline:1px dashed rgba(40,100,255,.35);outline-offset:-2px}.cms-section-selected{outline:3px solid #2864ff!important;outline-offset:-3px}img.cms-editable,video.cms-editable,[data-cms-image].cms-editable{cursor:pointer!important}.cms-image-selected{outline:3px solid #2864ff!important;outline-offset:3px}.cms-image-action{position:absolute!important;z-index:2147483647!important;border:0!important;border-radius:8px!important;background:#1e5eff!important;color:#fff!important;padding:9px 13px!important;font:600 13px/1.2 Inter,Arial,sans-serif!important;box-shadow:0 6px 18px rgba(23,32,51,.28)!important;cursor:pointer!important}`;
    doc.head.appendChild(style);
    const importExistingSeo = () => {
      const detected = seoFromDocument(doc);
      seoDefaultsRef.current[`${page.key}:${language}`] = detected;
      setContent(current => ({ ...current, seo: mergeSeo(current.seo, detected) }));
    };
    importExistingSeo();
    window.setTimeout(importExistingSeo, 500);
    applyLayoutContent(doc, content.layout);
    applyManagedSections(doc,sections);
    const values = content.visual ?? {};
    editableSections(doc).forEach(section => {
      const key = section.dataset.cmsSectionKey ?? visualElementKey(section);
      section.dataset.cmsSectionKey ||= key;
      section.classList.add("cms-section-editable");
      section.onclick = event => {
        event.stopPropagation();
        doc.querySelectorAll(".cms-section-selected").forEach(item => item.classList.remove("cms-section-selected"));
        section.classList.add("cms-section-selected");
        setSelectedSection(key);
        setNotice("已选中板块，可在右侧调整顺序或隐藏");
      };
    });
    editableTextElements(doc).forEach(element => {
      const key = visualElementKey(element);
      element.classList.add("cms-editable");
      element.contentEditable = "true";
      element.spellcheck = true;
      if (values[key]?.type === "text") element.textContent = values[key].value;
      element.onclick = event => { event.preventDefault(); event.stopPropagation(); const section = element.closest<HTMLElement>("[data-cms-section-key]"); if (section?.dataset.cmsSectionKey) setSelectedSection(section.dataset.cmsSectionKey); element.focus(); setNotice("正在原位编辑文字；所属板块已选中"); };
      element.onblur = () => setContent(current => ({ ...current, visual: { ...(current.visual ?? {}), [key]: { type: "text", value: element.textContent?.trim() ?? "" } } }));
    });
    const imageElements = editableImageElements(doc);
    const imageElementSet = new Set<HTMLElement>(imageElements);
    const selectImage = (element: HTMLElement) => {
      const key = visualElementKey(element);
      const target = isImageElement(element) ? "src" : isVideoElement(element) ? "poster" : "background";
      const section = element.closest<HTMLElement>("[data-cms-section-key]");
      if (section?.dataset.cmsSectionKey) setSelectedSection(section.dataset.cmsSectionKey);
      imageTarget.current = { element, key, target };
      doc.querySelectorAll(".cms-image-selected").forEach(item => item.classList.remove("cms-image-selected"));
      doc.querySelector(".cms-image-action")?.remove();
      element.classList.add("cms-image-selected");
      const action = doc.createElement("button");
      action.type = "button";
      action.className = "cms-image-action";
      action.textContent = "替换图片";
      const rect = element.getBoundingClientRect();
      action.style.top = `${Math.max(8, rect.top + (doc.defaultView?.scrollY ?? 0) + 8)}px`;
      action.style.left = `${Math.max(8, rect.right + (doc.defaultView?.scrollX ?? 0) - 104)}px`;
      action.onclick = buttonEvent => { buttonEvent.preventDefault(); buttonEvent.stopPropagation(); fileRef.current?.click(); };
      doc.body.appendChild(action);
      setSelectedImage({ key, value: imageSource(element), alt: isImageElement(element) ? element.alt : "", canEditAlt: isImageElement(element) });
      setNotice("已选中图片；可直接点击图片上的“替换图片”");
    };
    imageElements.forEach(element => {
      const key = visualElementKey(element);
      element.classList.add("cms-editable");
      if (values[key]?.type === "image") {
        if (isImageElement(element)) { element.src = values[key].value; element.alt = values[key].alt ?? element.alt; }
        else if (isVideoElement(element)) element.poster = values[key].value;
        else element.style.backgroundImage = `url("${values[key].value}")`;
      }
      element.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        selectImage(element);
      };
    });
    const previousImageCapture = imageCaptureHandlers.get(doc);
    if (previousImageCapture) doc.removeEventListener("click", previousImageCapture, true);
    const imageCapture: EventListener = rawEvent => {
      const event = rawEvent as MouseEvent;
      const clicked = event.target instanceof Element ? event.target : null;
      if (clicked?.closest(".cms-image-action,[contenteditable='true']")) return;
      const target = doc.elementsFromPoint(event.clientX, event.clientY)
        .find(candidate => candidate instanceof HTMLElement && imageElementSet.has(candidate));
      if (!(target instanceof HTMLElement)) return;
      event.preventDefault();
      event.stopPropagation();
      selectImage(target);
    };
    imageCaptureHandlers.set(doc, imageCapture);
    doc.addEventListener("click", imageCapture, true);
    setNotice("完整页面已进入编辑模式；悬停会显示蓝色编辑框");
  }, [content.layout, content.visual, language, page.key, sections]);

  const replaceImage = async (file: File) => {
    if (!cmsSupabase || !imageTarget.current) return;
    if (file.size > 10 * 1024 * 1024) return setNotice("图片不能超过 10MB");
    setBusy(true);
    const path = `${page.key}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error } = await cmsSupabase.storage.from("website-assets").upload(path, file);
    if (error) { setBusy(false); return setNotice(error.message); }
    const { data } = cmsSupabase.storage.from("website-assets").getPublicUrl(path);
    const target = imageTarget.current;
    if (isImageElement(target.element)) target.element.src = data.publicUrl;
    else if (isVideoElement(target.element)) target.element.poster = data.publicUrl;
    else target.element.style.backgroundImage = `url("${data.publicUrl}")`;
    const item: VisualItem = { type: "image", value: data.publicUrl, alt: isImageElement(target.element) ? target.element.alt : "", target: target.target };
    setContent(current => ({ ...current, visual: { ...(current.visual ?? {}), [target.key]: item } }));
    setSelectedImage(current => current ? { ...current, value: data.publicUrl } : current);
    await cmsSupabase.from("cms_assets").insert({ storage_path: path, public_url: data.publicUrl, original_name: file.name, mime_type: file.type, byte_size: file.size, uploaded_by: session.user.id });
    setNotice("图片已替换，请保存草稿");
    setBusy(false);
  };

  const updateSection = (action: "up" | "down" | "hide" | "show") => {
    const doc = frameRef.current?.contentDocument;
    if (!doc || !selectedSection) return setNotice("请先点击页面中的一个板块");
    const sections = editableSections(doc);
    const selected = sections.find(section => section.dataset.cmsSectionKey === selectedSection);
    if (!selected) return setNotice("请重新选择板块");
    if (action === "up" && selected.previousElementSibling) selected.parentElement?.insertBefore(selected, selected.previousElementSibling);
    if (action === "down" && selected.nextElementSibling) selected.parentElement?.insertBefore(selected.nextElementSibling, selected);
    if (action === "hide") selected.hidden = true;
    if (action === "show") selected.hidden = false;
    const currentSections = editableSections(doc);
    const order = currentSections.map(section => section.dataset.cmsSectionKey ?? visualElementKey(section));
    const hidden = currentSections.filter(section => section.hidden).map(section => section.dataset.cmsSectionKey ?? visualElementKey(section));
    setContent(current => ({ ...current, layout: { order, hidden } }));
    setNotice(action === "hide" ? "板块已隐藏，发布前仍可恢复" : action === "show" ? "板块已恢复" : "板块顺序已调整");
  };

  const publishedForLanguage = () => language === "en" ? row?.published_content : row?.published_content?.translations?.[language];
  const persist = async (publish: boolean) => {
    if (!cmsSupabase) return;
    const seo = mergeSeo(content.seo, seoFromDocument(frameRef.current?.contentDocument));
    const nextContent = { ...content, seo, sections };
    if(publish)return setNotice("发布必须先提交审核，并由审核人批准后执行");
    setBusy(true);
    if(row){const{data,error}=await cmsSupabase.rpc("cms_save_draft",{p_page_id:row.id,p_content:nextContent,p_expected_version:contentVersion,p_action:"draft_saved",p_locale:language});if(error){setBusy(false);setNotice(error.message.includes("version_conflict")?"保存冲突：页面已被其他人更新，请刷新后合并差异":error.message);return}const saved=Array.isArray(data)?data[0]:data;setContentVersion(Number(saved?.content_version??contentVersion+1));setWorkflowStatus("draft");setNotice("草稿已保存，并生成版本记录");await load();setBusy(false);return}
    const draftContent = language === "en" ? nextContent : (row?.draft_content ?? {});
    const translations = { ...(row?.translations ?? {}) };
    if (language !== "en") translations[language] = nextContent;
    const publishedContent = { ...draftContent, translations };
    const payload = { page_key: page.key, page_type: page.type, route: page.route, title: page.title, source_locale: "en", draft_content: draftContent, translations, status:"draft",workflow_status:"draft",content_version:1, updated_by: session.user.id };
    const { data, error } = await cmsSupabase.rpc("cms_create_page",{p_page_key:payload.page_key,p_page_type:payload.page_type,p_route:payload.route,p_title:payload.title,p_content:draftContent});
    if (error) { setBusy(false); return setNotice(error.message); }
    setNotice("草稿已保存，并生成版本记录");
    await load();
    setBusy(false);
  };

  const submitReview=async()=>{if(!cmsSupabase||!row)return;setBusy(true);const{data,error}=await cmsSupabase.rpc("cms_submit_review",{p_page_id:row.id,p_expected_version:contentVersion});setBusy(false);if(error)return setNotice(error.message);const request=Array.isArray(data)?data[0]:data;setReviewId(request?.id??null);setWorkflowStatus("in_review");setNotice("已提交审核；审批绑定当前版本，后续编辑会自动使审批失效")};
  const review=async(decision:"approved"|"rejected")=>{if(!cmsSupabase||!reviewId)return;const comment=window.prompt(decision==="approved"?"审批意见（可留空）":"请填写退回原因")??"";if(decision==="rejected"&&!comment.trim())return setNotice("退回必须填写原因");setBusy(true);const{error}=await cmsSupabase.rpc("cms_review",{p_request_id:reviewId,p_decision:decision,p_comment:comment});setBusy(false);if(error)return setNotice(error.message);setWorkflowStatus(decision==="approved"?"approved":"changes_requested");setNotice(decision==="approved"?"审核已通过，可由审核人发布":"已退回修改")};
  const publishApproved=async()=>{if(!cmsSupabase||!row)return;if(!window.confirm("确认发布已审批的固定版本到官网内容库？"))return;setBusy(true);const{error}=await cmsSupabase.rpc("cms_publish_approved",{p_page_id:row.id});setBusy(false);if(error)return setNotice(error.message);setWorkflowStatus("published");setNotice("已发布审批版本；请继续执行线上页面验收")};

  const copyEnglishDraft = () => {
    if (language === "en") return;
    setContent({ ...(row?.draft_content ?? {}), translationStatus: "ai_draft" });
    setNotice("已复制英文内容作为翻译底稿；AI 自动翻译需配置模型接口后启用");
  };
  const setSeo = (key: keyof CmsSeo, value: string) => setContent(current => ({ ...current, seo: { ...EMPTY_SEO, ...(current.seo ?? {}), [key]: value } }));
  const setImageAlt = (value: string) => {
    const target = imageTarget.current;
    if (!target || !isImageElement(target.element)) return;
    target.element.alt = value;
    const currentValue = imageSource(target.element);
    setSelectedImage(current => current ? { ...current, alt: value } : current);
    setContent(current => ({ ...current, visual: { ...(current.visual ?? {}), [target.key]: { type: "image", value: currentValue, alt: value, target: target.target } } }));
  };
  const localizedRoute = language === "en" ? page.route : `/${language}${page.route === "/" ? "" : page.route}`;
  const canvasRoute = `${localizedRoute}?cms_canvas=1${page.key === "home" ? `&cms_stage=${homeStage}` : ""}`;

  if (workspace === "inquiries") return <InquiryDashboard onBack={() => setWorkspace("pages")} onNavigate={setWorkspace} onSignOut={() => void cmsSupabase?.auth.signOut()} />;
  if (workspace !== "pages") return <CmsModuleDashboard module={workspace} session={session} onNavigate={setWorkspace} onEditPage={next=>{setPage(next);setWorkspace("pages")}} onSignOut={() => void cmsSupabase?.auth.signOut()} />;
  const selectWorkspace = (next: CmsWorkspace) => setWorkspace(next);
  return <main className="cms-root cms-visual-shell"><CmsSidebar active="pages" onSelect={selectWorkspace}/>
    <header className="cms-visual-toolbar"><div className="cms-visual-brand"><strong>WONLY</strong><span>整页编辑 · {role}</span></div><select aria-label="页面" value={page.key} onChange={event => setPage(CMS_PAGES.find(item => item.key === event.target.value) ?? CMS_PAGES[0])}>{CMS_PAGES.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}</select><select aria-label="语言" value={language} onChange={event => setLanguage(event.target.value)}>{LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select>{page.key === "home" ? <div className="cms-device-toggle"><button className={homeStage === "intro" ? "active" : ""} onClick={() => setHomeStage("intro")}>开门前</button><button className={homeStage === "main" ? "active" : ""} onClick={() => setHomeStage("main")}>开门后</button></div> : null}<div className="cms-device-toggle"><button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}>电脑</button><button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}>手机</button></div><span className={`cms-save-state ${autosaveState}`}>{autosaveState==="saving"?"自动保存中…":autosaveState==="saved"?"已自动保存":autosaveState==="conflict"?"版本冲突":autosaveState==="failed"?"自动保存失败":`v${contentVersion} · ${workflowStatus}`}</span><div className="cms-visual-actions"><button className="cms-button secondary" onClick={() => setToolsOpen(value => !value)}>{toolsOpen ? "收起工具" : "展开工具"}</button><button className="cms-button secondary" disabled={busy||!can(role,"edit")} onClick={() => void persist(false)}>保存草稿</button><button className="cms-button" disabled={busy||!can(role,"submit")||workflowStatus==="in_review"} onClick={()=>void submitReview()}>提交审核</button>{can(role,"review")&&workflowStatus==="in_review"?<><button className="cms-button secondary" onClick={()=>void review("rejected")}>退回</button><button className="cms-button" onClick={()=>void review("approved")}>批准</button></>:null}{can(role,"publish")&&workflowStatus==="approved"?<button className="cms-button" onClick={()=>void publishApproved()}>发布已审批版</button>:null}<button className="cms-button secondary" onClick={() => cmsSupabase?.auth.signOut()}>退出</button></div></header>
    <div className="cms-visual-status">{notice}</div><section className={`cms-visual-workspace ${toolsOpen ? "panel-open" : ""}`}><div className={`cms-site-canvas ${device}`}><iframe key={canvasRoute} ref={frameRef} title={`${page.title}整页编辑`} src={canvasRoute} onLoad={enableEditing}/></div>{toolsOpen ? <aside className="cms-visual-panel"><h2>页面工具</h2><p>当前：{page.title}</p><p>语言：{LANGUAGES.find(([code]) => code === language)?.[1]}</p><div className="cms-tool-card workflow"><strong>发布流程</strong><p>状态：{workflowStatus} · 内容版本 v{contentVersion}</p><p>编辑后自动保存；提交审核后冻结当前快照；只有批准的同一版本可以发布。</p></div><BlockEditor sections={sections} onChange={setSections}/><div className="cms-tool-card"><strong>图片编辑</strong><p>{selectedImage ? "已选中图片，可从电脑替换" : "点击页面中的图片、背景图或视频封面"}</p>{selectedImage ? <><label>当前图片<input value={selectedImage.value} readOnly /></label>{selectedImage.canEditAlt ? <label>图片描述（Alt）<input value={selectedImage.alt} onChange={event => setImageAlt(event.target.value)} /></label> : null}</> : null}<button className="cms-button secondary" disabled={!selectedImage || busy} onClick={() => fileRef.current?.click()}>从电脑选择图片</button></div><div className="cms-tool-card"><strong>板块布局</strong><p>{selectedSection ? "已选中一个板块" : "先点击页面中的板块"}</p><div className="cms-tool-actions"><button onClick={() => updateSection("up")}>上移</button><button onClick={() => updateSection("down")}>下移</button><button onClick={() => updateSection("hide")}>隐藏</button><button onClick={() => updateSection("show")}>恢复</button></div></div><div className="cms-tool-card"><strong>SEO 设置</strong><label>页面标题<input value={content.seo?.title ?? ""} onChange={event => setSeo("title", event.target.value)}/></label><label>页面描述<textarea value={content.seo?.description ?? ""} onChange={event => setSeo("description", event.target.value)}/></label><label>规范链接<input value={content.seo?.canonical ?? ""} onChange={event => setSeo("canonical", event.target.value)}/></label><label>分享图片<input value={content.seo?.ogImage ?? ""} onChange={event => setSeo("ogImage", event.target.value)}/></label><label>搜索引擎规则<select value={content.seo?.robots ?? "index, follow"} onChange={event => setSeo("robots", event.target.value)}><option>index, follow</option><option>noindex, nofollow</option></select></label></div>{language !== "en" ? <div className="cms-tool-card"><strong>多语言确认</strong><p>当前状态：{content.translationStatus === "confirmed" ? "已人工确认" : content.translationStatus === "ai_draft" ? "翻译底稿" : "待翻译"}</p><button className="cms-button secondary" onClick={copyEnglishDraft}>复制英文作翻译底稿</button><button className="cms-button secondary" onClick={() => setContent(current => ({ ...current, translationStatus: "confirmed" }))}>标记人工确认</button><p>AI 自动翻译将在配置模型接口后启用。</p></div> : null}<div className="cms-tool-card warning"><strong>发布规则</strong><p>编辑人与审核人分离；审批绑定当前版本，任何后续修改都会使旧审批失效。</p></div></aside> : null}</section>
    <input ref={fileRef} hidden type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={event => { const file = event.target.files?.[0]; if (file) void replaceImage(file); event.currentTarget.value = ""; }}/>
  </main>;
}
