import { useEffect, useRef, type ReactNode } from "react";

type Theme = "home" | "anshen" | "jieyu" | "anmei";

const ART: Record<Theme, { left: string; right: string }> = {
  home: { left: "cloud", right: "window" },
  anshen: { left: "bird", right: "window" },
  jieyu: { left: "tree", right: "water" },
  anmei: { left: "moon", right: "clock" },
};

function Side({ name }: { name: string }) {
  return (
    <div className="crayon-float">
      <img src={`/side/${name}.webp`} alt="" className="crayon-img" loading="eager" decoding="async" />
    </div>
  );
}

export function CrayonFrame({ theme, children }: { theme: Theme; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Gentle scroll drift: margins move a little slower than the page.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 2400);
        el.style.setProperty("--crayon-drift", `${(y * -0.03).toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const art = ART[theme];
  return (
    <div className="crayon-frame" ref={ref}>
      <aside className="crayon-margin crayon-left" aria-hidden="true">
        <Side name={art.left} />
      </aside>
      <div className="crayon-main">{children}</div>
      <aside className="crayon-margin crayon-right" aria-hidden="true">
        <Side name={art.right} />
      </aside>
    </div>
  );
}
