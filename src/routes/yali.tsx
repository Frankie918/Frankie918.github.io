import { createFileRoute, Link } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, Section } from "@/components/clinic-layout";
import { BodySignals, ColourHunt, FriendFlip, HandoverChecklist, MicroDraw, PressurePark, ShoulderDrop, SlowTrace, StandReset, TensionMap } from "@/components/yali-tools";
import { RoomMusicSection } from "@/components/room-music";
import { FollowLessons } from "@/components/follow-lessons";
import { BreathFirst, PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { useCopy, useLang } from "@/i18n/lang";
import { MUSIC_UI } from "@/lib/room-music";

export const Route = createFileRoute("/yali")({ component: YaliPage });

/**
 * 舒壓 · 壓力繃緊同身心反應. Same journey as the other rooms:
 * breathe first → follow along → self-help practice → play tools →
 * when to see a doctor (kept open, never folded) → deeper reading (folded).
 * Within-page de-duplication (2026-10): PressurePark is the single full
 * pressure-parking version, the timed ShoulderDrop is the canonical
 * shoulder sequence, the breath circle is the one full 吸4呼6 statement,
 * and 一日節奏 is folded like the other rooms' deeper sections.
 */
const ORDER = [
  "breath",
  "follow",
  "feel",
  "shoulder",
  "park",
  "playtools",
  "daily",
  "acu",
  "play",
  "music",
  "care",
  "view",
] as const;

function YaliPage() {
  const copy = useCopy();
  const { lang } = useLang();
  const c = copy.yali;
  const mui = MUSIC_UI[lang];
  return (
    <ClinicLayout
      theme="yali"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-yali.jpg?v=1"
      nav={c.nav}
      order={ORDER}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      <BreathFirst room="yali" />
      <FollowLessons room="yali" />

      <Section id="feel" fav="yali#feel" kicker={c.feelK} title={c.feelT}>
        <p className="text-muted">{c.feelLead}</p>
        <BodySignals />
      </Section>

      <Section id="shoulder" fav="yali#shoulder" kicker={c.shoulderK} title={c.shoulderT}>
        <p className="text-muted">{c.shoulderLead}</p>
        <p className="mt-2 text-sm text-muted">{c.shoulderPrep}</p>
        <ShoulderDrop />
      </Section>

      <Section id="park" fav="yali#park" kicker={c.parkK} title={c.parkT}>
        <p>{c.parkLead}</p>
        <PressurePark />
        <p className="mt-4 text-sm text-muted">{c.parkNote}</p>
      </Section>

      <Section id="playtools" kicker={c.play2K} title={c.play2T}>
        <p className="text-muted">{c.play2Lead}</p>
        <div className="mt-6 grid gap-10">
          <StandReset />
          <FriendFlip />
          <MicroDraw />
          <SlowTrace />
          <HandoverChecklist />
          <TensionMap />
          <ColourHunt />
        </div>
      </Section>

      <Section id="daily" kicker={c.dailyK} title={c.dailyT} collapsible safety={<p>{c.dailyLead}</p>}>
        <CardGrid items={c.daily} />
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT}>
        <p className="text-muted">{c.acuLead}</p>
        <PointMap room="yali" />
        <p className="mt-5 text-sm text-muted">{c.acuNote}</p>
      </Section>

      <PlayBlock room="yali" />

      <Section id="music" kicker={mui.sectionK} title={mui.sectionT}>
        <p className="text-muted">{mui.lead}</p>
        <RoomMusicSection />
      </Section>

      {/* Safety: always visible, never folded */}
      <Section id="care" kicker={c.careK} title={c.careT}>
        <p>{c.careLead}</p>
        <div className="mt-6 rounded-card border-2 border-accent bg-paper p-5">
          <h3 className="font-serif text-xl">{c.careNowT}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            {c.careNow.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 rounded-card border border-line bg-paper p-5">
          <h3 className="font-serif text-xl">{c.careSoonT}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {c.careSoon.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <p className="mt-5 text-ink">{c.careCrisis}</p>
        <p className="mt-3 text-sm text-muted">{c.careMeds}</p>
        <Link
          to="/"
          hash="booking"
          className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm text-paper no-underline"
        >
          {c.careBook}
        </Link>
      </Section>

      <Section id="view" kicker={c.viewK} title={c.viewT} collapsible>
        <p>{c.viewP1}</p>
        <p className="mt-3 text-muted">{c.viewP2}</p>
      </Section>
    </ClinicLayout>
  );
}
