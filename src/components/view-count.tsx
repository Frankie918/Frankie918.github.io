import { useEffect, useState } from "react";
import { useCopy } from "@/i18n/lang";
import { bumpViews, type ViewPage } from "@/lib/views";

const STATIC_SITE = import.meta.env.VITE_STATIC_SITE === "true";

const recent = new Map<string, number>();

export function ViewCount({
  page,
  tone = "dark",
}: {
  page: ViewPage;
  tone?: "dark" | "light";
}) {
  const label = useCopy().ui.views;
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (STATIC_SITE) {
      let alive = true;
      fetch("https://tcmmacau.goatcounter.com/counter/TOTAL.json")
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((j: { count?: string }) => {
          const c = Number(String(j.count ?? "").replace(/[^0-9]/g, ""));
          if (alive && Number.isFinite(c) && String(j.count ?? "").match(/[0-9]/)) setN(c + 50);
        })
        .catch(() => {});
      return () => {
        alive = false;
      };
    }
    const now = Date.now();
    if (now - (recent.get(page) ?? 0) < 800) return;
    recent.set(page, now);
    let alive = true;
    bumpViews({ data: { page } })
      .then((res) => {
        if (alive) setN(res.n);
      })
      .catch(() => {
        if (alive) setN(null);
      });
    return () => {
      alive = false;
    };
  }, [page]);

  if (n === null) return null;

  return (
    <p
      className={
        tone === "light"
          ? "mt-6 text-sm tracking-[0.12em] text-muted"
          : "mt-4 text-sm tracking-[0.12em] text-paper/80"
      }
    >
      {label}
      <span className={tone === "light" ? "ml-2 font-serif text-lg text-ink" : "ml-2 font-serif text-lg text-paper"}>
        {n.toLocaleString("en-US")}
      </span>
    </p>
  );
}
