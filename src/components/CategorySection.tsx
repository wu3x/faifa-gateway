import { Children, cloneElement, isValidElement, useEffect, useState } from "react";
import { STARTER_VOTES } from "@/lib/starterVotes";
import { VOTES_API, getVoterId } from "@/lib/votes";
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
  // The server is the sole source of truth. Never count a vote only in this browser.
  const [choice, setChoice] = useState<string | null>(null);
  const [remoteCounts, setRemoteCounts] = useState<Record<string, number>>(STARTER_VOTES[id] || {});
  const [busy, setBusy] = useState(false);
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    setReady(false);
    fetch(VOTES_API + "?category=" + encodeURIComponent(id), { cache: "no-store" })
      .then(async r => { if (!r.ok) throw new Error("Unavailable"); return r.json(); })
      .then(data => {
        if (!active) return;
        if (!data.counts || typeof data.counts !== "object") throw new Error("Invalid counts");
        setRemoteCounts(data.counts);
        try { setChoice(localStorage.getItem("faifa-choice-" + id)); } catch {}
        setReady(true);
      })
      .catch(() => { if (active) { setReady(false); } });
    return () => { active = false; };
  }, [id]);
  const counts = remoteCounts;
  const vote = async (placeId: string) => {
    if (busy || !ready || choice === placeId) return;
    const voterId = getVoterId();
    if (!voterId) return;
    setBusy(true);
    try {
      const response = await fetch(VOTES_API, {
        method: "POST", cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: id, placeId, voterId })
      });
      if (!response.ok) throw new Error("Vote failed");
      const data = await response.json();
      if (data.choice !== placeId || !data.counts || typeof data.counts !== "object") {
        throw new Error("Invalid vote confirmation");
      }
      setRemoteCounts(data.counts);
      setChoice(placeId);
      try { localStorage.setItem("faifa-choice-" + id, placeId); } catch {}
      setCelebrating(placeId);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.([35, 25, 65]);
    } catch {
      // Do not pretend a failed vote succeeded; the next refresh retrieves server totals.
      try {
        const response = await fetch(VOTES_API + "?category=" + encodeURIComponent(id), { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          if (data.counts) setRemoteCounts(data.counts);
        }
      } catch {}
    } finally { setBusy(false); }
  };
  const cards = Children.toArray(children).filter(isValidElement).map((child, index) => {
    const props = child.props as { title?: string };
    return { child, index, key: props.title || String(index) };
  }).sort((a, b) => (counts[b.key] || 0) - (counts[a.key] || 0) || a.index - b.index);

  return (
    <section id={id} className="scroll-mt-28 py-6 md:py-12">
      <div className="mb-8 flex flex-col gap-5 border-b border-border/70 pb-7 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3 text-primary"><span className="text-xs font-bold tracking-[.2em]">{detail?.number}</span><span className="h-px w-10 bg-primary/40" /><span className="text-xs font-medium">{t("دليل فيفاء", "FAIFA GUIDE")}</span></div>
          <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:h-7 [&_svg]:w-7">{icon}</span><h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2></div>
          {detail && <p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground md:text-base">{lang === "ar" ? detail.ar : detail.en}</p>}
        </div>
        
      </div>
      <div className="mb-4 text-xs text-muted-foreground">{cards.length} {t("أماكن", "places")}</div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map(({child,key}) => <div key={key} className="min-w-0 [&>article]:h-full">{cloneElement(child as React.ReactElement<any>, { compact: true, voteCount: counts[key] || 0, hasVoted: choice === key, onVote: () => vote(key), voteDisabled: busy || !ready, celebrating: celebrating === key, onCelebrationEnd: () => setCelebrating(null) })}</div>)}
      </div>
    </section>
  );
};
export default CategorySection;