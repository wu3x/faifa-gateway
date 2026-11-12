import { Hotel, Trees, Coffee } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [glowIndex, setGlowIndex] = useState(-1);
  const [showGuideText, setShowGuideText] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const startJourneyGuide = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setGlowIndex(-1);
      setShowGuideText(false);
      // Allow smooth scrolling to bring the category navigation into view.
      timers.current.push(setTimeout(() => {
        setShowGuideText(true);
        [0, 1, 2].forEach((index) => {
          timers.current.push(setTimeout(() => setGlowIndex(index), index * 650));
        });
        timers.current.push(setTimeout(() => {
          setGlowIndex(-1);
          setShowGuideText(false);
        }, 2150));
      }, 650));
    };
    window.addEventListener("faifa-start-journey", startJourneyGuide);
    return () => {
      window.removeEventListener("faifa-start-journey", startJourneyGuide);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const updateActive = () => {
      let active: string | null = null;
      for (const id of ["hotels", "parks", "cafes"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  };

  const navItems = [
    {
      id: "hotels",
      label: t("الفنادق", "Hotels"),
      icon: Hotel,
      ariaLabel: t("الانتقال إلى قسم الفنادق", "Go to Hotels section")
    },
    {
      id: "parks", 
      label: t("المنتزهات", "Parks"),
      icon: Trees,
      ariaLabel: t("الانتقال إلى قسم المنتزهات", "Go to Parks section")
    },
    {
      id: "cafes",
      label: t("الكافيهات", "Cafés"),
      icon: Coffee,
      ariaLabel: t("الانتقال إلى قسم الكافيهات", "Go to Cafés section")
    }
  ];

  return (
    <nav id="category-navigation" className={`sticky top-0 z-50 border-b border-white/10 bg-[#102e28]/95 text-white backdrop-blur-xl transition-all duration-500 ${isScrolled ? 'shadow-lg shadow-primary/10 border-b border-primary/20' : 'shadow-lg'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <ul className="flex justify-center items-center flex-nowrap gap-2 md:gap-6 py-3 overflow-x-auto">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isGlowing = glowIndex === index;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="flex-shrink-0">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 hover:bg-white/15 hover:text-white text-sm md:text-base whitespace-nowrap ${isActive ? 'bg-white/20 text-white font-bold' : 'font-medium text-white/80'} ${isGlowing ? 'animate-nav-pulse ring-2 ring-primary/50' : ''}`}
                  aria-label={item.ariaLabel}
                >
                  <IconComponent className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ${isGlowing ? 'animate-icon-bounce' : ''}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {/* Guide text */}
        <div className={`text-center transition-all duration-500 ${showGuideText ? 'opacity-100 max-h-10 pb-2' : 'opacity-0 max-h-0 overflow-hidden pb-0'}`}>
          <span className="text-xs text-primary-foreground/70">{t("اختر ما يناسبك", "Choose what suits you")}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;