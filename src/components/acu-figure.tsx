import { useLang } from "@/i18n/lang";

const IMG: Record<string, string> = {
  baihui: "head",
  yintang: "head",
  shenmen: "wrist",
  neiguan: "wrist",
  taichong: "foot-top",
  sanyinjiao: "ankle",
  yongquan: "sole",
};

const ALT = {
  yue: (n: string) => `${n}位置放大圖`,
  cmn: (n: string) => `${n}位置放大圖`,
  en: (n: string) => `Close-up showing where ${n} is`,
} as const;

const HINT = {
  yue: "撳身上嘅點，睇放大圖",
  cmn: "點選身上的點，看放大圖",
  en: "Tap a dot to see a close-up",
} as const;

export function hasCloseUp(id: string) {
  return id in IMG;
}

export function AcuCloseUp({ id, name }: { id: string; name: string }) {
  const { lang } = useLang();
  const file = IMG[id];
  if (!file) return null;
  return (
    <img
      key={file}
      src={`${import.meta.env.BASE_URL}acu/${file}.webp`}
      alt={ALT[lang](name)}
      loading="lazy"
      decoding="async"
      className="acu-closeup mt-4 w-full max-w-sm rounded-card border border-line bg-paper"
    />
  );
}

export function AcuHint() {
  const { lang } = useLang();
  return <p className="mt-3 text-center text-xs text-muted">{HINT[lang]}</p>;
}

/** Simple calm whole-body silhouette; dots are positioned by % over a 176x288 box. */
export function BodySilhouette() {
  return (
    <svg viewBox="0 0 176 288" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g fill="var(--color-mist, #e4ddd0)">
        <circle cx="88" cy="26" r="22" />
        <rect x="80" y="46" width="16" height="10" />
        <rect x="58" y="56" width="60" height="110" rx="26" />
        <rect x="30" y="62" width="22" height="120" rx="11" transform="rotate(8 41 62)" />
        <rect x="124" y="62" width="22" height="120" rx="11" transform="rotate(-8 135 62)" />
        <rect x="62" y="150" width="24" height="124" rx="12" />
        <rect x="90" y="150" width="24" height="124" rx="12" />
        <ellipse cx="68" cy="278" rx="18" ry="8" />
        <ellipse cx="108" cy="278" rx="18" ry="8" />
      </g>
    </svg>
  );
}
