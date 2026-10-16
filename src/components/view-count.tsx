import { useEffect, useState } from "react";
import { useCopy } from "@/i18n/lang";
import { bumpViews, type ViewPage } from "@/lib/views";

const STATIC_SITE = import.meta.env.VITE_STATIC_SITE === "true";


const GC = "https://tcmmacau.goatcounter.com/counter/";

// Other TCMMACAU sites share this GoatCounter account; exclude their hits.
const OTHER_SITE_PATHS = [
  "/zhendao/",
  "/beauty/",
  "/gubenshutong/",
  "/zhiji/",
  "/fuke/",
  ...["infertility", "pcos", "menopause", "poi"].map((r) => `/fuke/rooms/${r}/`),
  "/therapy/",
  ...["acupuncture", "cupping", "plum", "ear", "fuzhen", "fireneedle", "embedding"].map(
    (r) => `/therapy/rooms/${r}/`,
  ),
  "/yangsheng/",
  ...["spring", "summer", "autumn", "winter"].map((r) => `/yangsheng/season/${r}/`),
  "/yangsheng/suixi/",
  "/yangsheng/notes/",
];

// Returns the count; for non-required paths a 404 / error means 0.
async function fetchCount(key: string, required: boolean): Promise<number | null> {
  try {
    const r = await fetch(`${GC}${key}.json`);
    if (!r.ok) return required ? null : 0;
    const j: { count?: string | number } = await r.json();
    const raw = String(j.count ?? "");
    if (!/[0-9]/.test(raw)) return required ? null : 0;
    return Number(raw.replace(/[^0-9]/g, ""));
  } catch {
    return required ? null : 0;
  }
}

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
      Promise.all([
        fetchCount("TOTAL", true),
        ...OTHER_SITE_PATHS.map((p) => fetchCount(encodeURIComponent(p), false)),
      ])
        .then(([total, ...others]) => {
          if (!alive || total === null) return;
          const other = others.reduce<number>((a, b) => a + (b ?? 0), 0);
          setN(Math.max(0, total - other) + 50);
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
