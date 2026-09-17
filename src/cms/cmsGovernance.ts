export type CmsRole="super_admin"|"editor"|"seo"|"translator"|"sales"|"reviewer"|"viewer";
export type WorkflowStatus="draft"|"in_review"|"approved"|"published"|"changes_requested";
export type BlockType="text"|"image"|"button"|"video"|"product"|"faq"|"form"|"spacer";
export type CmsBlock={id:string;type:BlockType;hidden?:boolean;content:Record<string,unknown>};
export type CmsSection={id:string;label:string;hidden?:boolean;blocks:CmsBlock[]};
export type DiffEntry={path:string;before:unknown;after:unknown;kind:"added"|"removed"|"changed"};

export const can=(role:CmsRole,capability:"edit"|"editSeo"|"submit"|"review"|"publish")=>{
  if(role==="super_admin")return true;
  if(capability==="edit")return role==="editor";
  if(capability==="editSeo")return role==="editor"||role==="seo";
  if(capability==="submit")return ["editor","seo","translator"].includes(role);
  if(capability==="review"||capability==="publish")return role==="reviewer";
  return false;
};

export const createId=()=>globalThis.crypto?.randomUUID?.()??`cms-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const createBlock=(type:BlockType):CmsBlock=>({id:createId(),type,content:type==="text"?{text:"新文字区块"}:type==="button"?{label:"了解更多",url:"/contact"}:type==="image"?{src:"",alt:""}:{}});
export const createSection=():CmsSection=>({id:createId(),label:"新板块",blocks:[createBlock("text")]});

export function diffJson(before:unknown,after:unknown,path="页面"):DiffEntry[]{
  if(JSON.stringify(before)===JSON.stringify(after))return [];
  if(before&&after&&typeof before==="object"&&typeof after==="object"&&!Array.isArray(before)&&!Array.isArray(after)){
    const left=before as Record<string,unknown>,right=after as Record<string,unknown>;
    return [...new Set([...Object.keys(left),...Object.keys(right)])].flatMap(key=>diffJson(left[key],right[key],`${path}.${key}`));
  }
  return [{path,before,after,kind:before===undefined?"added":after===undefined?"removed":"changed"}];
}
