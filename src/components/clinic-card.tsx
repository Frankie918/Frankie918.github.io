import { useEffect, useState } from "react";
import { GhostButton } from "@/components/clinic-layout";
import { todayInMacau } from "@/lib/almanac";
import { loadNotes, noteHas, type RoomId, type TodayNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

function lines(
  n: TodayNote,
  p: ReturnType<typeof useCopy>["play"],
  title: string,
  followTitles: readonly string[],
  scanLabel: string = p.cardScan,
) {
  const out: string[] = [];
  if (n.breath) out.push(`${p.cardBreath}：${n.breath}`);
  if (n.hour) out.push(`${p.cardHour}：${n.hour}`);
  if (n.scan?.length) out.push(`${scanLabel}：${n.scan.join("、")}`);
  if (n.weather) out.push(`${p.cardWeather}：${n.weather}`);
  if (n.bloom) out.push(`${p.cardBloom}：${n.bloom}`);
  if (n.diaryDays) out.push(`${p.cardDiary}：${n.diaryDays}`);
  if (n.points?.length) out.push(`${p.cardPoints}：${n.points.join("、")}`);
  if (n.follow?.length) {
    const titles = n.follow.map((i) => followTitles[i]).filter(Boolean);
    if (titles.length) out.push(`${p.cardFollow}：${titles.join("、")}`);
  }
  if (!out.length) return "";
  const t = todayInMacau();
  return [`${title} · ${t.year}-${t.month}-${t.day}`, ...out, p.cardFoot].join("\n");
}

export function ClinicCard({ room }: { room: RoomId }) {
  const copy = useCopy();
  const p = copy.play;
  const title =
    room === "anshen"
      ? copy.anshen.title
      : room === "jieyu"
        ? copy.jieyu.title
        : room === "yali"
          ? copy.yali.title
          : copy.anmei.title;
  const followTitles = copy[room].follow.lessons.map((lesson) => lesson.title);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  function refresh() {
    const n = loadNotes()[room];
    // 舒壓 stores its body-signal picks in `scan`; label them as such on the card.
    const scanLabel = room === "yali" ? copy.yali.cardFeel : p.cardScan;
    setText(noteHas(n) ? lines(n, p, `${copy.ui.site} · ${title}`, followTitles, scanLabel) : "");
  }

  useEffect(() => {
    refresh();
    window.addEventListener("shenxin-note", refresh);
    return () => window.removeEventListener("shenxin-note", refresh);
  }, [room, copy.ui.site, title]);

  return (
    <div className="rounded-card border border-line bg-paper p-6">
      <p className="text-xs tracking-[0.22em] text-accent">{p.cardK}</p>
      <h3 className="mt-2 font-serif text-2xl">{p.cardT}</h3>
      <p className="mt-2 text-sm text-muted">{p.cardLead}</p>
      {text ? (
        <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-bg p-4 text-sm leading-relaxed">{text}</pre>
      ) : (
        <p className="mt-4 text-sm text-muted">{p.cardEmpty}</p>
      )}
      {text ? (
        <div className="mt-4">
          <GhostButton
            onClick={() => {
              void navigator.clipboard?.writeText(text).then(() => setCopied(true));
            }}
          >
            {copied ? p.cardCopied : p.cardCopy}
          </GhostButton>
        </div>
      ) : null}
    </div>
  );
}
