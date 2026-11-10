import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

// Stored across sessions so returning visitors on the same browser are not counted again.
// Clearing browser storage or using another device can still create a new identity.
const VISITOR_ID_KEY = "faifa-visitor-id-v1";
const BASELINE = 5452;

function getVisitorId(): string | null {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

interface VisitorCounterProps {
  compact?: boolean;
}

const VisitorCounter = ({ compact }: VisitorCounterProps) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const visitorId = getVisitorId();
      if (visitorId) {
        const { data, error } = await supabase.rpc("register_unique_visitor", {
          p_visitor_id: visitorId,
        });
        if (!error && typeof data === "number") {
          if (!cancelled) setVisitorCount(Math.max(BASELINE, data));
          return;
        }
        console.warn("Visitor registration unavailable:", error?.message);
      }

      // Read-only fallback: never increment on refresh or when registration fails.
      const { data } = await supabase
        .from("site_analytics")
        .select("visitor_count")
        .eq("id", 1)
        .maybeSingle();
      if (!cancelled) setVisitorCount(Math.max(BASELINE, data?.visitor_count ?? BASELINE));
    };
    void run();
    const channel = supabase
      .channel("site-analytics")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "site_analytics" }, (payload) => {
        const next = (payload.new as { visitor_count?: number })?.visitor_count;
        if (!cancelled && typeof next === "number") setVisitorCount(Math.max(BASELINE, next));
      })
      .subscribe();
    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className={`text-center text-sm text-muted-foreground ${compact ? "" : "mt-5"}`}>
      {t("عدد الزوار:", "Visitors:")}{" "}
      <span className="font-semibold">{visitorCount === null ? "—" : visitorCount.toLocaleString("en-US")}</span>
    </div>
  );
};

export default VisitorCounter;
