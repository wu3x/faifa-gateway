import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const VISITOR_ID_KEY = "faifa-visitor-id-v1";
const BASELINE = 5452;
const API_URL = "https://faifa-visitor-counter.a-alfaifi771.workers.dev/api/visitors";

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

    const updateCount = async () => {
      const visitorId = getVisitorId();
      try {
        // Register this browser once; the Worker/D1 database is responsible for
        // deduplicating the visitor ID across reloads and repeat requests.
        if (visitorId) {
          const registration = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visitorId }),
          });
          if (registration.ok) {
            const data: { count?: number } = await registration.json();
            if (typeof data.count === "number") {
              if (!cancelled) setVisitorCount(Math.max(BASELINE, data.count));
              return;
            }
          }
        }

        // Read-only fallback never increments the counter.
        const response = await fetch(API_URL, { method: "GET", cache: "no-store" });
        if (!response.ok) throw new Error("Visitor count unavailable");
        const data: { count?: number } = await response.json();
        if (!cancelled) setVisitorCount(Math.max(BASELINE, data.count ?? BASELINE));
      } catch (error) {
        console.warn("Visitor counter unavailable:", error);
        if (!cancelled) setVisitorCount(BASELINE);
      }
    };

    void updateCount();
    return () => {
      cancelled = true;
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
