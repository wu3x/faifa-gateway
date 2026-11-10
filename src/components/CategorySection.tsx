import { ArrowUpLeft } from "lucide-react";
interface CategorySectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
const categoryDetails: Record<string, { ar: string; en: string; number: string }> = {
  hotels: { ar: "أماكن للإقامة بين السحاب، من الفنادق إلى البيوت ذات الروح الجبلية.", en: "Stay among the clouds, from hotels to mountain homes.", number: "01" },
  parks: { ar: "مشاهد طبيعية ومسارات ومطلات تستحق أن تتوقف عندها.", en: "Landscapes, trails and viewpoints worth slowing down for.", number: "02" },
  cafes: { ar: "قهوة بمذاق مختلف، وإطلالات تجعل الجلسة جزءًا من الرحلة.", en: "Coffee with a view, where the moment is part of the journey.", number: "03" },
};
import { useLanguage } from "@/contexts/LanguageContext";
const CategorySection = ({ id, title, icon, children }: CategorySectionProps) => {
  const { lang, t } = useLanguage();
  const detail = categoryDetails[id];
  return (
    <section id={id} className="scroll-mt-28 py-10 md:py-16">
      <div className="mb-8 flex flex-col gap-5 border-b border-border/70 pb-7 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3 text-primary"><span className="text-xs font-bold tracking-[.2em]">{detail?.number}</span><span className="h-px w-10 bg-primary/40" /><span className="text-xs font-medium">{t("دليل فيفاء", "FAIFA GUIDE")}</span></div>
          <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:h-7 [&_svg]:w-7">{icon}</span><h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2></div>
          {detail && <p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground md:text-base">{lang === "ar" ? detail.ar : detail.en}</p>}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-primary"><span>{t("اختر مكانك المفضل", "Find your next stop")}</span><ArrowUpLeft size={17} /></div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
};
export default CategorySection;