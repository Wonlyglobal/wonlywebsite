import fs from"node:fs";import path from"node:path";
const root=path.resolve("supabase/migrations"),output=process.argv[2],mode=process.argv.includes("--apply")?"apply":"preflight",cutoff="20260917130000";
if(!output)throw new Error("usage: node scripts/build-cms-phase2-migration-bundle.mjs OUTPUT [--apply]");
const files=fs.readdirSync(root).filter(name=>name.endsWith(".sql")&&name.slice(0,14)>=cutoff).sort();if(!files.length)throw new Error("no phase2 migrations found");
const header=["-- Generated from committed migrations. Do not edit this bundle.",`-- Mode: ${mode}; migrations: ${files.length}`,"begin;","set local lock_timeout='5s';","set local statement_timeout='120s';"].join("\n");
const body=files.map(name=>`\n-- BEGIN ${name}\n${fs.readFileSync(path.join(root,name),"utf8").trim()}\n-- END ${name}`).join("\n");
const footer=mode==="apply"?"\ncommit;\n":"\nrollback;\n";fs.writeFileSync(path.resolve(output),`${header}\n${body}${footer}`,{mode:0o600});
console.log(JSON.stringify({output:path.resolve(output),mode,migrations:files}));
