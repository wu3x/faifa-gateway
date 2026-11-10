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
  // Until D1 is deployed, votes persist on this device and remain clearly local.
  const storageKey = "faifa-local-vote-" + id;
  const readLocalChoice = () => {
    try { return localStorage.getItem(storageKey) || null; } catch { return null; }
  };
  const [choice, setChoice] = useState<string | null>(readLocalChoice);
  const [remote, setRemote] = useState(false);
  const [remoteCounts, setRemoteCounts] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    fetch(VOTES_API + "?category=" + encodeURIComponent(id))
      .then(async r => { if (!r.ok) throw new Error("Unavailable"); return r.json(); })
      .then(data => {
        if (!active) return;
        setRemoteCounts(data.counts || {});
        setRemote(true);
        try { setChoice(localStorage.getItem("faifa-choice-" + id)); } catch {}
        setReady(true);
      })
      .catch(() => { if (active) { setRemote(false); setReady(true); } });
    return () => { active = false; };
  }, [id]);
  const counts = remote ? remoteCounts : Object.fromEntries(
    Object.entries(STARTER_VOTES[id] || {}).map(([key, value]) => [key, value + (choice === key ? 1 : 0)])
  );
  const vote = async (placeId: string) => {
    if (busy || !ready || choice === placeId) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.([35, 25, 65]);
    setCelebrating(placeId);
    if (!remote) {
      try { localStorage.setItem(storageKey, placeId); } catch {}
      setChoice(placeId);
      return;
    }
    const voterId = getVoterId();
    if (!voterId) return;
    setBusy(true);
    const previous = choice;
    const previousCounts = remoteCounts;
    setChoice(placeId);
    setRemoteCounts(current => ({
      ...current,
      ...(previous ? { [previous]: Math.max(0, (current[previous] ?? STARTER_VOTES[id]?.[previous] ?? 0) - 1) } : {}),
      [placeId]: (current[placeId] ?? STARTER_VOTES[id]?.[placeId] ?? 0) + 1
    }));
    try {
      const response = await fetch(VOTES_API, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: id, placeId, voterId })
      });
      if (!response.ok) throw new Error("Vote failed");
      const data = await response.json();
      setRemoteCounts(data.counts || {});
      try { localStorage.setItem("faifa-choice-" + id, placeId); } catch {}
    } catch {
      setChoice(previous);
      setRemoteCounts(previousCounts);
      setRemote(false);
    } finally { setBusy(false); }
  };
  const cards = Children.toArray(children).filter(isValidElement).map((child, index) => {
    const props = child.props as { title?: string };
    return { child, index, key: props.title || String(index) };
  }).sort((a, b) => (counts[b.key] || 0) - (counts[a.key] || 0) || a.index - b.index);

  return (
    <section id={id} className="scroll-mt-28 py-10 md:py-16">
      <div className="mb-8 flex flex-col gap-5 border-b border-border/70 pb-7 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3 text-primary"><span className="text-xs font-bold tracking-[.2em]">{detail?.number}</span><span className="h-px w-10 bg-primary/40" /><span className="text-xs font-medium">{t("دليل فيفاء", "FAIFA GUIDE")}</span></div>
          <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:h-7 [&_svg]:w-7">{icon}</span><h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2></div>
          {detail && <p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground md:text-base">{lang === "ar" ? detail.ar : detail.en}</p>}
        </div>
        
      </div>
      <p className="mb-5 text-center text-xs font-medium tracking-wide text-muted-foreground md:text-sm">{t("كل ما زاد عدد النجوم، ترتفع البطاقة للأعلى", "More stars move a place higher in the list")}</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{cards.map(({child,key}) => cloneElement(child as React.ReactElement<any>, { key, voteCount: counts[key] || 0, hasVoted: choice === key, onVote: () => vote(key), voteDisabled: busy || !ready, celebrating: celebrating === key, onCelebrationEnd: () => setCelebrating(null) }))}</div>
    </section>
  );
};
export default CategorySection;