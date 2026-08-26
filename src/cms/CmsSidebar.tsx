type Workspace = "pages" | "inquiries";
const groups = [
  { title: "内容", items: [["pages", "页面编辑"], ["inquiries", "询盘管理"], ["media", "媒体库"], ["products", "产品"]] },
  { title: "文章管理", items: [["posts", "文章列表"]] },
  { title: "网站优化", items: [["seo", "SEO 设置"], ["languages", "多语言"], ["navigation", "导航菜单"], ["redirects", "重定向"]] },
  { title: "系统", items: [["versions", "版本与发布"], ["settings", "站点设置"], ["account", "管理员账号"]] },
] as const;
export default function CmsSidebar({active,onSelect}:{active:Workspace;onSelect:(value:Workspace|"tools")=>void}){
  const select=(key:string)=>{if(key==="pages"||key==="inquiries")onSelect(key);else if(["media","seo","languages","versions"].includes(key))onSelect("tools")};
  return <aside className="cms-admin-sidebar"><div className="cms-admin-logo"><strong>WONLY</strong><span>网站管理后台</span></div>{groups.map(group=><nav key={group.title}><h3>{group.title}</h3>{group.items.map(([key,label])=>{const available=["pages","inquiries","media","seo","languages","versions"].includes(key);return <button key={key} className={active===key?"active":""} disabled={!available} onClick={()=>select(key)}><span>{label}</span>{available?null:<small>待配置</small>}</button>})}</nav>)}</aside>
}
