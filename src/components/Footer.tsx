import { useState } from "react";
import DeveloperSection from "./DeveloperSection";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const SHARE_URL = "https://tinyurl.com/faifa1";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);





  const { toast } = useToast();
  const { lang, t } = useLanguage();
  const SHARE_TITLE = t("اكتشف فيفاء", "Discover Faifa");
  const SHARE_TEXT = t("تعرف على فيفاء وجمالها من خلال هذا الموقع الرائع ✨", "Explore Faifa and its beauty through this amazing website ✨");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      toast({
        title: t("تم النسخ", "Copied"),
        description: t("تم نسخ الرابط بنجاح", "Link copied successfully"),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: t("خطأ", "Error"),
        description: t("لم نتمكن من نسخ الرابط", "Could not copy the link"),
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <footer className="relative bg-gradient-hero dark:bg-none dark:bg-[#101820] text-primary-foreground mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Compact developer and sharing actions side by side */}
          <DeveloperSection>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex min-h-10 w-full items-center justify-center gap-1 sm:gap-2 rounded-full border border-purple-100 bg-white px-1.5 sm:px-4 py-2 text-[11px] sm:text-sm font-medium text-purple-900 shadow-sm transition-all duration-300 hover:scale-105 hover:border-purple-200 active:scale-95"
                aria-label={t("مشاركة الموقع", "Share the website")}
              >
                <Share2 className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t("شارك الموقع", "Share website")}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir={lang === "ar" ? "rtl" : "ltr"}>
              <DialogHeader>
                <DialogTitle className="text-center">{t("مشاركة الموقع", "Share the website")}</DialogTitle>
                <DialogDescription className="text-center">
                  {t("انسخ الرابط أو شاركه مباشرة مع من تحب", "Copy the link or share it directly with your loved ones")}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={SHARE_URL}
                    readOnly
                    className="flex-1 text-left ltr:text-left"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0"
                    aria-label={t("نسخ الرابط", "Copy link")}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t("مشاركة عبر تطبيقات الجوال", "Share via mobile apps")}</span>
                </Button>
                <a
                  href={SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t("فتح الموقع", "Open website")}</span>
                </a>
              </div>
            </DialogContent>
          </Dialog>
          </DeveloperSection>

          {/* Main Title */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-primary-foreground/90 font-medium">{t("الجبل ما ينسى اللي زاره.. استودعناك الله", "The mountain never forgets those who visited it.. we entrust you to God")}</p>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8 space-y-3">
            <p className="text-primary-foreground/80">
              {t("© " + new Date().getFullYear() + " اكتشف فيفاء - جميع الحقوق محفوظة", "© " + new Date().getFullYear() + " Discover Faifa - All rights reserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
