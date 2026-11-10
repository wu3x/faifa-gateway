import { useState } from "react";
import { Instagram, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import stcPayLogo from "@/assets/stc-pay-logo.png";
import stcPayQr from "@/assets/stc-pay-qr.jpeg";
import developerAvatar from "@/assets/developer-avatar.png";

const IBAN = "SA5878000000001019616618";

const DeveloperSection = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const copyIBAN = async () => {
    try {
      await navigator.clipboard.writeText(IBAN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = IBAN;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4" id="developer">
      {/* Developer */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[11px] text-muted-foreground tracking-wide">
          {t('مطور الموقع "روح"', 'Website Developer "Rouh"')}
        </p>
        <a
          href="https://www.instagram.com/wu3x?igsh=MTJpMDJsaTV2d3pvOQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white rounded-full border border-purple-100 hover:border-purple-200 hover:scale-105 transition-all duration-300 shadow-sm"
          aria-label={t("زيارة حساب المطور على إنستقرام", "Visit the developer's Instagram")}
        >
          <img
            src={developerAvatar}
            alt={t("روح", "Rouh")}
            className="w-5 h-5 rounded-full object-cover border border-purple-100"
          />
          <Instagram className="w-5 h-5 text-purple-900" />
          <span className="text-sm font-medium text-purple-900">wu3x</span>
        </a>
      </div>

      {/* Support */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[11px] text-muted-foreground tracking-wide">
          {t("للمساهمة بتطوير الموقع", "Support the development of this site")}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white rounded-full border border-purple-100 hover:border-purple-200 hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label={t("دعم عبر stc pay", "Support via stc pay")}
            >
              <img
                src={stcPayLogo}
                alt="stc pay"
                className="h-5 w-auto object-contain"
              />
              <span className="text-sm font-medium text-purple-900">
                {t("دعم عبر stc pay", "Support via stc pay")}
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md border-border bg-background p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-0 text-center">
              <DialogTitle className="text-lg font-semibold text-foreground leading-relaxed">
                {t("للمساهمة في دعم وتطوير الموقع", "Contribute to supporting and developing the site")}
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 pt-4 space-y-5">
              <div className="flex justify-center">
                <div className="w-56 h-56 rounded-xl overflow-hidden border border-border bg-card shadow-sm flex items-center justify-center">
                  <img
                    src={stcPayQr}
                    alt={t("رمز stc pay", "stc pay QR code")}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">
                  {t("رقم الآيبان", "IBAN")}
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-center text-sm font-mono bg-muted rounded-lg px-3 py-2.5 text-foreground break-all ltr">
                    {IBAN}
                  </code>
                  <button
                    onClick={copyIBAN}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                    aria-label={t("نسخ الآيبان", "Copy IBAN")}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t("تم النسخ", "Copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{t("نسخ الآيبان", "Copy IBAN")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DeveloperSection;
