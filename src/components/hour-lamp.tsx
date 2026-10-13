import { useMemo, useState } from "react";
import { patchNote, type RoomId } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

function macauHour() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Macau",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  return Number(parts.find((p) => p.type === "hour")?.value ?? 0);
}

function clock(start: number, end: number) {
  const pad = (n: number) => `${String(n).padStart(2, "0")}:00`;
  return `${pad(start)}–${pad(end)}`;
}

function inSlot(hour: number, start: number, end: number) {
  if (start < end) return hour >= start && hour < end;
  return hour >= start || hour < end;
}

export function HourLamp({ room }: { room: RoomId }) {
  const p = useCopy().play;
  const pack = p.hours[room];
  const hour = useMemo(() => macauHour(), []);
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="rounded-card border border-line bg-paper p-6">
      <p className="text-xs tracking-[0.22em] text-accent">{pack.kicker}</p>
      <h3 className="mt-2 font-serif text-2xl">{pack.title}</h3>
      <p className="mt-2 text-sm text-muted">{pack.lead}</p>
      <div className="mt-5 grid gap-2.5">
        {pack.slots.map((slot, i) => {
          const now = inSlot(hour, slot.start, slot.end);
          const on = picked === i;
          return (
            <button
              key={slot.name}
              type="button"
              onClick={() => {
                setPicked(i);
                patchNote(room, { hour: `${slot.name} ${clock(slot.start, slot.end)} · ${slot.line}` });
              }}
              className={`rounded-xl border px-4 py-3 text-left ${
                on || now ? "border-accent bg-bg" : "border-line bg-paper"
              }`}
            >
              <p className="font-serif">
                {slot.name}
                <span className="ml-2 font-sans text-sm tracking-normal text-muted">
                  {clock(slot.start, slot.end)}
                </span>
                {now ? <span className="ml-2 text-xs tracking-[0.16em] text-accent">{p.hourNow}</span> : null}
              </p>
              <p className="mt-1 text-sm text-muted">{slot.line}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
