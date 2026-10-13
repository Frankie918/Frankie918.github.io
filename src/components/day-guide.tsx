import { Link } from "@tanstack/react-router";
import { todayInMacau } from "@/lib/almanac";
import { jieqiOf } from "@/lib/jieqi";
import { useCopy, useLang } from "@/i18n/lang";

export function DayGuide() {
  const copy = useCopy();
  const { lang } = useLang();
  const t = todayInMacau();
  const entry = copy.almanac[t.index] ?? copy.almanac[0];
  const label = copy.date(t.year, t.month, t.day, copy.week[t.weekday] ?? "");
  const term = jieqiOf(t.month, t.day, lang);

  return (
    <div className="rounded-card border border-line bg-paper p-6">
      <p className="text-xs tracking-[0.22em] text-accent">{copy.ui.today}</p>
      <p className="mt-2 font-serif text-2xl">{label}</p>
      <Link
        to="/jieqi"
        className="mt-4 block rounded-card border border-[#3F6B5C]/40 bg-[#3F6B5C]/[0.06] p-5 text-ink no-underline transition-colors hover:bg-[#3F6B5C]/[0.1]"
      >
        <p className="text-xs tracking-[0.22em] text-[#3F6B5C]">{copy.play.jieqi}</p>
        <p className="mt-1 font-serif text-4xl">
          {term.name}
          {lang === "en" ? <span className="ml-2 text-lg text-muted">{term.han}</span> : null}
        </p>
        <p className="mt-2 text-sm text-muted">{term.act}</p>
        <p className="mt-3 text-sm text-[#3F6B5C]">
          {lang === "yue"
            ? `撳入去睇${term.han}點養心 →`
            : lang === "cmn"
              ? `點進去看${term.han}怎樣養心 →`
              : `Read about ${term.name} →`}
        </p>
      </Link>
      <p className="mt-5 text-sm">
        <span className="mr-3 inline-block rounded-sm bg-[#3F6B5C] px-1.5 py-0.5 font-serif text-[#F3EEE4]">{copy.ui.yi}</span>
        {entry.yi}
      </p>
      <p className="mt-3 text-sm">
        <span className="mr-3 inline-block rounded-sm bg-[#1A2834] px-1.5 py-0.5 font-serif text-[#F3EEE4]">{copy.ui.ji}</span>
        {entry.ji}
      </p>
    </div>
  );
}
