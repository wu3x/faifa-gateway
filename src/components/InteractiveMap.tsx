import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Navigation, Map, LocateFixed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Kind = "hotel" | "park" | "cafe";
type Place = { name: string; en: string; kind: Kind; lat: number; lng: number; search: string };
const places: Place[] = [
  ["فندق جارة الغيم","Jarat Al Gheim Hotel","hotel",17.2565,43.1145],
  ["فندق فيفاء الفاخر","Faifa Luxury Hotel","hotel",17.2580,43.1130],
  ["فندق إيوان","Iwan Hotel","hotel",17.2555,43.1160],
  ["بيت سهلان","Beit Sahlan","hotel",17.2548,43.1175],
  ["منتزه وإطلالة الخطم","Al-Khatm Park","park",17.2610,43.1085],
  ["سوق النفيعة الشعبي","Al-Nafiah Market","park",17.2590,43.1120],
  ["منتجع الباخرة","Al-Bakhira Resort","park",17.2520,43.1200],
  ["ممشى البن الخولاني","Khawlani Coffee Trail","park",17.2575,43.1095],
  ["مطل الدفرة","Al-Dafrah Viewpoint","park",17.2630,43.1050],
  ["مطل قرضة","Qarza Viewpoint","park",17.2540,43.1210],
  ["المصلى المعلق","Hanging Mosque","park",17.2560,43.1140],
  ["مطل العبسية","Al-Absiyah Viewpoint","park",17.2650,43.1030],
  ["مقهى جارة القمر","Jarat Al-Qamar Cafe","cafe",17.2572,43.1152],
  ["مقهى جارة الغيم","Jarat Al-Ghaim Cafe","cafe",17.2567,43.1148],
  ["مقهى ومطل إيوان","Iwan Cafe","cafe",17.2558,43.1158],
  ["مقهى سكون","Sukoon Cafe","cafe",17.2583,43.1135],
  ["كافيه تالقة","Taliqa Cafe","cafe",17.2545,43.1168],
  ["لب القهوة","Lub Al-Qahwa","cafe",17.2552,43.1172]
].map(([name,en,kind,lat,lng]) => ({name: String(name),en: String(en),kind: kind as Kind,lat: Number(lat),lng: Number(lng),search: String(name) + " فيفاء"}));
const missing = {
  hotel: ["أكواخ الندى","شاليه فيفا – Viva Cottage","سكني","الوادي الأخضر للغرف والشقق","الدثنة للشقق المفروشة","السحاب فيو","فيفاء للوحدات السكنية"],
  park: ["إطلالة فيفا"],
  cafe: ["غيمة – Cloud","مقهى البرنسيسة","مقهى روز بسنت النسائي","ديوانية واسع الخاطر","أُلفة"]
};
const colors: Record<Kind,string> = {hotel:"#2563eb",park:"#16a34a",cafe:"#d97706"};
const labels: Record<Kind,[string,string]> = {hotel:["الفنادق","Hotels"],park:["المنتزهات والمعالم","Parks"],cafe:["الكافيهات","Cafes"]};
const MAPLIBRE = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";
const MAPLIBRE_CSS = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css";
declare global { interface Window { maplibregl?: any } }
function loadMapLibre(): Promise<any> {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  if (!document.querySelector('link[data-faifa-map]')) {
    const link = document.createElement("link"); link.rel="stylesheet";link.href=MAPLIBRE_CSS;link.dataset.faifaMap="yes";document.head.appendChild(link);
  }
  return new Promise((resolve,reject)=>{
    const old = document.querySelector<HTMLScriptElement>('script[data-faifa-map]');
    if (old) {old.addEventListener("load",()=>resolve(window.maplibregl),{once:true});old.addEventListener("error",reject,{once:true});return;}
    const script=document.createElement("script");script.src=MAPLIBRE;script.async=true;script.dataset.faifaMap="yes";
    script.onload=()=>window.maplibregl?resolve(window.maplibregl):reject(new Error("MapLibre unavailable"));
    script.onerror=()=>reject(new Error("MapLibre failed to load"));document.head.appendChild(script);
  });
}
export default function InteractiveMap() {
  const {lang,t}=useLanguage();
  const [filter,setFilter]=useState<Kind|"all">("all");
  const [selected,setSelected]=useState<Place|null>(null);
  const [error,setError]=useState(false);
  const [ready,setReady]=useState(false);
  const container=useRef<HTMLDivElement>(null);
  const map=useRef<any>(null);
  const markers=useRef<any[]>([]);
  const visible=useMemo(()=>filter==="all"?places:places.filter(p=>p.kind===filter),[filter]);
  useEffect(()=>{
    let cancelled=false;
    loadMapLibre().then(lib=>{
      if(cancelled||!container.current)return;
      const instance=new lib.Map({container:container.current,style:"https://tiles.openfreemap.org/styles/liberty",center:[43.113,17.258],zoom:12.5,minZoom:9,maxZoom:18,attributionControl:true});
      map.current=instance;
      instance.addControl(new lib.NavigationControl({showCompass:false}),"top-left");
      instance.on("load",()=>{if(!cancelled)setReady(true);});
      instance.on("error",(event:any)=>{if(event?.error?.message?.includes("style")&&!cancelled)setError(true);});
    }).catch(()=>{if(!cancelled)setError(true);});
    return ()=>{cancelled=true;markers.current.forEach(m=>m.remove());markers.current=[];map.current?.remove();map.current=null;};
  },[]);
  useEffect(()=>{
    if(!ready||!map.current||!window.maplibregl)return;
    markers.current.forEach(m=>m.remove());markers.current=[];
    visible.forEach(place=>{
      const el=document.createElement("button");el.type="button";el.title=place.name;
      el.setAttribute("aria-label",place.name);
      el.style.cssText=`width:32px;height:32px;border-radius:50%;border:3px solid white;background:${colors[place.kind]};color:white;box-shadow:0 2px 9px #0006;cursor:pointer;display:grid;place-items:center;font-size:17px`;
      el.textContent=place.kind==="hotel"?"⌂":place.kind==="cafe"?"☕":"●";
      el.addEventListener("click",()=>{setSelected(place);map.current?.flyTo({center:[place.lng,place.lat],zoom:Math.max(map.current.getZoom(),14),essential:true});});
      const marker=new window.maplibregl.Marker({element:el}).setLngLat([place.lng,place.lat]).addTo(map.current);
      markers.current.push(marker);
    });
  },[ready,visible]);
  const locate=()=>{
    if(!navigator.geolocation)return;
    navigator.geolocation.getCurrentPosition(({coords})=>map.current?.flyTo({center:[coords.longitude,coords.latitude],zoom:15,essential:true}),()=>alert(t("تعذر تحديد موقعك، تأكد من السماح للموقع.","Could not access your location.")),{enableHighAccuracy:true,timeout:12000});
  };
  return <section id="interactive-map" className="scroll-mt-24 py-10 md:py-14">
    <div className="mb-6 text-center"><h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-primary md:text-4xl"><Map className="h-7 w-7"/>{t("خريطة فيفاء التفاعلية","Interactive Faifa Map")}</h2>
    <p className="mt-3 text-sm text-muted-foreground">{t("استكشف الطرق والمعالم والمقاهي والإقامة على الخريطة","Explore roads, landmarks, cafes and stays")}</p></div>
    <div className="mb-4 flex flex-wrap justify-center gap-2">
      {(["all","hotel","park","cafe"] as const).map(k=><button key={k} onClick={()=>{setFilter(k);setSelected(null);}} aria-pressed={filter===k} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter===k?"bg-primary text-primary-foreground border-primary":"bg-card hover:bg-muted"}`}>{k==="all"?t("الكل","All"):labels[k][lang==="ar"?0:1]}</button>)}
    </div>
    <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
      <div ref={container} className="h-[360px] w-full sm:h-[440px] lg:h-[540px]" aria-label={t("خريطة فيفاء","Faifa map")}/>
      {!ready&&!error&&<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-muted text-sm">{t("جاري تحميل الخريطة...","Loading map...")}</div>}
      {error&&<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted p-6 text-center"><p>{t("تعذر تحميل الخريطة الآن. جرّب تحديث الصفحة.","Map could not load. Please refresh.")}</p><button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground" onClick={()=>window.location.reload()}>{t("إعادة المحاولة","Retry")}</button></div>}
      {ready&&<button onClick={locate} title={t("موقعي الحالي","My location")} className="absolute bottom-10 right-3 z-10 rounded-lg bg-white p-3 text-slate-800 shadow-md" aria-label={t("موقعي الحالي","My location")}><LocateFixed size={20}/></button>}
    </div>
    {selected&&<div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2"><MapPin size={22} style={{color:colors[selected.kind]}}/><div><strong className="block">{lang==="ar"?selected.name:selected.en}</strong><span className="text-xs text-muted-foreground">{t("الموقع على الخريطة تقريبي حتى التحقق من الإحداثيات","Approximate pin pending coordinate verification")}</span></div></div>
      <a className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.search)}`} target="_blank" rel="noopener noreferrer"><Navigation size={16}/>{t("فتح في خرائط Google","Open in Google Maps")}</a>
    </div>}
    <p className="mt-3 text-xs leading-6 text-muted-foreground">{t("تنبيه: علامات الأماكن الحالية تقريبية ولم تُتحقق إحداثياتها بعد؛ لا تعتمد عليها للوصول. استخدم زر خرائط Google للتأكد. الأماكن التي لا نملك إحداثيات لها لم نضع لها علامات عشوائية.","Note: Existing pins are approximate and not verified. Do not use them for navigation. Unlocated places are not pinned.")}</p>
    <details className="mt-4 rounded-xl border bg-card p-4"><summary className="cursor-pointer font-semibold">{t("أماكن نحتاج إحداثياتها الدقيقة (13)","Places awaiting verified coordinates (13)")}</summary>
      <div className="mt-3 space-y-3">{(["hotel","park","cafe"] as Kind[]).map(k=><div key={k}><h4 className="mb-1 font-semibold">{labels[k][lang==="ar"?0:1]}</h4><div className="flex flex-wrap gap-2">{missing[k].map(name=><span key={name} className="rounded-md bg-muted px-2 py-1 text-xs">{name}</span>)}</div></div>)}</div>
    </details>
  </section>;
}
