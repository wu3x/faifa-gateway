import { MapPin, MessageCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
interface PlaceCardProps {
  title: string;
  compact?: boolean;
  description?: string;
  englishDescription?: string;
  additionalContent?: React.ReactNode;
  mapLink: string;
  hideReviews?: boolean;
  icon: React.ReactNode;
  voteCount?: number;
  hasVoted?: boolean;
  onVote?: () => void;
  voteDisabled?: boolean;
  celebrating?: boolean;
  onCelebrationEnd?: () => void;
}
const ENGLISH_PLACE_NAMES: Record<string, string> = {
  "فندق جارة الغيم – Jarat Al Gheim Hotel": "Jarat Al-Ghaim Hotel",
  "فندق فيفاء الفاخر – Faifa Luxury Hotel": "Faifa Luxury Hotel",
  "فندق إيوان – Iwan Hotel": "Iwan Hotel",
  "بيت سهلان": "Sahlan House",
  "أكواخ الندى": "Al-Nada Cabins",
  "شاليه فيفا – Viva Cottage": "Viva Cottage",
  "سكني": "Sakani Accommodation",
  "الوادي الأخضر للغرف والشقق": "Green Valley Rooms & Apartments",
  "الدثنة للشقق المفروشة": "Al-Dathnah Furnished Apartments",
  "السحاب فيو": "Sahab View",
  "فيفاء للوحدات السكنية": "Faifa Residential Suites",
  "مطل الحبيل": "Al-Hubail Viewpoint Stay",
  "شاليه اللعثة": "Al-La'athah Chalet",
  "منتزه وإطلالة الخطم – Al-Khatm Park & Viewpoint": "Al-Khatm Park & Viewpoint",
  "سوق النفيعة الشعبي": "Al-Nufay'ah Traditional Market",
  "منتجع الباخرة – Al-Bakhira Resort": "Al-Bakhira Resort",
  "ممشى البن الخولاني – Khawlani Coffee Trail": "Khawlani Coffee Trail",
  "مطل الدفرة – Al-Dafrah Viewpoint": "Al-Dafrah Viewpoint",
  "مطل قرضة – Qarza Viewpoint": "Qardah Viewpoint",
  "إطلالة فيفا": "Faifa Scenic Viewpoint",
  "مزرعة المقبلات العليا للبن السعودي": "Al-Muqbilat Al-Ulya Coffee Farm",
  "حديقة البلدية": "Municipal Garden",
  "منتزه مطل بردان": "Bardan Viewpoint Park",
  "مقهى جارة القمر – Jarat Al-Qamar Café": "Jarat Al-Qamar Café",
  "مقهى جارة الغيم – Jarat Al-Ghaim Café": "Jarat Al-Ghaim Café",
  "مقهى ومطل إيوان – Iwan Café & Viewpoint": "Iwan Café & Viewpoint",
  "مقهى سكون": "Sukoon Café",
  "كافيه تالقة": "Taliqah Café",
  "لب القهوة": "Lubb Al-Qahwa Café",
  "غيمة – Cloud": "Ghaimah Café",
  "مقهى البرنسيسة": "Princessa Café",
  "مقهى روز بسنت النسائي": "Rose Basnat Women's Café",
  "ديوانية واسع الخاطر": "Wasee Al-Khater Lounge",
  "أُلفة": "Ulfah Café",
  "مطعم ومقهى ريف وكيف": "Reef & Kaif Restaurant and Café",
  "مطل العبسية": "Al-Abasiyah Viewpoint",
  "المصلى المعلق": "Hanging Eid Prayer Ground",
  "مطل اللعثة": "Al-La'athah Viewpoint",
  "كهف فيفاء الأثري": "Historic Faifa Cave",
  "المطل الزجاجي المعلق": "Suspended Glass Viewpoint",
  "المطل الشهير بفيفاء": "Faifa's Famous Viewpoint",
  "وادي الطرارة": "Al-Tararah Valley",
  "البقعة – نيد الدارة": "Al-Buq'ah – Nid Al-Darah",
  "حلقن": "Halqan"
};

const PlaceCard = ({ compact = false, title, description, englishDescription, additionalContent, mapLink, hideReviews = false, icon, voteCount = 0, hasVoted = false, onVote, voteDisabled = true, celebrating = false, onCelebrationEnd }: PlaceCardProps) => {
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
  const displayTitle = lang === "en" ? (ENGLISH_PLACE_NAMES[title] || parts.en) : parts.ar;
  const primaryDesc = lang === "en" ? (englishDescription || description) : description;
  return (
      <article className={`group relative flex min-h-[210px] flex-col overflow-hidden rounded-[1.2rem] border border-border/70 bg-card p-3 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg sm:p-5 ${compact ? "sm:min-h-[235px]" : "md:p-7"}`}>
        <div className="absolute -left-14 -top-14 h-40 w-40 rounded-full bg-primary/[.035] transition-transform duration-700 group-hover:scale-150" aria-hidden="true" />
        <div className="relative mb-3 flex items-start justify-between gap-1.5 sm:mb-5 sm:gap-3">
          <span className={`faifa-animated-icon ${iconMotion} flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6`}>{icon}</span>
          <div className="flex shrink-0 flex-col items-center gap-1">
          <button type="button" onClick={onVote} disabled={voteDisabled || hasVoted} title={hasVoted ? t("صوتك لهذا المكان", "Your vote") : t("امنح المكان نجمة", "Give this place a star")} aria-label={t("امنح المكان نجمة", "Give this place a star") + " " + displayTitle} className={"faifa-vote-button relative inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 transition-all disabled:cursor-default " + (hasVoted ? "border-amber-400/60 bg-amber-400/15 text-amber-400" : "border-amber-400/30 bg-amber-400/[.08] text-amber-400 hover:border-amber-400 hover:bg-amber-400/20")}>
            <span className="relative flex items-center justify-center">
              <Star className={"faifa-vote-star h-[19px] w-[19px] " + (celebrating ? "faifa-vote-burst" : "")} fill={hasVoted ? "currentColor" : "none"} onAnimationEnd={onCelebrationEnd} />
              {celebrating && <Star aria-hidden="true" className="faifa-vote-fly absolute h-6 w-6 text-amber-300" fill="currentColor" />}
            </span>
            <span dir="ltr" className="text-xs font-extrabold tabular-nums">{voteCount}</span>
          </button>
          <span className="text-center text-[8px] leading-tight tracking-tight text-muted-foreground sm:text-[10px]">{hasVoted ? t("منحت المكان نجمة", "Star given") : t("امنح المكان نجمة", "Give a star")}</span>
          </div>
        </div>
        <h3 className="relative text-sm font-bold leading-snug text-foreground sm:text-lg md:text-xl">{displayTitle}</h3>
        {primaryDesc && <p className="relative mt-2 line-clamp-2 text-[11px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">{primaryDesc}</p>}
        {additionalContent && <div className="relative mt-4 text-sm" onClick={e => e.stopPropagation()}>{additionalContent}</div>}
        <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3 sm:pt-5">
          {!hideReviews && <a href={reviewsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold text-primary transition hover:gap-2 sm:gap-2 sm:text-sm" aria-label={t("آراء الزوار", "Visitor reviews") + " " + displayTitle}><MessageCircle size={17} />{t("آراء الزوار", "Visitor reviews")}</a>}
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1.5 text-[10px] font-medium text-foreground transition hover:border-primary hover:text-primary sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs" aria-label={t("عرض الموقع على الخريطة", "View on map") + " " + displayTitle}><MapPin size={15} />{t("الموقع", "Location")}</a>
        </div>
      </article>
  );
};
export default PlaceCard;