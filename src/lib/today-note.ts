import { todayInMacau } from "@/lib/almanac";

export type RoomId = "anshen" | "jieyu" | "anmei" | "yali";

export type TodayNote = {
  breath?: number;
  hour?: string;
  scan?: string[];
  weather?: string;
  bloom?: number;
  diaryDays?: number;
  points?: string[];
  follow?: number[];
  play?: string[];
};

function key() {
  return `shenxin-note-${todayInMacau().key}`;
}

function empty(): Record<RoomId, TodayNote> {
  return { anshen: {}, jieyu: {}, anmei: {}, yali: {} };
}

export function loadNotes(): Record<RoomId, TodayNote> {
  try {
    const raw = localStorage.getItem(key());
    if (!raw) return empty();
    return { ...empty(), ...(JSON.parse(raw) as Record<RoomId, TodayNote>) };
  } catch {
    return empty();
  }
}

export function patchNote(room: RoomId, patch: Partial<TodayNote>) {
  const all = loadNotes();
  all[room] = { ...all[room], ...patch };
  try {
    localStorage.setItem(key(), JSON.stringify(all));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("shenxin-note"));
}

export function noteHas(n: TodayNote) {
  return Boolean(
    n.breath ||
      n.hour ||
      (n.scan && n.scan.length) ||
      n.weather ||
      n.bloom ||
      n.diaryDays ||
      (n.points && n.points.length) ||
      (n.follow && n.follow.length) ||
      (n.play && n.play.length),
  );
}
