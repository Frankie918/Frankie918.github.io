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
      <p className="mt-3 text-sm">
        <span className="mr-2 font-serif text-accent">{copy.play.jieqi}</span>
        {term.name}
        {lang === "en" ? <span className="text-muted"> · {term.han}</span> : null}
      </p>
      <p className="mt-1 text-sm text-muted">{term.act}</p>
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
