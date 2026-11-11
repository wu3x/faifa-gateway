import { useState } from "react";
import DeveloperSection from "./DeveloperSection";
import { Share2, Copy, Check, ExternalLink, LockKeyhole } from "lucide-react";
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

const SHARE_URL = "https://wu3x.github.io/faifa-gateway/";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
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
      <button type="button" aria-label="إدارة الموقع" title="إدارة الموقع" onClick={() => setAdminOpen(true)} className="absolute bottom-3 left-3 z-10 h-3 w-3 rounded-full bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
      <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
        <DialogContent dir="rtl" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><LockKeyhole className="h-5 w-5" /> لوحة إدارة فيفاء</DialogTitle>
            <DialogDescription className="pt-2 text-right">مدخل الإدارة جاهز. سيتم تفعيل تسجيل الدخول الآمن ولوحة التحكم بعد ربط خدمة الإدارة بقاعدة البيانات. لا تدخل كلمة مرور هنا حاليًا.</DialogDescription>
          </DialogHeader>
          <Button type="button" onClick={() => setAdminOpen(false)}>إغلاق</Button>
        </DialogContent>
      </Dialog>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Compact developer and sharing actions side by side */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-5 md:gap-12">
            <DeveloperSection />
            <div className="flex flex-col items-center justify-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-primary-foreground text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label={t("مشاركة الموقع", "Share the website")}
              >
                <Share2 className="w-4 h-4" />
                <span>{t("شارك الموقع", "Share website")}</span>
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

            </div>
          </div>

          {/* Main Title */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-primary-foreground/90 font-medium">{t("الجبل ما ينسى اللي زاره.. استودعناك الله", "The mountain never forgets those who visited it.. we entrust you to God")}</p>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8 space-y-3">
            <p className="text-primary-foreground/80">
              {t("© 2024 اكتشف فيفاء - جميع الحقوق محفوظة", "© 2024 Discover Faifa - All rights reserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
