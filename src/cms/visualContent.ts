export type VisualItem = { type: "text" | "image"; value: string; alt?: string; target?: "src" | "background" | "poster" };
export type VisualContent = { visual?: Record<string, VisualItem> };

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

export function editableTextElements(root: ParentNode = document) {
  return Array.from(root.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,p,li,button,label,figcaption,a,span")).filter(element =>
    Array.from(element.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
  );
}

export function editableImageElements(root: Document) {
  const direct = Array.from(root.querySelectorAll<HTMLElement>("img,video,[data-cms-image]"));
  const backgrounds = Array.from(root.querySelectorAll<HTMLElement>("body *")).filter(element => {
    const background = root.defaultView?.getComputedStyle(element).backgroundImage ?? "none";
    return background !== "none" && background.includes("url(");
  });
  return Array.from(new Set([...direct, ...backgrounds]));
}

export function applyVisualContent(root: Document, values: Record<string, VisualItem>) {
  editableTextElements(root).forEach(element => {
    const item = values[visualElementKey(element)];
    if (item?.type === "text" && element.textContent !== item.value) element.textContent = item.value;
  });
  editableImageElements(root).forEach(element => {
    const item = values[visualElementKey(element)];
    if (item?.type !== "image") return;
    if (element instanceof HTMLImageElement) { if (element.src !== item.value) element.src = item.value; if (item.alt !== undefined) element.alt = item.alt; }
    else if (element instanceof HTMLVideoElement) element.poster = item.value;
    else element.style.backgroundImage = `url("${item.value.replace(/"/g, "%22")}")`;
  });
}
