import { MapPin, MessageCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
interface PlaceCardProps {
  title: string;
  description?: string;
  englishDescription?: string;
  additionalContent?: React.ReactNode;
  mapLink: string;
  icon: React.ReactNode;
  voteCount?: number;
  hasVoted?: boolean;
  onVote?: () => void;
  voteDisabled?: boolean;
}
const PlaceCard = ({ title, description, englishDescription, additionalContent, mapLink, icon, voteCount = 0, hasVoted = false, onVote, voteDisabled = true }: PlaceCardProps) => {
  const { lang, t } = useLanguage();
  const splitTitle = (raw: string) => {
    for (const separator of [" – ", " - ", " / "]) {
      if (raw.includes(separator)) {
        const [ar, en] = raw.split(separator);
        return { ar: ar.trim(), en: en.trim() };
      }
    }
    return { ar: raw, en: raw };
  };
  const placeId = new URL(mapLink).searchParams.get("query_place_id");
  const reviewsLink = placeId
    ? `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`
    : mapLink;
  const iconMotion = /مقهى|كافيه|القهوة|ديوانية|أُلفة|غيمة|Coffee|Café|Cafe/i.test(title) ? "faifa-icon-coffee" : /منتزه|سوق|ممشى|مطل|إطلالة|Park|Trail|Viewpoint/i.test(title) ? "faifa-icon-nature" : "faifa-icon-gentle";
  const parts = splitTitle(title);
  const displayTitle = lang === "en" ? parts.en : parts.ar;
  const primaryDesc = lang === "en" ? (englishDescription || description) : description;
  return (
      <article className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[1.6rem] border border-border/70 bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_50px_-25px_rgba(14,60,44,.35)] md:p-7">
        <div className="absolute -left-14 -top-14 h-40 w-40 rounded-full bg-primary/[.035] transition-transform duration-700 group-hover:scale-150" aria-hidden="true" />
        <div className="relative mb-6 flex items-start justify-between gap-4">
          <span className={`faifa-animated-icon ${iconMotion} flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:h-6 [&_svg]:w-6`}>{icon}</span>
          <button type="button" onClick={onVote} disabled={voteDisabled || hasVoted} title={voteDisabled ? t("التصويت غير متاح مؤقتًا", "Voting temporarily unavailable") : hasVoted ? t("صوتك لهذا المكان", "Your vote") : t("صوّت لهذا المكان", "Vote for this place")} aria-label={t("التصويت للمكان", "Vote for place") + " " + displayTitle} className={"inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition disabled:cursor-default " + (hasVoted ? "border-amber-400/40 bg-amber-400/10 text-amber-500" : "border-border bg-secondary/60 text-muted-foreground hover:border-amber-400 hover:text-amber-500")}>
            <Star size={16} fill={hasVoted ? "currentColor" : "none"} />
            <span dir="ltr" className="tabular-nums">{voteCount}</span>
          </button>
        </div>
        <h3 className="relative text-xl font-bold leading-relaxed text-foreground md:text-[1.35rem]">{displayTitle}</h3>
        {primaryDesc && <p className="relative mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{primaryDesc}</p>}
        {additionalContent && <div className="relative mt-4 text-sm" onClick={e => e.stopPropagation()}>{additionalContent}</div>}
        <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-5" style={{ marginTop: "auto", paddingTop: "1.25rem" }}>
          <a href={reviewsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3" aria-label={t("آراء الزوار", "Visitor reviews") + " " + displayTitle}><MessageCircle size={17} />{t("آراء الزوار", "Visitor reviews")}</a>
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary" aria-label={t("عرض الموقع على الخريطة", "View on map") + " " + displayTitle}><MapPin size={15} />{t("الموقع", "Location")}</a>
        </div>
      </article>
  );
};
export default PlaceCard;