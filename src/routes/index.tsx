import { createFileRoute, Link } from "@tanstack/react-router";
import { ClinicContact } from "@/components/clinic-contact";
import { CrayonFrame } from "@/components/crayon-margin";
import { DayGuide } from "@/components/day-guide";
import { MonthlyPracticeCard } from "@/components/monthly-practice";
import { useEffect, useState } from "react";
import { jieqiOf } from "@/lib/jieqi";
import { JIEQI_ARTICLES } from "@/lib/jieqi-articles";
import { ViewCount } from "@/components/view-count";
import { useCopy, useLang } from "@/i18n/lang";

export const Route = createFileRoute("/")({ component: Home });

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
          src="/bg-home.jpg?v=3"
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
          <p className="text-xs tracking-[0.32em] text-accent">{home.kicker}</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold md:text-8xl">{ui.site}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink">{home.lede}</p>
          <div className="mt-8 max-w-xl">
            <DayGuide />
          </div>
        </div>
      </header>

      <CrayonFrame theme="home">
      <section className="px-6 pb-16 md:px-12">
        <p className="text-xs tracking-[0.22em] text-accent">{home.aboutK}</p>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{home.aboutT}</h2>
        <p className="mt-4 text-ink">{home.aboutLead}</p>
        <p className="mt-3 text-muted">{home.aboutBody}</p>

        <p className="mt-12 text-xs tracking-[0.22em] text-accent">{home.illnessK}</p>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{home.illnessT}</h2>
        <p className="mt-4 text-ink">{home.illnessLead}</p>
        <p className="mt-3 text-muted">{home.illnessBody}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {[home.illnessA, home.illnessB, home.illnessC].map((item) => (
            <li
              key={item}
              className="rounded-card border border-line bg-paper px-4 py-4 text-sm text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 px-6 pb-20 md:grid-cols-3 md:px-12">
        <Link
          to="/anshen"
          className="group overflow-hidden rounded-card border border-line bg-paper no-underline text-ink"
        >
          <img src="/bg-anshen.jpg?v=3" alt="" className="h-36 w-full object-cover" />
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
          <img src="/bg-jieyu.jpg?v=3" alt="" className="h-36 w-full object-cover" />
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
          <img src="/bg-anmei.jpg" alt="" className="h-36 w-full object-cover" />
          <div className="p-6">
            <p className="text-xs tracking-[0.22em] text-accent">{home.anmeiK}</p>
            <h2 className="mt-2 font-serif text-4xl">{home.anmeiT}</h2>
            <p className="mt-3 text-sm text-muted">{home.anmeiD}</p>
            <p className="mt-6 text-sm text-accent">{home.anmeiGo}</p>
          </div>
        </Link>
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
          <Link to="/faq" className="flex flex-col rounded-card border border-line bg-paper p-7 text-ink no-underline">
            <p className="text-xs tracking-[0.22em] text-accent">{lang === "yue" ? "常見問題" : "常見問題"}</p>
            <h2 className="mt-2 font-serif text-2xl">{lang === "yue" ? "第一次面診之前" : "第一次面診之前"}</h2>
            <img src="/faq-tea.webp" alt="" loading="lazy" className="mx-auto my-auto w-4/5 max-w-72 py-4 mix-blend-multiply" />
            <p className="mt-4 text-sm text-accent">{lang === "yue" ? "睇問與答 →" : "看問與答 →"}</p>
          </Link>
          <MonthlyPracticeCard />
        </div>
      </section>

      </CrayonFrame>

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
