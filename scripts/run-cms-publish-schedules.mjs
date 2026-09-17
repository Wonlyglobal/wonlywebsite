const url=process.env.CMS_SUPABASE_URL?.replace(/\/$/,"");
const key=process.env.CMS_SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key)throw new Error("CMS_SUPABASE_URL and CMS_SUPABASE_SERVICE_ROLE_KEY are required");
const response=await fetch(`${url}/rest/v1/rpc/cms_run_due_publications`,{method:"POST",headers:{apikey:key,authorization:`Bearer ${key}`,"content-type":"application/json"},body:JSON.stringify({p_limit:25})});
const body=await response.text();
if(!response.ok)throw new Error(`Scheduled publishing failed (${response.status}): ${body}`);
const rows=body?JSON.parse(body):[];
console.log(JSON.stringify({checkedAt:new Date().toISOString(),processed:rows.length,rows}));
