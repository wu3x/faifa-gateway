import VisitorCounter from "./VisitorCounter";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const CompactControlBar = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center gap-2 md:gap-6 py-1.5 px-3 md:px-4 rounded-full bg-muted/40 border border-border/40 backdrop-blur-sm">
        <VisitorCounter compact />
        <div className="w-px h-8 bg-border/50 hidden sm:block" />
        <ThemeToggle compact />
      </div>
      <p className="mt-4 text-center text-sm font-medium tracking-wide text-muted-foreground md:text-base">{t("كل ما زاد عدد النجوم، ترتفع البطاقة للأعلى", "More stars move a place higher in the list")}</p>
    </div>
  );
};

export default CompactControlBar;
