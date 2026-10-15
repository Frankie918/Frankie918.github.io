import { useEffect, useState } from "react";

declare global {
  interface Window {
    goatcounter?: { count?: (o: { path: string; title?: string; event?: boolean }) => void };
  }
}

function track(card: string) {
  const slug = card.split("/").pop() ?? card;
  try {
    window.goatcounter?.count?.({ path: `jieqi-card-${slug}`, title: "jieqi card", event: true });
  } catch {
    /* ignore */
  }
}

export function JieqiShareCard({ card, term, lang }: { card: string; term: string; lang: string }) {
  const [canShare, setCanShare] = useState(false);
  const jpg = `${card}.jpg`;
  const file = `身心課堂-${term}.jpg`;
  const alt = lang === "en" ? `${term} solar-term card, Body & Mind Classroom` : `${term}節氣圖卡 · 身心課堂`;

  useEffect(() => {
    try {
      const probe = new File([""], "x.jpg", { type: "image/jpeg" });
      setCanShare(typeof navigator.share === "function" && !!navigator.canShare?.({ files: [probe] }));
    } catch {
      setCanShare(false);
    }
  }, []);

  async function share() {
    track(card);
    try {
      const blob = await (await fetch(jpg)).blob();
      const f = new File([blob], file, { type: "image/jpeg" });
      await navigator.share({ files: [f], title: `${term} · 身心課堂` });
    } catch {
      /* cancelled or unsupported */
    }
  }

  return (
    <figure className="mt-8">
      <picture>
        <source srcSet={`${card}-web.webp`} type="image/webp" />
        <img src={`${card}-web.jpg`} alt={alt} loading="lazy" className="w-full rounded-card border border-line" />
      </picture>
      <figcaption className="mt-3 flex gap-5 text-sm">
        <a href={jpg} download={file} onClick={() => track(card)} className="text-accent no-underline">
          {lang === "en" ? "Save card" : "儲存圖卡"}
        </a>
        {canShare && (
          <button type="button" onClick={share} className="text-accent">
            {lang === "en" ? "Share" : "分享"}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
