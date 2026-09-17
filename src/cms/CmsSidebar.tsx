export type CmsWorkspace="pages"|"inquiries"|"media"|"posts"|"products"|"templates"|"calendar"|"seo"|"languages"|"navigation"|"redirects"|"versions"|"settings"|"account";
const groups=[
  {title:"内容",items:[["pages","页面编辑"],["templates","页面模板"],["inquiries","询盘管理"],["media","媒体库"],["products","产品管理"]]},
  {title:"文章管理",items:[["posts","文章列表"],["calendar","发布日历"]]},
  {title:"网站优化",items:[["seo","SEO 设置"],["languages","多语言"],["navigation","导航菜单"],["redirects","重定向"]]},
  {title:"系统",items:[["versions","版本与发布"],["settings","站点设置"],["account","管理员账号"]]},
] as const;
export default function CmsSidebar({active,onSelect}:{active:CmsWorkspace;onSelect:(value:CmsWorkspace)=>void}){
  return <aside className="cms-admin-sidebar"><div className="cms-admin-logo"><strong>WONLY</strong><span>网站管理后台</span></div>{groups.map(group=><nav key={group.title}><h3>{group.title}</h3>{group.items.map(([key,label])=><button key={key} className={active===key?"active":""} onClick={()=>onSelect(key)}><span>{label}</span></button>)}</nav>)}</aside>
}
