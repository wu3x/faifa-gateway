import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ThemeToggleProps {
  compact?: boolean;
}

const ThemeToggle = ({ compact }: ThemeToggleProps) => {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("faifa-theme-v2") !== "light";
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("faifa-theme-v2", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("faifa-theme-v2", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const saved = localStorage.getItem("faifa-theme-v2");
    setIsDark(saved !== "light");
  }, []);

  return (
    <div
      dir="ltr"
      className={compact ? "flex flex-col items-center gap-0.5" : "flex items-center justify-center py-6"}
    >
      {compact && (
        <span className="text-[10px] leading-none text-muted-foreground/60 tracking-wide">
          {t("النمط الليلي", "Dark Mode")}
        </span>
      )}
      <button
        onClick={() => setIsDark(!isDark)}
        className="relative flex items-center w-16 h-8 rounded-full bg-muted border border-border shadow-soft transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Toggle dark mode"
      >
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-primary shadow-md flex items-center justify-center"
          animate={{ x: isDark ? 4 : 36 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-primary-foreground" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-primary-foreground" />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;
