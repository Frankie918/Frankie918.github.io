import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCopy, useLang } from "@/i18n/lang";
import { jieqiOf } from "@/lib/jieqi";
import { JIEQI_ARTICLES, JIEQI_FOOD } from "@/lib/jieqi-articles";
import { JieqiShareCard } from "@/components/jieqi-share-card";

export const Route = createFileRoute("/jieqi")({ component: JieqiPage });

function JieqiPage() {
  const copy = useCopy();
  const { lang } = useLang();
  const [han, setHan] = useState(() => {
    const d = new Date();
    return jieqiOf(d.getMonth() + 1, d.getDate(), "yue").han;
  });
  useEffect(() => {
    const d = new Date();
    setHan(jieqiOf(d.getMonth() + 1, d.getDate(), "yue").han);
  }, []);
  const art = JIEQI_ARTICLES[han];
  const A = art ? art[lang === "yue" ? "yue" : "cmn"] : null;
  const foodEntry = JIEQI_FOOD[han];
  const F = foodEntry ? foodEntry[lang === "yue" ? "yue" : "cmn"] : null;
  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-ink">
      <article className="mx-auto max-w-xl">
        <Link to="/" className="text-xs tracking-[0.22em] text-accent no-underline">
          {copy.ui.back}
        </Link>
        <p className="mt-10 text-xs tracking-[0.28em] text-accent">{lang === "yue" ? "節氣 · 形神" : "節氣 · 形神"}</p>
        {A && art ? (
          <>
            <h1 className="mt-3 font-serif text-4xl leading-snug">{A.title}</h1>
            {art.card ? <JieqiShareCard card={art.card} term={han} lang={lang} /> : null}
            <div className="mt-8 space-y-5 leading-relaxed">
              {A.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link to={art.room} className="mt-8 inline-block font-serif text-accent no-underline">
              {A.roomLine}
            </Link>
            <p className="mt-10 text-xs text-muted">{A.source}</p>
            {F ? (
              <section id="food" className="mt-14 border-t border-line pt-10">
                <p className="text-xs tracking-[0.28em] text-accent">{F.kicker}</p>
                <p className="mt-4 leading-relaxed">{F.intro}</p>
                {F.foods.map((f) => (
                  <div key={f.name} className="mt-6 rounded-card border border-line bg-paper p-5">
                    <h2 className="font-serif text-2xl">{f.name}</h2>
                    <blockquote className="mt-3 border-l-2 border-[#3F6B5C] pl-3 font-serif text-sm leading-relaxed">
                      {f.quote}
                    </blockquote>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.explain}</p>
                  </div>
                ))}
                <div className="mt-6 rounded-card border border-[#3F6B5C]/40 bg-[#3F6B5C]/[0.06] p-5">
                  <h2 className="font-serif text-2xl">{F.recipe.title}</h2>
                  <ul className="mt-3 space-y-1 text-sm">
                    {F.recipe.ingredients.map((x) => (
                      <li key={x}>· {x}</li>
                    ))}
                  </ul>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                    {F.recipe.steps.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted">{F.note}</p>
                <p className="mt-2 text-xs text-muted">{F.source}</p>
              </section>
            ) : null}
          </>
        ) : (
          <>
            <h1 className="mt-3 font-serif text-4xl">{han}</h1>
            <p className="mt-6 text-muted">{lang === "yue" ? "呢個節氣嘅短文整理緊。" : "這個節氣的短文整理中。"}</p>
          </>
        )}
      </article>
    </main>
  );
}
