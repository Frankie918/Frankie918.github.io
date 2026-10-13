import { BreathCircle } from "@/components/breath-circle";
import { ClinicCard } from "@/components/clinic-card";
import { HourLamp } from "@/components/hour-lamp";
import { Section } from "@/components/clinic-layout";
import type { RoomId } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

export function PlayBlock({ room }: { room: RoomId }) {
  const p = useCopy().play;
  return (
    <Section id="play" kicker={p.kicker} title={p.title}>
      <p className="text-muted">{p.lead}</p>
      <div className="mt-6 grid gap-4">
        <BreathCircle room={room} />
        <HourLamp room={room} />
        <ClinicCard room={room} />
      </div>
    </Section>
  );
}
