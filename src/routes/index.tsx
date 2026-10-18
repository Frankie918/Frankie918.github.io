import { createFileRoute, Link } from "@tanstack/react-router";
import { ClinicContact } from "@/components/clinic-contact";
import { BookingCard } from "@/components/booking-card";
import { CrayonFrame } from "@/components/crayon-margin";
import { DayGuide } from "@/components/day-guide";
import { MonthlyPracticeCard } from "@/components/monthly-practice";
import { useEffect, useState } from "react";
import { jieqiOf } from "@/lib/jieqi";
import { JIEQI_ARTICLES } from "@/lib/jieqi-articles";
import { ViewCount } from "@/components/view-count";
import { useCopy, useLang } from "@/i18n/lang";

export const Route = createFileRoute("/")({ component: Home });

/** First-screen guide by feeling: straight into a room, landing on its breathing exercise. */
function FeelingPick() {
  const { home } = useCopy();
  const picks = [
    { to: "/anshen", label: home.feelAnshen, room: home.anshenT },
    { to: "/jieyu", label: home.feelJieyu, room: home.jieyuT },
    { to: "/anmei", label: home.feelAnmei, room: home.anmeiT },
    { to: "/yali", label: home.feelYali, room: home.yaliT },
  ] as const;
  return (
    <nav aria-label={home.feelK} className="mt-7 max-w-xl">
      <p className="font-serif text-xl text-ink">{home.feelK}</p>
      <p className="mt-1 text-sm text-muted">{home.feelLead}</p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {picks.map((p) => (
          <li key={p.to}>
            <Link
              to={p.to}
              hash="breath"
              className="flex min-h-14 items-center justify-between gap-2 rounded-card border border-line bg-paper px-4 py-3 text-ink no-underline shadow-sm"
            >
              <span className="font-serif text-lg">{p.label}</span>
              <span className="shrink-0 text-xs tracking-[0.16em] text-accent">{p.room} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Home() {
  const copy = useCopy();
  const { lang } = useLang();
  const [termCard, setTermCard] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    setTermCard(JIEQI_ARTICLES[jieqiOf(d.getMonth() + 1, d.getDate(), "yue").han]?.card ?? null);
  }, []);
  const { ui, home } = copy;
  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pt-20 pb-16 md:items-center md:px-12 md:pt-28">
        <img
          src="/bg-home.jpg?v=4"
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
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-bg" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <p className="text-xs tracking-[0.32em] text-accent">{home.kicker}</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold md:text-8xl">{ui.site}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink">{home.lede}</p>
          <FeelingPick />
          <div className="mt-8 max-w-xl">
            <DayGuide />
          </div>
        </div>
      </header>

      <CrayonFrame theme="home">
      <section id="rooms" className="grid gap-4 px-6 pb-16 md:grid-cols-2 md:px-12">
        <Link
          to="/anshen"
          className="group overflow-hidden rounded-card border border-line bg-paper no-underline text-ink"
        >
          <img src="/bg-anshen.jpg?v=4" alt="" className="h-36 w-full object-cover" />
          <div className="p-6">
            <p className="text-xs tracking-[0.22em] text-accent">{home.anshenK}</p>
            <h2 className="mt-2 font-serif text-4xl">{home.anshenT}</h2>
            <p className="mt-3 text-sm text-muted">{home.anshenD}</p>
            <p className="mt-6 text-sm text-accent">{home.anshenGo}</p>
          </div>
        </Link>
        <Link
          to="/jieyu"
          className="group overflow-hidden rounded-card border border-line bg-paper no-underline text-ink"
        >
          <img src="/bg-jieyu.jpg?v=4" alt="" className="h-36 w-full object-cover" />
          <div className="p-6">
            <p className="text-xs tracking-[0.22em] text-accent">{home.jieyuK}</p>
            <h2 className="mt-2 font-serif text-4xl">{home.jieyuT}</h2>
            <p className="mt-3 text-sm text-muted">{home.jieyuD}</p>
            <p className="mt-6 text-sm text-accent">{home.jieyuGo}</p>
          </div>
        </Link>
        <Link
          to="/anmei"
          className="group overflow-hidden rounded-card border border-line bg-paper no-underline text-ink"
        >
          <img src="/bg-anmei.jpg?v=4" alt="" className="h-36 w-full object-cover" />
          <div className="p-6">
            <p className="text-xs tracking-[0.22em] text-accent">{home.anmeiK}</p>
            <h2 className="mt-2 font-serif text-4xl">{home.anmeiT}</h2>
            <p className="mt-3 text-sm text-muted">{home.anmeiD}</p>
            <p className="mt-6 text-sm text-accent">{home.anmeiGo}</p>
          </div>
        </Link>
        <Link
          to="/yali"
          className="group overflow-hidden rounded-card border border-line bg-paper no-underline text-ink"
        >
          <img src="/bg-yali.jpg?v=1" alt="" className="h-36 w-full object-cover" />
          <div className="p-6">
            <p className="text-xs tracking-[0.22em] text-accent">{home.yaliK}</p>
            <h2 className="mt-2 font-serif text-4xl">{home.yaliT}</h2>
            <p className="mt-3 text-sm text-muted">{home.yaliD}</p>
            <p className="mt-6 text-sm text-accent">{home.yaliGo}</p>
          </div>
        </Link>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <p className="text-xs tracking-[0.22em] text-accent">{home.aboutK}</p>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{home.aboutT}</h2>
        <p className="mt-4 text-ink">{home.aboutLead}</p>
        <p className="mt-3 text-muted">{home.aboutBody}</p>

        <p className="mt-12 text-xs tracking-[0.22em] text-accent">{home.illnessK}</p>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{home.illnessT}</h2>
        <p className="mt-4 text-ink">{home.illnessLead}</p>
        <p className="mt-3 text-muted">{home.illnessBody}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {[home.illnessA, home.illnessB, home.illnessC, home.illnessD].map((item) => (
            <li
              key={item}
              className="rounded-card border border-line bg-paper px-4 py-4 text-sm text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>


      <section className="px-6 pb-8 md:px-12">
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/jieqi" className="rounded-card border border-line bg-paper p-7 text-ink no-underline">
            {termCard ? (
              <picture>
                <source srcSet={`${termCard}.webp`} type="image/webp" />
                <img src={`${termCard}.jpg`} alt="" loading="lazy" className="mb-5 aspect-video w-full rounded-card border border-line object-cover" />
              </picture>
            ) : null}
            <p className="text-xs tracking-[0.22em] text-accent">節氣 · 形神</p>
            <h2 className="mt-2 font-serif text-2xl">{lang === "yue" ? "呢個節氣，心點過" : "這個節氣，心怎麼過"}</h2>
            <p className="mt-4 text-sm text-accent">{lang === "yue" ? "睇節氣短文 →" : "看節氣短文 →"}</p>
          </Link>
          <Link to="/faq" className="rounded-card border border-line bg-paper p-7 text-ink no-underline">
            <img src="/faq-tea-2.webp" alt="" loading="lazy" className="mb-5 aspect-video w-full rounded-card border border-line object-cover" />
            <p className="text-xs tracking-[0.22em] text-accent">{lang === "yue" ? "常見問題" : "常見問題"}</p>
            <h2 className="mt-2 font-serif text-2xl">{lang === "yue" ? "第一次面診之前" : "第一次面診之前"}</h2>
            <p className="mt-4 text-sm text-accent">{lang === "yue" ? "睇問與答 →" : "看問與答 →"}</p>
          </Link>
          <MonthlyPracticeCard />
        </div>
      </section>

      </CrayonFrame>

      <BookingCard />

      <footer className="bg-bg-deep px-6 py-10 text-sm text-mist md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="font-serif font-semibold">{ui.site}</p>
          <ClinicContact />
          <p className="mt-3 opacity-80">{ui.footerHome}</p>
          <ViewCount page="home" />
          <p className="mt-3 opacity-70">{ui.musicCredit}</p>
        </div>
      </footer>
    </main>
  );
}
