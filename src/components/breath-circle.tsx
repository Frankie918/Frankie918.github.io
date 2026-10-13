import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { patchNote, type RoomId } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

const IN = 4000;
const OUT = 6000;
const ROUNDS = 3;

export function BreathCircle({ room }: { room: RoomId }) {
  const p = useCopy().play;
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [round, setRound] = useState(0);
  const [done, setDone] = useState(false);
  const t = useRef<number | null>(null);

  function clear() {
    if (t.current) window.clearTimeout(t.current);
    t.current = null;
  }

  function stop() {
    clear();
    setOn(false);
    setPhase("in");
  }

  function start() {
    clear();
    setDone(false);
    setOn(true);
    setRound(1);
    setPhase("in");
  }

  useEffect(() => {
    if (!on) return;
    const wait = phase === "in" ? IN : OUT;
    t.current = window.setTimeout(() => {
      if (phase === "in") {
        setPhase("out");
        return;
      }
      if (round >= ROUNDS) {
        setOn(false);
        setDone(true);
        setPhase("in");
        patchNote(room, { breath: ROUNDS });
        return;
      }
      setRound((n) => n + 1);
      setPhase("in");
    }, wait);
    return clear;
  }, [on, phase, round, room]);

  return (
    <div className="rounded-card border border-line bg-paper p-6 text-center">
      <div className="breath-orb mx-auto" data-phase={on ? phase : "idle"} />
      <p className="mt-4 font-serif text-xl">
        {!on ? (done ? p.breathDone : p.breathIdle) : phase === "in" ? p.breathIn : p.breathOut}
      </p>
      <p className="mt-1 text-xs tracking-[0.18em] text-muted">
        {on ? `${round} / ${ROUNDS}` : p.breathHint}
      </p>
      <div className="mt-5">
        {on ? (
          <GhostButton onClick={stop}>{p.breathStop}</GhostButton>
        ) : (
          <SolidButton onClick={start}>{p.breathStart}</SolidButton>
        )}
      </div>
    </div>
  );
}
