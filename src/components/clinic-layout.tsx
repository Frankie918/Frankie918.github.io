import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ClinicContact } from "@/components/clinic-contact";
import { CrayonFrame } from "@/components/crayon-margin";
import { DayGuide } from "@/components/day-guide";
import { ViewCount } from "@/components/view-count";
import { useCopy } from "@/i18n/lang";

type NavItem = { href: string; label: string };

/**
 * Open any collapsed <details> section that contains (or is) the anchor target, so in-page
 * links such as the nav bar or the sleep quiz's "#view" still land on visible content.
 */
function openAnchor(hash: string) {
  if (!hash || hash.length < 2) return;
  let el: HTMLElement | null = null;
  try {
    el = document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return;
  }
  if (!el) return;
  el.querySelectorAll<HTMLDetailsElement>(":scope > details").forEach((d) => (d.open = true));
  let up: HTMLElement | null = el;
  while (up) {
    if (up instanceof HTMLDetailsElement) up.open = true;
    up = up.parentElement;
  }
}

function useAnchorOpener() {
  useEffect(() => {
    openAnchor(window.location.hash);
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (a) openAnchor(a.getAttribute("href") ?? "");
    };
    const onHash = () => openAnchor(window.location.hash);
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
}

/** Put nav items in page order; items not listed keep their relative order at the end. */
function orderNav(nav: readonly NavItem[], order?: readonly string[]): NavItem[] {
  const items = [...nav];
  if (!order) return items;
  const rank = (href: string) => {
    const i = order.indexOf(href.replace(/^#/, ""));
    return i < 0 ? order.length : i;
  };
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => rank(a.item.href) - rank(b.item.href) || a.i - b.i)
    .map(({ item }) => item);
}

const ROOMS = [
  { id: "anshen", to: "/anshen" },
  { id: "jieyu", to: "/jieyu" },
  { id: "anmei", to: "/anmei" },
] as const;

function roomLabel(copy: ReturnType<typeof useCopy>, id: (typeof ROOMS)[number]["id"]) {
  if (id === "anshen") return copy.home.anshenT;
  if (id === "jieyu") return copy.home.jieyuT;
  return copy.home.anmeiT;
}

function RoomJump({
  theme,
  tone,
}: {
  theme: "anshen" | "jieyu" | "anmei";
  tone: "light" | "solid" | "footer";
}) {
  const copy = useCopy();
  const cls =
    tone === "footer"
      ? "inline-flex min-h-11 items-center rounded-full border border-mist/40 px-4 py-2 text-sm text-paper no-underline"
      : tone === "solid"
        ? "inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink no-underline"
        : "inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink no-underline shadow-sm";
  return (
    <>
      {ROOMS.filter((r) => r.id !== theme).map((r) => (
        <Link key={r.id} to={r.to} className={cls}>
          {roomLabel(copy, r.id)}
        </Link>
      ))}
    </>
  );
}

export function ClinicLayout({
  theme,
  title,
  kicker,
  lede,
  nav,
  bgSrc,
  children,
  footerName,
  footerNote,
  order,
}: {
  theme: "anshen" | "jieyu" | "anmei";
  title: string;
  kicker: string;
  lede: string;
  nav: readonly NavItem[];
  bgSrc: string;
  children: ReactNode;
  footerName: string;
  footerNote: string;
  /** Section ids in page order; the nav bar follows it and gains a "#breath" entry first. */
  order?: readonly string[];
}) {
  const copy = useCopy();
  const ui = copy.ui;
  useAnchorOpener();
  const navItems = orderNav(
    order?.includes("breath") && !nav.some((n) => n.href === "#breath")
      ? [{ href: "#breath", label: copy.play.breathNav }, ...nav]
      : nav,
    order,
  );
  const musicCredit =
    theme === "anshen"
      ? copy.anshen.musicCredit
      : theme === "jieyu"
        ? copy.jieyu.musicCredit
        : copy.anmei.musicCredit;
  return (
    <div data-theme={theme} className="min-h-screen bg-bg text-ink">
      <header className="relative flex min-h-[78vh] items-end overflow-hidden px-6 pb-16 pt-16 md:items-center md:px-10 md:pt-24">
        <img
          src={bgSrc}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-bg/85 via-bg/30 to-transparent md:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden bg-linear-to-r from-bg/60 via-bg/20 to-transparent md:block"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-5 py-2 text-sm text-ink no-underline shadow-sm"
            >
              {ui.back}
            </Link>
            <RoomJump theme={theme} tone="light" />
          </div>
          <p className="text-xs tracking-[0.28em] text-accent">{kicker}</p>
          <h1 className="mt-3 font-serif text-6xl font-semibold md:text-7xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink">{lede}</p>
          {order?.includes("breath") && (
            <a
              href="#breath"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-bg-deep px-6 py-3 text-base text-paper no-underline shadow-sm"
            >
              {copy.play.breathGo}
            </a>
          )}
          <div className="mt-8 max-w-xl">
            <DayGuide />
          </div>
        </div>
      </header>

      <nav
        className="sticky z-20 border-b border-line bg-bg/90 backdrop-blur-md"
        style={{ top: "var(--site-top)" }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-2 pr-28 md:px-10">
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-bg-deep px-4 py-2 text-sm text-paper no-underline"
            >
              {ui.back}
            </Link>
            <RoomJump theme={theme} tone="solid" />
          </div>
          <ul className="flex gap-5 overflow-x-auto py-1 text-sm whitespace-nowrap">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink no-underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CrayonFrame theme={theme}>
        <div className="px-6 md:px-10">{children}</div>
      </CrayonFrame>

      <footer className="mt-8 bg-bg-deep px-6 py-12 text-mist md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="font-serif font-semibold">{footerName}</p>
          <ClinicContact />
          <p className="mt-3 max-w-xl text-sm opacity-75">{footerNote}</p>
          <ViewCount page={theme} />
          <p className="mt-2 text-xs opacity-60">{musicCredit}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-full border border-mist/40 px-5 py-2 text-sm text-paper no-underline"
            >
              {ui.back}
            </Link>
            <RoomJump theme={theme} tone="footer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export function QuietPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-card border border-line">
      <img src={src} alt={alt} className="h-52 w-full object-cover md:h-72" />
    </figure>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
  collapsible = false,
  safety,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  /** Deeper reading: rendered (and prerendered) in full, but folded under its heading. */
  collapsible?: boolean;
  /** Safety / caution text of a folded section; always shown, never folded away. */
  safety?: ReactNode;
}) {
  if (collapsible)
    return (
      <FoldSection id={id} kicker={kicker} title={title} safety={safety}>
        {children}
      </FoldSection>
    );
  return (
    <section id={id} className="border-t border-line py-16">
      <p className="mb-2 text-xs tracking-[0.22em] text-accent">{kicker}</p>
      <h2 className="mb-4 font-serif text-3xl">{title}</h2>
      {children}
    </section>
  );
}

function FoldSection({
  id,
  kicker,
  title,
  children,
  safety,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  safety?: ReactNode;
}) {
  const ui = useCopy().ui;
  return (
    <section id={id} className="fold border-t border-line py-10">
      <details>
        <summary className="cursor-pointer list-none">
          <p className="mb-2 text-xs tracking-[0.22em] text-accent">{kicker}</p>
          <h2 className="font-serif text-3xl">{title}</h2>
          <p className="fold-hint mt-3 inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink">
            <span className="fold-open">{ui.expand}</span>
            <span className="fold-close">{ui.close}</span>
          </p>
        </summary>
        <div className="pt-4">{children}</div>
      </details>
      {safety && <div className="mt-5 text-sm text-muted">{safety}</div>}
    </section>
  );
}

export function CardGrid({
  items,
  extra,
}: {
  items: readonly { title: string; body: string }[];
  extra?: (index: number, title: string) => ReactNode;
}) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <article
          key={item.title}
          className="rounded-card border border-line bg-paper p-5"
        >
          <h3 className="font-serif text-lg">{item.title}</h3>
          <p className="mt-2 text-sm text-muted">{item.body}</p>
          {extra?.(i, item.title)}
        </article>
      ))}
    </div>
  );
}

export function GhostButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="min-h-11 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink"
    >
      {children}
    </button>
  );
}

export function SolidButton({
  children,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: {
  children: ReactNode;
  onClick?: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      className="min-h-11 rounded-full bg-bg-deep px-5 py-2.5 text-sm tracking-widest text-paper"
    >
      {children}
    </button>
  );
}
