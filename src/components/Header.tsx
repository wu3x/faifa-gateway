import heroImage from "@/assets/faifa-hero-new.jpg";
import WeatherWidget from "./WeatherWidget";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowDownLeft, Mountain } from "lucide-react";

const Header = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="faifa-hero relative isolate min-h-[72svh] md:min-h-screen overflow-hidden text-white">
      <img src={heroImage} alt={t("مدرجات وجبال فيفاء الخضراء", "The green terraces and mountains of Faifa")} className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071b19]/95 via-[#071b19]/45 to-[#071b19]/35" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#071b19]/30" />
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-7xl flex-col px-6 md:min-h-screen md:px-10">
        <div className="flex items-center justify-between gap-2 pt-4 md:gap-3 md:pt-10">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl"><Mountain size={22} /></span>
            <div className="leading-tight"><span className="block text-base font-bold md:text-lg">{t("فيفاء", "FAIFA")}</span><span className="text-[10px] tracking-[.18em] text-white/70">DISCOVER FAIFA</span></div>
          </div>
          <div className="flex items-center gap-2 md:gap-3"><WeatherWidget /><LanguageToggle /></div>
        </div>
        <div className="flex flex-1 flex-col justify-center py-7 md:py-24">
          <h1 className="max-w-5xl text-[clamp(3.4rem,11vw,9rem)] font-black leading-[1.08] tracking-tight drop-shadow-xl">
            {t("فيفاء", "FAIFA")}
            <span className="mt-2 block text-[clamp(1.45rem,3.8vw,3.3rem)] font-medium leading-[1.4] text-[#e4e9c7]">{t("حكاية جبلٍ فوق الغيم", "A mountain above the clouds")}</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-xl md:leading-10">{t("هنا تتعانق المدرجات الخضراء مع الضباب، وتتحول كل إطلالة إلى ذكرى. خذ وقتك، واستكشف فيفاء على مهل.", "Where green terraces meet the mist and every viewpoint becomes a memory. Take your time and discover Faifa.")}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 md:mt-9 md:gap-3">
            <button onClick={() => scrollTo("hotels")} className="group inline-flex items-center gap-2 rounded-full bg-[#e8edcf] px-5 py-3 text-xs md:gap-3 md:px-7 md:py-4 md:text-sm font-bold text-[#183b32] shadow-xl transition hover:-translate-y-1 hover:bg-white">
              {t("ابدأ الرحلة", "Start exploring")} <ArrowDownLeft className="transition group-hover:translate-y-1" size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/20 py-3 text-[11px] md:py-7 md:text-xs text-white/75">
          <span>{t("جازان، المملكة العربية السعودية", "Jazan, Saudi Arabia")}</span>
          <button onClick={() => scrollTo("discover")} className="flex items-center gap-2 transition hover:text-white">{t("مرّر لتكتشف", "Scroll to discover")} <ArrowDownLeft size={17} /></button>
        </div>
      </div>
    </header>
  );
};
export default Header;
