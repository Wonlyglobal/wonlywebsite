import { applyLayoutContent, applyVisualContent, editableImageElements, editableSections, editableTextElements, visualElementKey, type CmsLayout, type VisualContent, type VisualItem } from "@/cms/visualContent";

const CMS_ORIGINS = new Set(["https://cms.wonlyglobal.com", "http://localhost:5173", "http://localhost:4173"]);
const enabled = new URLSearchParams(window.location.search).get("cms_canvas") === "1" && window.parent !== window;

const send = (type: string, payload: Record<string, unknown> = {}) => {
  if (!enabled) return;
  window.parent.postMessage({ source: "wonly-site-canvas", type, ...payload }, "https://cms.wonlyglobal.com");
};

const imageSource = (element: HTMLElement) => {
  if (element instanceof HTMLImageElement) return element.currentSrc || element.src;
  if (element instanceof HTMLVideoElement) return element.poster;
  return getComputedStyle(element).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] ?? "";
};

const imageTarget = (element: HTMLElement): "src" | "poster" | "background" => element instanceof HTMLImageElement ? "src" : element instanceof HTMLVideoElement ? "poster" : "background";

function seo() {
  const meta = (selector: string) => document.head.querySelector<HTMLMetaElement>(selector)?.content?.trim() ?? "";
  return { title: document.title.trim(), description: meta('meta[name="description"]'), canonical: document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "", ogImage: meta('meta[property="og:image"]'), robots: meta('meta[name="robots"]') || "index, follow" };
}

function activate(content: VisualContent = {}) {
  document.querySelector("style[data-cms-bridge]")?.remove();
  const style = document.createElement("style");
  style.dataset.cmsBridge = "true";
  style.textContent = `.cms-editable{outline:1px dashed transparent;outline-offset:4px;cursor:text!important}.cms-editable:hover,.cms-editable:focus{outline:2px solid #2864ff!important;background:rgba(40,100,255,.09)!important}.cms-section-editable{outline:1px dashed rgba(40,100,255,.35);outline-offset:-2px}.cms-section-selected,.cms-image-selected{outline:3px solid #2864ff!important;outline-offset:3px}`;
  document.head.appendChild(style);
  applyVisualContent(document, content.visual ?? {});
  applyLayoutContent(document, content.layout);
  editableSections(document).forEach(section => {
    const key = section.dataset.cmsSectionKey ||= visualElementKey(section);
    section.classList.add("cms-section-editable");
    section.onclick = event => { event.stopPropagation(); document.querySelectorAll(".cms-section-selected").forEach(item => item.classList.remove("cms-section-selected")); section.classList.add("cms-section-selected"); send("SECTION_SELECTED", { key }); };
  });
  editableTextElements(document).forEach(element => {
    const key = visualElementKey(element);
    element.classList.add("cms-editable"); element.contentEditable = "true"; element.spellcheck = true;
    element.onclick = event => { event.preventDefault(); event.stopPropagation(); element.focus(); };
    element.onblur = () => send("ITEM_CHANGED", { key, item: { type: "text", value: element.textContent?.trim() ?? "" } satisfies VisualItem });
  });
  editableImageElements(document).forEach(element => {
    const key = visualElementKey(element); element.classList.add("cms-editable");
    element.onclick = event => { event.preventDefault(); event.stopPropagation(); document.querySelectorAll(".cms-image-selected").forEach(item => item.classList.remove("cms-image-selected")); element.classList.add("cms-image-selected"); send("IMAGE_SELECTED", { key, value: imageSource(element), alt: element instanceof HTMLImageElement ? element.alt : "", target: imageTarget(element) }); };
  });
  send("READY", { seo: seo() });
}

function updateSection(key: string, action: "up" | "down" | "hide" | "show") {
  const sections = editableSections(document); const selected = sections.find(section => section.dataset.cmsSectionKey === key); if (!selected) return;
  if (action === "up" && selected.previousElementSibling) selected.parentElement?.insertBefore(selected, selected.previousElementSibling);
  if (action === "down" && selected.nextElementSibling) selected.parentElement?.insertBefore(selected.nextElementSibling, selected);
  if (action === "hide") selected.hidden = true; if (action === "show") selected.hidden = false;
  const current = editableSections(document); const layout: CmsLayout = { order: current.map(section => section.dataset.cmsSectionKey ||= visualElementKey(section)), hidden: current.filter(section => section.hidden).map(section => section.dataset.cmsSectionKey!) };
  send("LAYOUT_CHANGED", { layout });
}

export function initCmsCanvasBridge() {
  if (!enabled) return;
  window.addEventListener("message", event => {
    if (!CMS_ORIGINS.has(event.origin) || event.data?.source !== "wonly-cms") return;
    if (event.data.type === "INIT") activate(event.data.content);
    if (event.data.type === "APPLY_ITEM") applyVisualContent(document, { [event.data.key]: event.data.item });
    if (event.data.type === "SECTION_ACTION") updateSection(event.data.key, event.data.action);
  });
  window.addEventListener("load", () => send("BOOTED"), { once: true });
  send("BOOTED");
}
