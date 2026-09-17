export type VisualItem = { type: "text" | "image"; value: string; alt?: string; target?: "src" | "background" | "poster" };
export type CmsSeo = { title?: string; description?: string; canonical?: string; ogImage?: string; robots?: string };
export type CmsLayout = { order?: string[]; hidden?: string[] };
export type TranslationStatus = "pending" | "ai_draft" | "confirmed";
export type ManagedBlock = { id:string;type:"text"|"image"|"button"|"video"|"product"|"faq"|"form"|"spacer";hidden?:boolean;content:Record<string,unknown> };
export type ManagedSection = { id:string;label:string;hidden?:boolean;blocks:ManagedBlock[] };
export type VisualContent = {
  visual?: Record<string, VisualItem>;
  seo?: CmsSeo;
  layout?: CmsLayout;
  translationStatus?: TranslationStatus;
  sections?: ManagedSection[];
};

export function visualElementKey(element: Element) {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current.tagName !== "BODY") {
    const parent: Element | null = current.parentElement;
    const siblings = parent ? Array.from(parent.children).filter(child => child.tagName === current!.tagName) : [];
    const explicit = current.getAttribute("data-cms-key") || current.id;
    parts.unshift(explicit ? `${current.tagName.toLowerCase()}#${explicit}` : `${current.tagName.toLowerCase()}:${siblings.indexOf(current) + 1}`);
    current = parent;
  }
  return parts.join(">");
}

export function applyManagedSections(root:Document,sections?:ManagedSection[]){
  const existing=root.querySelector<HTMLElement>("[data-cms-managed-sections]");
  if(!sections?.length){existing?.remove();return}
  const signature=JSON.stringify(sections);
  if(existing?.dataset.signature===signature)return;
  const container=existing??root.createElement("div");
  container.dataset.cmsManagedSections="true";container.dataset.signature=signature;container.className="cms-managed-sections";container.replaceChildren();
  if(!root.querySelector("style[data-cms-managed-style]")){const style=root.createElement("style");style.dataset.cmsManagedStyle="true";style.textContent=".cms-managed-sections{max-width:1280px;margin:0 auto;padding:56px 5%;font-family:inherit}.cms-managed-section{padding:32px 0;border-top:1px solid #ddd}.cms-managed-section h2{margin:0 0 22px}.cms-managed-block{margin:14px 0;line-height:1.7}.cms-managed-block img,.cms-managed-block video{display:block;max-width:100%;height:auto}.cms-managed-button{display:inline-block;padding:11px 18px;border:1px solid currentColor;color:inherit;text-decoration:none}";root.head.appendChild(style)}
  sections.filter(section=>!section.hidden).forEach(section=>{const sectionEl=root.createElement("section");sectionEl.className="cms-managed-section";sectionEl.dataset.cmsBlockSection=section.id;const title=root.createElement("h2");title.textContent=section.label;sectionEl.appendChild(title);section.blocks.filter(block=>!block.hidden).forEach(block=>{const wrap=root.createElement("div");wrap.className="cms-managed-block";wrap.dataset.cmsBlock=block.id;if(block.type==="text"){const p=root.createElement("p");p.textContent=String(block.content.text??"");wrap.appendChild(p)}else if(block.type==="image"){const img=root.createElement("img");img.src=String(block.content.src??"");img.alt=String(block.content.alt??"");wrap.appendChild(img)}else if(block.type==="button"){const a=root.createElement("a");a.className="cms-managed-button";a.href=String(block.content.url??"#");a.textContent=String(block.content.label??"了解更多");wrap.appendChild(a)}else if(block.type==="video"){const video=root.createElement("video");video.controls=true;video.src=String(block.content.src??"");wrap.appendChild(video)}else if(block.type==="spacer"){wrap.style.height=`${Number(block.content.height??40)}px`}else{wrap.textContent=String(block.content.text??block.content.title??block.type)}sectionEl.appendChild(wrap)});container.appendChild(sectionEl)});
  if(!existing)(root.querySelector("main")??root.body).appendChild(container);
}

export function editableTextElements(root: ParentNode = document) {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,p,li,button,label,figcaption,a,span")).filter(element =>
    !element.closest(".cms-section-drag,.cms-image-replace") && Array.from(element.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
  );
  return candidates.filter(element => !candidates.some(parent => parent !== element && parent.contains(element)));
}

export function editableImageElements(root: Document) {
  const direct = Array.from(root.querySelectorAll<HTMLElement>("img,video[poster],[data-cms-image]"));
  const backgrounds = Array.from(root.querySelectorAll<HTMLElement>("body *")).filter(element => {
    const background = root.defaultView?.getComputedStyle(element).backgroundImage ?? "none";
    return background !== "none" && background.includes("url(");
  });
  return Array.from(new Set([...direct, ...backgrounds]));
}

export function editableSections(root: Document) {
  const container = root.querySelector("main") ?? root.body;
  const semantic = Array.from(container.querySelectorAll<HTMLElement>("section,article")).filter(element =>
    !element.parentElement?.closest("section,article"),
  );
  if (semantic.length > 1) return semantic;
  const appRoot = root.querySelector<HTMLElement>("#root");
  const visualContainer = appRoot && Array.from(appRoot.querySelectorAll<HTMLElement>(":scope > div"))
    .filter(element => element.children.length >= 3)
    .sort((a, b) => b.children.length - a.children.length)[0];
  if (visualContainer) return Array.from(visualContainer.children).filter((element): element is HTMLElement => element instanceof HTMLElement && !element.matches("script,style"));
  return Array.from(container.children).filter((element): element is HTMLElement => element instanceof HTMLElement);
}

export function applyLayoutContent(root: Document, layout?: CmsLayout) {
  const sections = editableSections(root);
  sections.forEach(section => { section.dataset.cmsSectionKey ||= visualElementKey(section); });
  const byKey = new Map(sections.map(section => [section.dataset.cmsSectionKey!, section]));
  const hidden = new Set(layout?.hidden ?? []);
  sections.forEach(section => { section.hidden = hidden.has(section.dataset.cmsSectionKey!); });
  const desired = (layout?.order ?? []).map(key => byKey.get(key)).filter((section): section is HTMLElement => Boolean(section));
  const current = sections.filter(section => desired.includes(section));
  if (desired.length && desired.some((section, index) => current[index] !== section)) desired.forEach(section => section.parentElement?.appendChild(section));
}

export function applySeoContent(seo?: CmsSeo) {
  if (!seo) return;
  if (seo.title) document.title = seo.title;
  const setMeta = (selector: string, attribute: "name" | "property", key: string, value?: string) => {
    if (!value) return;
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
    element.content = value;
  };
  setMeta('meta[name="description"]', "name", "description", seo.description);
  setMeta('meta[name="robots"]', "name", "robots", seo.robots);
  setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
  setMeta('meta[property="og:description"]', "property", "og:description", seo.description);
  setMeta('meta[property="og:image"]', "property", "og:image", seo.ogImage);
  if (seo.canonical) {
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = seo.canonical;
  }
}

export function applyVisualContent(root: Document, values: Record<string, VisualItem>) {
  editableTextElements(root).forEach(element => {
    const item = values[visualElementKey(element)];
    if (item?.type === "text" && element.textContent !== item.value) element.textContent = item.value;
  });
  editableImageElements(root).forEach(element => {
    const item = values[visualElementKey(element)];
    if (item?.type !== "image") return;
    if (element.tagName === "IMG") {
      const image = element as HTMLImageElement;
      image.closest("picture")?.querySelectorAll("source").forEach(source => { source.srcset = ""; });
      image.srcset = "";
      image.removeAttribute("data-src");
      image.removeAttribute("data-srcset");
      if (image.src !== item.value) image.src = item.value;
      if (item.alt !== undefined) image.alt = item.alt;
    }
    else if (element.tagName === "VIDEO") (element as HTMLVideoElement).poster = item.value;
    else element.style.backgroundImage = `url("${item.value.replace(/"/g, "%22")}")`;
  });
}
