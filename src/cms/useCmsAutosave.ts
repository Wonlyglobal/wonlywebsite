import{useEffect,useRef,useState}from"react";
import type{SupabaseClient}from"@supabase/supabase-js";

export type SaveState="idle"|"dirty"|"saving"|"saved"|"failed"|"conflict";
export function useCmsAutosave({client,pageId,content,version,locale="en",enabled,onSaved}:{client:SupabaseClient|null;pageId?:string;content:unknown;version:number;locale?:string;enabled:boolean;onSaved:(version:number)=>void}){
 const[state,setState]=useState<SaveState>("idle"),lastSaved=useRef(""),documentKey=useRef(""),timer=useRef<number>();
 useEffect(()=>{if(!enabled||!client||!pageId)return;const serialized=JSON.stringify(content),key=`${pageId}:${locale}`;if(documentKey.current!==key){documentKey.current=key;lastSaved.current=serialized;setState("idle");return}if(!lastSaved.current){lastSaved.current=serialized;return}if(serialized===lastSaved.current)return;setState("dirty");window.clearTimeout(timer.current);timer.current=window.setTimeout(async()=>{setState("saving");const{data,error}=await client.rpc("cms_save_draft",{p_page_id:pageId,p_content:content,p_expected_version:version,p_action:"autosaved",p_locale:locale});if(error){setState(error.message.includes("version_conflict")?"conflict":"failed");return}const row=Array.isArray(data)?data[0]:data;lastSaved.current=serialized;setState("saved");onSaved(Number(row?.content_version??version+1))},3000);return()=>window.clearTimeout(timer.current)},[client,content,enabled,locale,onSaved,pageId,version]);
 return state;
}
