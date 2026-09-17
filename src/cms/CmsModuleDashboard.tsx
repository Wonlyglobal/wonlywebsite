import {useCallback,useEffect,useMemo,useState} from "react";
import type {Session} from "@supabase/supabase-js";
import CmsSidebar,{type CmsWorkspace} from "./CmsSidebar";
import {CMS_PAGES,type CmsPageDefinition} from "./pageDefinitions";
import {cmsSupabase} from "./supabase";
import ArticleManager from "./ArticleManager";
import VersionDiff from "./VersionDiff";
import PublishCalendar from "./PublishCalendar";
import PageTemplateLibrary from "./PageTemplateLibrary";
import BulkSeoManager from "./BulkSeoManager";
import RedirectManager from "./RedirectManager";
import TranslationWorkflow from "./TranslationWorkflow";
import MediaManager from "./MediaManager";
import SearchManager from "./SearchManager";
import FormBuilder from "./FormBuilder";
import ProductManager from "./ProductManager";
import NavigationManager from "./NavigationManager";
import ReleaseManager from "./ReleaseManager";
import QualityDashboard from "./QualityDashboard";
import RoleAdmin from "./RoleAdmin";
import AuditCenter from "./AuditCenter";
import AnalyticsDashboard from "./AnalyticsDashboard";
import RecommendationManager from "./RecommendationManager";
import IntegrationHealth from "./IntegrationHealth";
import BackupManager from "./BackupManager";
import{can,type CmsRole}from"./cmsGovernance";

type PageRow={id:string;page_key:string;title:string;page_type:string;route:string;status:string;draft_content:Record<string,unknown>;translations:Record<string,unknown>;content_version:number;updated_at:string;published_at:string|null};
type Asset={id:string;public_url:string;original_name:string;mime_type:string;byte_size:number;created_at:string};
type Revision={id:string;action:string;revision_no:number;created_at:string;snapshot:Record<string,unknown>;page_id:string;cms_pages:{title?:string;page_key?:string}|null};
type Audit={id:string;action:string;resource_type:string;resource_id:string|null;created_at:string;metadata:Record<string,unknown>};
type SettingValue=Record<string,unknown>|unknown[];
const titles:Record<CmsWorkspace,string>={pages:"页面编辑",inquiries:"询盘管理",forms:"表单构建器",media:"媒体库",posts:"文章管理",products:"产品管理",templates:"页面模板",calendar:"发布日历",seo:"SEO 设置",analytics:"数据看板",recommendations:"个性化推荐",quality:"页面质量",search:"全站搜索",languages:"多语言",navigation:"导航菜单",redirects:"重定向",environments:"发布环境",integrations:"插件与接口",backups:"备份恢复",versions:"版本与发布",settings:"站点设置",roles:"权限角色",audit:"审计日志",account:"我的账号"};
const defaults:Record<string,SettingValue>={navigation:{items:[{label:"Products",url:"/products/entrance-door"},{label:"About",url:"/about"},{label:"Insights",url:"/insights"},{label:"Contact",url:"/contact"}]},redirects:{items:[]},settings:{siteName:"WONLY Global",contactEmail:"inquiry@wonlyglobal.com",whatsapp:"+1 (205) 240-1832",defaultLanguage:"en",timezone:"Asia/Shanghai"}};
const size=(bytes:number)=>bytes>1048576?`${(bytes/1048576).toFixed(1)} MB`:`${Math.ceil(bytes/1024)} KB`;
export default function CmsModuleDashboard({module,session,onNavigate,onEditPage,onSignOut}:{module:CmsWorkspace;session:Session;onNavigate:(value:CmsWorkspace)=>void;onEditPage:(page:CmsPageDefinition)=>void;onSignOut:()=>void}){
 const[pages,setPages]=useState<PageRow[]>([]),[assets,setAssets]=useState<Asset[]>([]),[revisions,setRevisions]=useState<Revision[]>([]),[audits,setAudits]=useState<Audit[]>([]),[role,setRole]=useState<CmsRole>("viewer"),[selectedRevision,setSelectedRevision]=useState<Revision|null>(null),[setting,setSetting]=useState<SettingValue>(defaults[module]??{}),[notice,setNotice]=useState(""),[busy,setBusy]=useState(false);
 const load=useCallback(async()=>{if(!cmsSupabase)return;setNotice("");const[{data:p,error:pe},{data:a,error:ae},{data:r,error:re},{data:logs},{data:admin}]=await Promise.all([cmsSupabase.from("cms_pages").select("id,page_key,title,page_type,route,status,draft_content,translations,content_version,updated_at,published_at").order("updated_at",{ascending:false}),cmsSupabase.from("cms_assets").select("id,public_url,original_name,mime_type,byte_size,created_at").order("created_at",{ascending:false}).limit(200),cmsSupabase.from("cms_revisions").select("id,page_id,action,revision_no,snapshot,created_at,cms_pages(title,page_key)").order("created_at",{ascending:false}).limit(100),cmsSupabase.from("cms_audit_logs").select("id,action,resource_type,resource_id,metadata,created_at").order("created_at",{ascending:false}).limit(50),cmsSupabase.from("cms_admins").select("role").eq("user_id",session.user.id).maybeSingle()]);setPages((p??[]) as PageRow[]);setAssets((a??[]) as Asset[]);setRevisions((r??[]) as unknown as Revision[]);setAudits((logs??[]) as Audit[]);setRole((admin?.role as CmsRole)??"viewer");const{data:s,error:se}=await cmsSupabase.from("cms_site_settings").select("value").eq("key",module).maybeSingle();if(s?.value)setSetting(s.value as SettingValue);else setSetting(defaults[module]??{});const error=pe||ae||re||(se&&se.code!=="PGRST116"?se:null);if(error)setNotice(error.message)},[module,session.user.id]);
 useEffect(()=>{void load()},[load]);
 const save=async()=>{if(!cmsSupabase)return;setBusy(true);const{error}=await cmsSupabase.from("cms_site_settings").upsert({key:module,value:setting,updated_by:session.user.id,updated_at:new Date().toISOString()},{onConflict:"key"});setBusy(false);setNotice(error?error.message:"配置已保存")};
 const restoreRevision=async(revision:Revision)=>{if(!cmsSupabase)return;const page=pages.find(item=>item.id===revision.page_id);if(!page){setNotice("页面当前版本不可用，请刷新后重试");return}if(!confirm(`将版本 #${revision.revision_no} 恢复为 ${page.title} 的新草稿？现有正式页面不会直接改变。`))return;setBusy(true);const{error}=await cmsSupabase.rpc("cms_restore_revision",{p_revision_id:revision.id,p_expected_version:page.content_version});setBusy(false);setNotice(error?error.message:"历史版本已恢复为新草稿；原版本和正式页面均保留");if(!error){setSelectedRevision(null);await load()}};
 const pageMap=useMemo(()=>new Map(CMS_PAGES.map(p=>[p.key,p])),[]); const edit=(key:string)=>{const page=pageMap.get(key);if(page)onEditPage(page)};
 const renderPages=(kind:"posts"|"products")=>{const list=kind==="posts"?CMS_PAGES.filter(p=>p.type==="content"):CMS_PAGES.filter(p=>p.type==="product"||p.type==="landing");return <div className="cms-module-grid">{list.map(page=>{const row=pages.find(p=>p.page_key===page.key);return <article className="cms-card cms-module-card" key={page.key}><div><span className={`cms-state ${row?.status==="published"?"published":"draft"}`}>{row?.status==="published"?"已发布":"待编辑"}</span><h3>{page.title}</h3><p>{page.route}</p></div><button className="cms-button secondary" onClick={()=>edit(page.key)}>整页编辑</button></article>})}</div>};
 const render=()=>{
  if(module==="media")return <MediaManager role={role} session={session}/>;
  if(module==="forms")return <FormBuilder role={role}/>;
  if(module==="posts")return <ArticleManager session={session}/>;
  if(module==="calendar")return <PublishCalendar role={role}/>;
  if(module==="templates")return <PageTemplateLibrary role={role}/>;
  if(module==="products")return <ProductManager role={role}/>;
  if(module==="seo")return <BulkSeoManager role={role}/>;
  if(module==="analytics")return <AnalyticsDashboard role={role}/>;
  if(module==="recommendations")return <RecommendationManager role={role}/>;
  if(module==="integrations")return <IntegrationHealth role={role}/>;
  if(module==="backups")return <BackupManager role={role}/>;
  if(module==="quality")return <QualityDashboard/>;
  if(module==="search")return <SearchManager/>;
  if(module==="languages")return <TranslationWorkflow role={role}/>;
  if(module==="versions")return <div className="cms-version-layout"><div className="cms-table-wrap"><table className="cms-table"><thead><tr><th>页面</th><th>操作</th><th>版本</th><th>时间</th><th/></tr></thead><tbody>{revisions.map(row=><tr key={row.id}><td>{row.cms_pages?.title||row.cms_pages?.page_key||"页面"}</td><td>{row.action}</td><td>#{row.revision_no}</td><td>{new Date(row.created_at).toLocaleString("zh-CN")}</td><td><button onClick={()=>setSelectedRevision(row)}>查看差异</button></td></tr>)}</tbody></table></div>{selectedRevision?<div className="cms-card cms-version-panel"><h2>{selectedRevision.cms_pages?.title} · #{selectedRevision.revision_no}</h2><VersionDiff before={revisions.find(item=>item.page_id===selectedRevision.page_id&&item.revision_no===selectedRevision.revision_no-1)?.snapshot??{}} after={selectedRevision.snapshot}/><p className="cms-muted">恢复会创建版本号更高的新草稿，使旧审批和待发布排期失效；不会直接改动线上内容。</p><button className="cms-button" disabled={busy||!can(role,"edit")} onClick={()=>void restoreRevision(selectedRevision)}>{busy?"恢复中…":"恢复为新草稿"}</button>{!can(role,"edit")?<p className="cms-error">只有内容编辑或超级管理员可以恢复版本。</p>:null}</div>:<div className="cms-card cms-version-panel"><p>选择一个版本查看字段级差异。</p></div>}</div>;
  if(module==="navigation")return <NavigationManager role={role}/>;
  if(module==="redirects")return <RedirectManager role={role}/>;
  if(module==="environments")return <ReleaseManager role={role}/>;
  if(module==="settings")return <SettingsEditor value={setting} setValue={setSetting}/>;
  if(module==="roles")return <RoleAdmin session={session} role={role}/>;
  if(module==="audit")return <AuditCenter role={role}/>;
  if(module==="account")return <div className="cms-account-layout"><div className="cms-card cms-account-card"><h2>账号与权限</h2><dl><dt>登录邮箱</dt><dd>{session.user.email}</dd><dt>角色</dt><dd><strong>{role}</strong></dd><dt>账号 ID</dt><dd>{session.user.id}</dd><dt>最近登录</dt><dd>{session.user.last_sign_in_at?new Date(session.user.last_sign_in_at).toLocaleString("zh-CN"):"—"}</dd></dl><button className="cms-button secondary" onClick={()=>void cmsSupabase?.auth.resetPasswordForEmail(session.user.email??"",{redirectTo:`${location.origin}/cms`}).then(({error})=>setNotice(error?error.message:"密码重置邮件已发送"))}>发送密码重置邮件</button></div><div className="cms-card cms-audit-card"><h2>最近审计记录</h2>{audits.length?audits.map(log=><div className="cms-audit-row" key={log.id}><strong>{log.action}</strong><span>{log.resource_type} {log.resource_id?.slice(0,8)}</span><time>{new Date(log.created_at).toLocaleString("zh-CN")}</time></div>):<p className="cms-muted">暂无审计记录；数据库迁移完成后保存、审核和发布会自动记录。</p>}</div></div>;
  return null;
 };
 const needsSave=["settings"].includes(module);
 return <main className="cms-root cms-module-shell"><CmsSidebar active={module} onSelect={onNavigate}/><header className="cms-module-header"><div><h1>{titles[module]}</h1><p>WONLY 网站统一内容与配置中心</p></div><div><button className="cms-button secondary" onClick={()=>void load()}>刷新</button>{needsSave?<button className="cms-button" disabled={busy} onClick={()=>void save()}>{busy?"保存中…":"保存配置"}</button>:null}<button className="cms-button secondary" onClick={onSignOut}>退出</button></div></header>{notice?<div className={notice.includes("已")?"cms-success":"cms-error"}>{notice}</div>:null}<section className="cms-module-content">{render()}</section></main>
}

function JsonListEditor({title,columns,value,setValue}:{title:string;columns:string[];value:SettingValue;setValue:(value:SettingValue)=>void}){const obj=(value&&typeof value==="object"&&!Array.isArray(value)?value:{}) as Record<string,unknown>;const rows=(Array.isArray(obj.items)?obj.items:[]) as Record<string,string>[];const change=(index:number,key:string,next:string)=>setValue({...obj,items:rows.map((row,i)=>i===index?{...row,[key]:next}:row)});return <div className="cms-card cms-config-card"><div className="cms-config-title"><h2>{title}</h2><button className="cms-button secondary" onClick={()=>setValue({...obj,items:[...rows,Object.fromEntries(columns.map(key=>[key,key==="status"?"301":""]))]})}>新增一项</button></div>{rows.map((row,index)=><div className="cms-config-row" key={index}>{columns.map(key=><label key={key}><span>{key}</span><input value={row[key]??""} onChange={e=>change(index,key,e.target.value)}/></label>)}<button onClick={()=>setValue({...obj,items:rows.filter((_,i)=>i!==index)})}>删除</button></div>)}{!rows.length?<p className="cms-muted">暂无配置，点击“新增一项”开始。</p>:null}</div>}
function SettingsEditor({value,setValue}:{value:SettingValue;setValue:(value:SettingValue)=>void}){const obj=(value&&typeof value==="object"&&!Array.isArray(value)?value:{}) as Record<string,string>;const fields=[["siteName","网站名称"],["contactEmail","联系邮箱"],["whatsapp","WhatsApp"],["defaultLanguage","默认语言"],["timezone","时区"]];return <div className="cms-card cms-config-card"><h2>全站基础设置</h2>{fields.map(([key,label])=><label className="cms-field" key={key}><span>{label}</span><input value={obj[key]??""} onChange={e=>setValue({...obj,[key]:e.target.value})}/></label>)}</div>}
