import type { ReactNode } from "react";

type Theme = "home" | "anshen" | "jieyu" | "anmei";

function Grain({ id }: { id: string }) {
  return (
    <filter id={id} x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="1" seed="7" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" />
    </filter>
  );
}

function Cloud() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M24 112
           C 14 112 10 98 22 90
           C 16 70 38 56 54 70
           C 60 46 94 44 104 68
           C 122 58 138 76 130 94
           C 144 98 142 118 124 118
           H 32
           C 22 118 18 114 24 112 Z"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
      />
      <path d="M40 96 c8-14 24-18 36-6" stroke="var(--color-warm)" strokeWidth="1.8" />
      <path d="M78 82 c8-10 22-10 30 2" stroke="var(--color-accent-soft)" strokeWidth="1.7" />
    </g>
  );
}

function Window() {
  return (
    <g fill="none" strokeLinecap="round">
      <rect x="24" y="30" width="88" height="124" rx="6" stroke="var(--color-ink)" strokeWidth="2.2" />
      <path d="M68 30 v124" stroke="var(--color-accent)" strokeWidth="1.8" />
      <path d="M24 92 h88" stroke="var(--color-accent)" strokeWidth="1.8" />
      <circle cx="88" cy="56" r="8" fill="var(--color-warm)" fillOpacity="0.9" stroke="var(--color-ink)" strokeWidth="1.4" />
      <path d="M32 48 c10 8 18 6 26-4" stroke="var(--color-accent-soft)" strokeWidth="1.8" />
      <path d="M76 108 c10-12 20-10 28 0" stroke="var(--color-warm)" strokeWidth="1.8" />
    </g>
  );
}

function Tree() {
  return (
    <g fill="none" strokeLinecap="round">
      <path d="M70 168 v-58" stroke="var(--color-ink)" strokeWidth="3.4" />
      <path d="M70 118 c-28-8 -40-32 -24-54" stroke="var(--color-accent)" strokeWidth="2.4" />
      <path d="M70 112 c26-6 40-28 26-52" stroke="var(--color-accent)" strokeWidth="2.4" />
      <path d="M70 100 c-16-18 -12-38 6-46" stroke="var(--color-warm)" strokeWidth="2.1" />
      <path d="M70 104 c18-14 28-30 22-44" stroke="var(--color-accent-soft)" strokeWidth="2.1" />
      <path d="M48 168 h44" stroke="var(--color-ink)" strokeWidth="1.7" />
    </g>
  );
}

function Water() {
  return (
    <g fill="none" strokeLinecap="round">
      <path d="M10 72 c26 22 50 22 76 2 24-18 42-14 54 8" stroke="var(--color-accent)" strokeWidth="2.4" />
      <path d="M14 96 c24 18 48 16 72 0 22-14 40-12 50 6" stroke="var(--color-accent-soft)" strokeWidth="2.2" />
      <path d="M18 118 c22 14 44 12 66-2 20-12 38-10 48 6" stroke="var(--color-ink)" strokeWidth="1.9" />
      <path d="M22 138 c18 10 38 8 56-2" stroke="var(--color-warm)" strokeWidth="1.8" />
    </g>
  );
}

function Bird() {
  return (
    <g strokeLinecap="round">
      <path d="M16 130 c40 8 76 2 108-18" fill="none" stroke="var(--color-ink)" strokeWidth="1.9" />
      <path
        d="M46 112 c12-6 28-8 44-2 8 4 14 12 8 18-10 8-36 10-50 2-8-4-10-12-2-18z"
        fill="none"
        stroke="var(--color-warm)"
        strokeWidth="2.3"
      />
      <circle cx="98" cy="102" r="10" fill="none" stroke="var(--color-accent)" strokeWidth="2.1" />
      <circle cx="102" cy="100" r="1.8" fill="var(--color-ink)" />
      <path d="M108 102 l11 2" fill="none" stroke="var(--color-warm)" strokeWidth="1.8" />
      <path d="M52 106 c-14-16 -4-26 12-18" fill="none" stroke="var(--color-accent-soft)" strokeWidth="1.9" />
    </g>
  );
}

function Moon() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M86 48 A 42 42 0 1 0 86 140 A 30 30 0 1 1 86 48 Z"
        stroke="var(--color-warm)"
        strokeWidth="2.6"
      />
      <circle cx="72" cy="88" r="5" stroke="var(--color-accent-soft)" strokeWidth="1.5" />
      <circle cx="80" cy="108" r="3.2" stroke="var(--color-accent)" strokeWidth="1.3" />
      <circle cx="36" cy="52" r="1.8" fill="var(--color-warm)" />
      <circle cx="24" cy="78" r="1.4" fill="var(--color-accent)" />
      <circle cx="42" cy="34" r="1.3" fill="var(--color-warm)" />
    </g>
  );
}

function Clock() {
  return (
    <g fill="none" strokeLinecap="round">
      <circle cx="70" cy="96" r="44" stroke="var(--color-ink)" strokeWidth="2.3" />
      <circle cx="70" cy="96" r="4" fill="var(--color-warm)" stroke="var(--color-ink)" strokeWidth="1.1" />
      <path d="M70 60 v10 M70 122 v10 M36 96 h10 M94 96 h10" stroke="var(--color-accent)" strokeWidth="2.2" />
      <path d="M70 96 l10-24" stroke="var(--color-ink)" strokeWidth="2.4" />
      <path d="M70 96 l24 14" stroke="var(--color-warm)" strokeWidth="2.2" />
    </g>
  );
}

const ART: Record<Theme, { left: ReactNode; right: ReactNode }> = {
  home: { left: <Cloud />, right: <Window /> },
  anshen: { left: <Bird />, right: <Window /> },
  jieyu: { left: <Tree />, right: <Water /> },
  anmei: { left: <Moon />, right: <Clock /> },
};

function Side({ theme, side }: { theme: Theme; side: "left" | "right" }) {
  const grain = `crayon-${side}`;
  return (
    <svg viewBox="0 0 140 180" className="crayon-svg">
      <defs>
        <Grain id={grain} />
      </defs>
      <g filter={`url(#${grain})`} strokeLinejoin="round" strokeLinecap="round">
        {ART[theme][side]}
      </g>
    </svg>
  );
}

export function CrayonFrame({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) {
  return (
    <div className="crayon-frame">
      <aside className="crayon-margin crayon-left" aria-hidden="true">
        <Side theme={theme} side="left" />
      </aside>
      <div className="crayon-main">{children}</div>
      <aside className="crayon-margin crayon-right" aria-hidden="true">
        <Side theme={theme} side="right" />
      </aside>
    </div>
  );
}
