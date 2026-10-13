import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCopy, useLang } from "@/i18n/lang";
import { jieqiOf } from "@/lib/jieqi";
import { JIEQI_ARTICLES } from "@/lib/jieqi-articles";

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
            <div className="mt-8 space-y-5 leading-relaxed">
              {A.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link to={art.room} className="mt-8 inline-block font-serif text-accent no-underline">
              {A.roomLine}
            </Link>
            <p className="mt-10 text-xs text-muted">{A.source}</p>
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
