// Standalone Cloudflare Worker: faifa-admin. Paste this entire file into worker.js.
// D1 binding: CMS_DB. Secrets: CMS_PASSWORD and CMS_SESSION_SECRET.
// Existing faifa-voting Worker and database are never accessed.
const ORIGIN = "https://wu3x.github.io";
const headers = { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Headers": "Content-Type, Authorization", "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS", "Vary": "Origin", "Cache-Control": "no-store" };
const respond = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{...headers,"Content-Type":"application/json;charset=utf-8"}});
const enc = new TextEncoder();
const toHex = bytes => [...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,"0")).join("");
const equal = (a,b) => {if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0;};
async function sign(secret,message){const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return toHex(await crypto.subtle.sign("HMAC",key,enc.encode(message)));}
async function validSession(request,env){const token=(request.headers.get("Authorization")||"").replace(/^Bearer /,"");const [expires,nonce,signature]=token.split(".");if(!expires||!nonce||!signature||!/^\d+$/.test(expires)||Number(expires)<Date.now()||Number(expires)>Date.now()+86400000)return false;return equal(signature,await sign(env.CMS_SESSION_SECRET,expires+"."+nonce));}
async function ensureDb(db){
  await db.prepare("CREATE TABLE IF NOT EXISTS cms_versions (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, published INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)").run();
  await db.prepare("CREATE TABLE IF NOT EXISTS cms_state (name TEXT PRIMARY KEY, version_id INTEGER NOT NULL)").run();
}
const initial={settings:{siteTitle:"فيفاء",heroTitle:"اكتشف فيفاء",heroDescription:"",heroImage:"",accentColor:"#237c58"},sections:[],places:[]};
function validate(content){
 if(!content||typeof content!=="object"||!Array.isArray(content.sections)||!Array.isArray(content.places)||!content.settings||typeof content.settings!=="object")throw Error("صيغة المحتوى غير صحيحة");
 if(content.sections.length>100||content.places.length>2000||JSON.stringify(content).length>600000)throw Error("حجم المحتوى أكبر من المسموح");
 const sections=new Set();for(const s of content.sections){if(typeof s.id!=="string"||!s.id||sections.has(s.id)||typeof s.title!=="string"||!s.title.trim()||s.title.length>150||typeof s.visible!=="boolean")throw Error("بيانات قسم غير صحيحة أو مكررة");sections.add(s.id);}
 const places=new Set();for(const p of content.places){if(typeof p.id!=="string"||!p.id||places.has(p.id)||!sections.has(p.categoryId)||typeof p.title!=="string"||!p.title.trim()||p.title.length>200||typeof p.visible!=="boolean")throw Error("مكان مكرر أو غير مرتبط بقسم صالح");places.add(p.id);for(const key of ["mapLink","imageUrl"]){if(p[key]&&(!/^https:\/\//i.test(p[key])||p[key].length>2048))throw Error("الروابط يجب أن تبدأ بـ HTTPS");}}
 for(const [k,v] of Object.entries(content.settings)){if(typeof v!=="string"||v.length>5000||k.length>100)throw Error("إعداد غير صالح");}
 return content;
}
async function latest(db,name){const row=await db.prepare("SELECT v.content,v.id FROM cms_state s JOIN cms_versions v ON v.id=s.version_id WHERE s.name=?").bind(name).first();return row?{content:JSON.parse(row.content),version:row.id}:null;}
async function handleCms(request,env){
 const url=new URL(request.url);
 if(!url.pathname.startsWith("/cms"))return respond({service:"faifa-admin",status:"ready"});
 if(request.headers.get("Origin")&&request.headers.get("Origin")!==ORIGIN)return respond({error:"Origin not allowed"},403);
 if(request.method==="OPTIONS")return new Response(null,{status:204,headers});
 if(!env.CMS_DB)return respond({error:"Database binding missing"},503);
 if(url.pathname!=="/cms/public"&&(!env.CMS_PASSWORD||!env.CMS_SESSION_SECRET))return respond({error:"CMS is not configured"},503);
 try{
  await ensureDb(env.CMS_DB);
  if(url.pathname==="/cms/public"&&request.method==="GET"){const state=await latest(env.CMS_DB,"published");return respond(state||{content:initial,version:null});}
  if(url.pathname==="/cms/login"&&request.method==="POST"){
   const body=await request.json();
   if(typeof body.password!=="string"||body.password.length>256)return respond({error:"Invalid password"},401);
   const provided=await sign(env.CMS_SESSION_SECRET,body.password);
   const expected=await sign(env.CMS_SESSION_SECRET,env.CMS_PASSWORD);
   if(!equal(provided,expected))return respond({error:"كلمة المرور غير صحيحة"},401);
   const expires=String(Date.now()+3600000),nonce=crypto.randomUUID().replaceAll("-","");
   return respond({token:expires+"."+nonce+"."+await sign(env.CMS_SESSION_SECRET,expires+"."+nonce)});
  }
  if(!await validSession(request,env))return respond({error:"انتهت جلسة الإدارة أو الدخول غير مصرح"},401);
  if(url.pathname==="/cms/history"&&request.method==="GET"){
   const result=await env.CMS_DB.prepare("SELECT id,published,created_at FROM cms_versions ORDER BY id DESC LIMIT 30").all();
   return respond({versions:result.results||[]});
  }
  if(url.pathname==="/cms/restore"&&request.method==="POST"){
   const {version}=await request.json();
   if(!Number.isSafeInteger(version)||version<1)return respond({error:"Invalid version"},400);
   const row=await env.CMS_DB.prepare("SELECT content FROM cms_versions WHERE id=?").bind(version).first();
   if(!row)return respond({error:"Version not found"},404);
   const content=validate(JSON.parse(row.content));
   const result=await env.CMS_DB.prepare("INSERT INTO cms_versions (content,published) VALUES (?,1)").bind(JSON.stringify(content)).run();
   const id=result.meta.last_row_id;
   await env.CMS_DB.batch([
    env.CMS_DB.prepare("INSERT INTO cms_state (name,version_id) VALUES ('draft',?) ON CONFLICT(name) DO UPDATE SET version_id=excluded.version_id").bind(id),
    env.CMS_DB.prepare("INSERT INTO cms_state (name,version_id) VALUES ('published',?) ON CONFLICT(name) DO UPDATE SET version_id=excluded.version_id").bind(id)
   ]);
   return respond({ok:true,version:id});
  }
  if(url.pathname==="/cms/admin"&&request.method==="GET"){const draft=await latest(env.CMS_DB,"draft"),published=await latest(env.CMS_DB,"published");return respond(draft||published||{content:initial,version:null});}
  if((url.pathname==="/cms/draft"||url.pathname==="/cms/publish")&&request.method==="PUT"){
   const payload=await request.json();const content=validate(payload.content);const json=JSON.stringify(content);
   const result=await env.CMS_DB.prepare("INSERT INTO cms_versions (content,published) VALUES (?,?)").bind(json,url.pathname==="/cms/publish"?1:0).run();
   const id=result.meta.last_row_id;
   const statements=[env.CMS_DB.prepare("INSERT INTO cms_state (name,version_id) VALUES ('draft',?) ON CONFLICT(name) DO UPDATE SET version_id=excluded.version_id").bind(id)];
   if(url.pathname==="/cms/publish")statements.push(env.CMS_DB.prepare("INSERT INTO cms_state (name,version_id) VALUES ('published',?) ON CONFLICT(name) DO UPDATE SET version_id=excluded.version_id").bind(id));
   await env.CMS_DB.batch(statements);
   return respond({ok:true,version:id});
  }
  return respond({error:"Route not found"},404);
 }catch(e){return respond({error:e instanceof SyntaxError?"JSON غير صالح":e.message||"Server error"},400);}
}

export default {async fetch(request,env){return handleCms(request,env);}};
