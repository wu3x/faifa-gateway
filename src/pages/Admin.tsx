import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, LayoutGrid, LogOut, Palette, Plus, Save, Settings, Trash2 } from "lucide-react";
import { VOTES_API } from "@/lib/votes";

type Place = { id: string; categoryId: string; title: string; description: string; englishDescription: string; mapLink: string; imageUrl: string; visible: boolean; sortOrder: number };
type Section = { id: string; title: string; englishTitle: string; visible: boolean; sortOrder: number };
type SiteContent = { settings: Record<string, string>; sections: Section[]; places: Place[] };
const empty: SiteContent = { settings: { siteTitle: "فيفاء", heroTitle: "اكتشف فيفاء", heroDescription: "", heroImage: "", accentColor: "#237c58" }, sections: [], places: [] };
const API = VOTES_API.replace(/\/$/, "") + "/cms";
const field = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-500";
const labels: Record<string,string> = {siteTitle:"اسم الموقع",heroTitle:"عنوان الواجهة",heroDescription:"شرح الواجهة",heroImage:"رابط صورة الخلفية",accentColor:"اللون الأساسي"};

export default function Admin() {
  const [token,setToken] = useState(() => sessionStorage.getItem("faifa-admin-token") || "");
  const [password,setPassword] = useState("");
  const [tab,setTab] = useState<"content"|"sections"|"design"|"settings">("content");
  const [data,setData] = useState<SiteContent>(empty);
  const [selected,setSelected] = useState(-1);
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState("");
  const [loaded,setLoaded] = useState(false);
  const [dirty,setDirty] = useState(false);

  async function request(path: string, options: RequestInit = {}, credential = token) {
    const response = await fetch(API + path, { ...options, headers: { "Content-Type": "application/json", Authorization: "Bearer " + credential, ...(options.headers || {}) } });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(json.error || json.message || "تعذر الاتصال بخدمة الإدارة (" + response.status + ")");
    return json;
  }
  async function load(credential = token) {
    setBusy(true); setMessage("");
    try {
      const json = await request("/admin", {}, credential);
      setData(json.content || empty); setLoaded(true); setDirty(false);
    } catch (error) { setMessage(error instanceof Error ? error.message : "تعذر تحميل البيانات"); }
    finally { setBusy(false); }
  }
  useEffect(() => { if (token) void load(token); }, []);
  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      const json = await request("/login", { method:"POST", body: JSON.stringify({password}) }, "");
      if (!json.token) throw new Error("الخادم لم يرجع جلسة دخول");
      sessionStorage.setItem("faifa-admin-token", json.token);
      setToken(json.token); setPassword(""); await load(json.token);
    } catch(error) { setMessage(error instanceof Error ? error.message : "فشل تسجيل الدخول"); }
    finally { setBusy(false); }
  }
  function logout() { sessionStorage.removeItem("faifa-admin-token"); setToken(""); setLoaded(false); setData(empty); }
  function update(next: SiteContent) { setData(next); setDirty(true); }
  function setting(key: string,value: string) { update({...data,settings:{...data.settings,[key]:value}}); }
  function changePlace(index: number, patch: Partial<Place>) { update({...data,places:data.places.map((p,i)=>i===index?{...p,...patch}:p)}); }
  function changeSection(index: number, patch: Partial<Section>) { update({...data,sections:data.sections.map((p,i)=>i===index?{...p,...patch}:p)}); }
  async function save(publish: boolean) {
    setBusy(true); setMessage("");
    try {
      await request(publish?"/publish":"/draft", {method:"PUT",body:JSON.stringify({content:data})});
      setDirty(false); setMessage(publish?"تم اعتماد التعديلات ونشرها":"تم حفظ المسودة");
    } catch(error) { setMessage(error instanceof Error ? error.message : "فشل الحفظ؛ لم يتم تأكيد أي تغيير"); }
    finally { setBusy(false); }
  }
  return <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><div className="text-xs font-bold tracking-widest text-emerald-700">FAIFA CONTROL CENTER</div><h1 className="mt-1 text-3xl font-extrabold">لوحة إدارة فيفاء</h1><p className="mt-2 text-sm text-slate-500">إدارة محتوى الموقع، الأقسام، الأماكن، والهوية البصرية</p></div>
        <a href="/faifa-gateway/" className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm"><ArrowRight size={16}/> العودة للموقع</a>
      </header>
      {!token ? <form onSubmit={login} className="mx-auto max-w-md rounded-2xl border bg-white p-7 shadow-sm">
        <h2 className="mb-2 text-xl font-bold">دخول المدير</h2><p className="mb-5 text-sm text-slate-500">تتحقق الخدمة من كلمة المرور على الخادم، ولا تُحفظ داخل ملفات الموقع.</p>
        <label className="mb-2 block text-sm font-medium">كلمة المرور</label><input type="password" autoComplete="current-password" required className={field} value={password} onChange={e=>setPassword(e.target.value)}/>
        <button disabled={busy} className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-3 font-bold text-white disabled:opacity-50">دخول آمن</button>
        {message&&<p role="alert" className="mt-4 text-sm text-red-700">{message}</p>}
      </form> : !loaded ? <div className="rounded-2xl border bg-white p-6"><p>{busy?"جارٍ تحميل بيانات الإدارة...":message || "تعذر تحميل لوحة الإدارة"}</p><div className="mt-4 flex gap-2"><button className="rounded-lg border px-4 py-2" onClick={()=>load()}>إعادة المحاولة</button><button className="rounded-lg border px-4 py-2" onClick={logout}>خروج</button></div></div> : <>
        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[["الأماكن",data.places.length],["الأقسام",data.sections.length],["الأماكن الظاهرة",data.places.filter(p=>p.visible).length]].map(([label,value])=><div key={label} className="rounded-2xl border bg-white p-5"><div className="text-3xl font-bold">{value}</div><div className="mt-1 text-sm text-slate-500">{label}</div></div>)}
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {([{id:"content",name:"الأماكن",icon:LayoutGrid},{id:"sections",name:"الأقسام",icon:Plus},{id:"design",name:"التصميم",icon:Palette},{id:"settings",name:"الإعدادات",icon:Settings}] as const).map(item=><button key={item.id} onClick={()=>setTab(item.id)} className={"flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold "+(tab===item.id?"bg-emerald-700 text-white":"border bg-white")}><item.icon size={16}/>{item.name}</button>)}
          <button onClick={logout} className="mr-auto flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm"><LogOut size={16}/> خروج</button>
        </div>
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          {tab==="content"&&<><div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-lg font-bold">إدارة الأماكن</h2><button onClick={()=>{const id=crypto.randomUUID();update({...data,places:[...data.places,{id,categoryId:data.sections[0]?.id||"",title:"مكان جديد",description:"",englishDescription:"",mapLink:"",imageUrl:"",visible:false,sortOrder:data.places.length}]});setSelected(data.places.length)}} className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm text-white"><Plus size={16}/> مكان جديد</button></div>
            <div className="grid gap-4 md:grid-cols-[240px_1fr]"><div className="max-h-[540px] space-y-2 overflow-auto">{data.places.map((p,i)=><button key={p.id} onClick={()=>setSelected(i)} className={"w-full rounded-xl border p-3 text-right text-sm "+(selected===i?"border-emerald-600 bg-emerald-50":"bg-white")}><span className="block font-semibold">{p.title}</span><span className="text-xs text-slate-500">{data.sections.find(s=>s.id===p.categoryId)?.title||"غير مصنف"} · {p.visible?"ظاهر":"مخفي"}</span></button>)}</div>
              {selected>=0&&data.places[selected] ? <div className="grid gap-3">
                {([["title","اسم المكان"],["description","الوصف العربي"],["englishDescription","الوصف الإنجليزي"],["mapLink","رابط الخريطة"],["imageUrl","رابط الصورة"]] as const).map(([key,label])=><label key={key} className="block text-sm font-medium">{label}<input className={"mt-1 "+field} value={data.places[selected][key]} onChange={e=>changePlace(selected,{[key]:e.target.value})}/></label>)}
                <label className="text-sm font-medium">القسم<select className={"mt-1 "+field} value={data.places[selected].categoryId} onChange={e=>changePlace(selected,{categoryId:e.target.value})}>{data.sections.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select></label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.places[selected].visible} onChange={e=>changePlace(selected,{visible:e.target.checked})}/> إظهار المكان للزوار</label>
                <button className="flex w-fit items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700" onClick={()=>{if(window.confirm("حذف المكان من مسودة المحتوى؟")){update({...data,places:data.places.filter((_,i)=>i!==selected)});setSelected(-1)}}}><Trash2 size={16}/> حذف المكان</button>
              </div> : <p className="py-12 text-center text-sm text-slate-500">اختر مكانًا لتعديل بياناته</p>}</div></>}
          {tab==="sections"&&<><div className="mb-4 flex justify-between"><h2 className="text-lg font-bold">الأقسام والقوائم</h2><button className="flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-2 text-sm text-white" onClick={()=>update({...data,sections:[...data.sections,{id:crypto.randomUUID(),title:"قسم جديد",englishTitle:"New section",visible:false,sortOrder:data.sections.length}]})}><Plus size={16}/> إضافة قسم</button></div><div className="space-y-3">{data.sections.map((s,i)=><div key={s.id} className="grid gap-2 rounded-xl border p-3 md:grid-cols-[1fr_1fr_auto_auto]"><input aria-label="اسم القسم" className={field} value={s.title} onChange={e=>changeSection(i,{title:e.target.value})}/><input aria-label="اسم القسم بالإنجليزية" className={field} value={s.englishTitle} onChange={e=>changeSection(i,{englishTitle:e.target.value})}/><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.visible} onChange={e=>changeSection(i,{visible:e.target.checked})}/> ظاهر</label><button aria-label="حذف القسم" onClick={()=>{if(data.places.some(p=>p.categoryId===s.id)){setMessage("انقل الأماكن إلى قسم آخر قبل حذف هذا القسم");return}update({...data,sections:data.sections.filter((_,j)=>j!==i)})}} className="text-red-700"><Trash2 size={18}/></button></div>)}</div></>}
          {tab==="design"&&<><h2 className="mb-4 text-lg font-bold">الهوية البصرية والواجهة</h2><div className="grid gap-4 md:grid-cols-2">{Object.entries(labels).map(([key,label])=><label key={key} className="block text-sm font-medium">{label}<input className={"mt-1 "+field} type={key==="accentColor"?"color":"text"} value={data.settings[key]||""} onChange={e=>setting(key,e.target.value)}/></label>)}</div>{data.settings.heroImage&&<img src={data.settings.heroImage} alt="معاينة الخلفية" className="mt-5 h-44 w-full rounded-xl object-cover"/>}</>}
          {tab==="settings"&&<><h2 className="mb-3 text-lg font-bold">إعدادات الموقع</h2><p className="mb-4 text-sm text-slate-500">إعدادات إضافية قابلة للتوسع، بدون تعديل كود الواجهة لاحقًا.</p>{[["contactUrl","رابط التواصل"],["instagramUrl","إنستغرام"],["footerText","نص التذييل"],["announcement","شريط الإعلان"]].map(([key,label])=><label key={key} className="mb-3 block text-sm font-medium">{label}<input className={"mt-1 "+field} value={data.settings[key]||""} onChange={e=>setting(key,e.target.value)}/></label>)}</>}
        </section>
        <div className="sticky bottom-3 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white/95 p-4 shadow-lg backdrop-blur"><div className="text-sm">{dirty?"لديك تغييرات غير محفوظة":"لا توجد تغييرات غير محفوظة"}{message&&<p role="status" className="mt-1 text-xs text-slate-600">{message}</p>}</div><div className="flex gap-2"><button disabled={busy||!dirty} onClick={()=>save(false)} className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm disabled:opacity-50"><Save size={16}/> حفظ المسودة</button><button disabled={busy||!dirty} onClick={()=>save(true)} className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm text-white disabled:opacity-50"><Check size={16}/> اعتماد ونشر</button></div></div>
      </>}
    </div>
  </div>;
}
