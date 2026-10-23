import { BreathCircle } from "@/components/breath-circle";
import { ClinicCard } from "@/components/clinic-card";
import { HourLamp } from "@/components/hour-lamp";
import { Section } from "@/components/clinic-layout";
import type { RoomId } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

/**
 * First thing in every room: one simple breathing exercise (default rhythm in src/lib/breath.ts).
 * Moved here from PlayBlock in the 2026-10 reorganisation; same component, same saved state.
 */
export function BreathFirst({ room }: { room: RoomId }) {
  const p = useCopy().play;
  return (
    <Section id="breath" fav={`${room}#breath`} kicker={p.breathSecK} title={p.breathSecT}>
      <p className="text-muted">{p.breathSecLead}</p>
      <div className="mt-6">
        <BreathCircle room={room} />
      </div>
    </Section>
  );
}

export function PlayBlock({ room }: { room: RoomId }) {
  const p = useCopy().play;
  return (
    <Section id="play" kicker={p.kicker} title={p.title}>
      <p className="text-muted">{p.lead}</p>
      <div className="mt-6 grid gap-4">
        <a
          href="#breath"
          className="rounded-card border border-line bg-paper p-5 text-sm text-accent no-underline"
        >
          {p.breathMoved}
        </a>
        <HourLamp room={room} />
        <ClinicCard room={room} />
      </div>
    </Section>
  );
}
