import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/lang";
import { practiceForMonth } from "@/lib/monthly-practice";

declare global {
  interface Window {
    goatcounter?: { count?: (o: { path: string; title?: string; event?: boolean }) => void };
  }
}

const KEY = "shenxin-practice-done";

function localDate() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return { month: d.getMonth() + 1, ym: `${d.getFullYear()}-${p(d.getMonth() + 1)}`, ymd: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` };
}

const T = {
  yue: { k: "本月小練習", start: "開始", stop: "停", left: "仲有", sec: "秒", finished: "完成，慢慢返嚟。", done: "今日做咗", doneMark: "✓ 今日已做", room: "去相關房間 →", min: "約" },
  cmn: { k: "本月小練習", start: "開始", stop: "停", left: "還有", sec: "秒", finished: "完成，慢慢回來。", done: "今天做了", doneMark: "✓ 今天已做", room: "去相關房間 →", min: "約" },
  en: { k: "This month’s practice", start: "Start", stop: "Stop", left: "", sec: "s left", finished: "Done. Come back slowly.", done: "Done today", doneMark: "✓ Done today", room: "Go to the room →", min: "about" },
};

export function MonthlyPracticeCard() {
  const { lang } = useLang();
  const [date, setDate] = useState<ReturnType<typeof localDate> | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [doneToday, setDoneToday] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const d = localDate();
    setDate(d);
    try {
      setDoneToday(localStorage.getItem(KEY) === d.ymd);
    } catch {
      /* ignore */
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const p = practiceForMonth(date?.month ?? 10);
  const text = p[lang];
  const t = T[lang];

  function start() {
    if (timer.current) window.clearInterval(timer.current);
    setLeft(p.seconds);
    timer.current = window.setInterval(() => {
      setLeft((s) => {
        if (s === null || s <= 1) {
          if (timer.current) window.clearInterval(timer.current);
          timer.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function stop() {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setLeft(null);
  }

  function markDone() {
    const d = date ?? localDate();
    try {
      localStorage.setItem(KEY, d.ymd);
    } catch {
      /* ignore */
    }
    setDoneToday(true);
    try {
      window.goatcounter?.count?.({ path: `practice-done-${d.ym}`, title: "practice done", event: true });
    } catch {
      /* ignore */
    }
  }

  const running = left !== null && left > 0;
  const mins = Math.max(1, Math.round(p.seconds / 60));
  const pct = left !== null ? (left / p.seconds) * 100 : 100;

  return (
    <div className="rounded-card border border-line bg-paper p-7 text-ink md:col-span-2">
      <p className="text-xs tracking-[0.22em] text-accent">
        {t.k} · {t.min} {mins} {lang === "en" ? "min" : "分鐘"}
      </p>
      <h2 className="mt-2 font-serif text-2xl">{text.title}</h2>
      <p className="mt-3 text-sm text-muted">{text.why}</p>
      <ol className="mt-5 space-y-2 text-sm leading-relaxed">
        {text.steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-accent">{i + 1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      {left !== null && (
        <div className="mt-6" aria-live="polite">
          <div className="practice-bar" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">
            {left > 0 ? `${t.left} ${left} ${t.sec}`.trim() : t.finished}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        {running ? (
          <button type="button" onClick={stop} className="rounded-full border border-line px-5 py-2 text-accent">
            {t.stop}
          </button>
        ) : (
          <button type="button" onClick={start} className="rounded-full border border-accent px-5 py-2 text-accent">
            {t.start}
          </button>
        )}
        {doneToday ? (
          <span className="text-muted">{t.doneMark}</span>
        ) : (
          <button type="button" onClick={markDone} className="rounded-full border border-line px-5 py-2 text-ink">
            {t.done}
          </button>
        )}
        {p.room && (
          <Link to={p.room} className="text-accent no-underline">
            {t.room}
          </Link>
        )}
      </div>
    </div>
  );
}
