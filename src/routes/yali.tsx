import { createFileRoute, Link } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, Section } from "@/components/clinic-layout";
import { BodySignals, CalmMusic, PressurePark, ShoulderDrop } from "@/components/yali-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { BreathFirst, PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/yali")({ component: YaliPage });

/**
 * 鬆弦 · 壓力繃緊同身心反應 (2026-10 draft for clinician review).
 * Same journey as 安神／解鬱／安寐: breathe first → follow along → self-help practice →
 * when to see a doctor (kept open, never folded) → deeper reading (folded).
 */
const ORDER = [
  "breath",
  "follow",
  "feel",
  "shoulder",
  "park",
  "daily",
  "acu",
  "play",
  "music",
  "care",
  "view",
] as const;

function YaliPage() {
  const copy = useCopy();
  const c = copy.yali;
  return (
    <ClinicLayout
      theme="yali"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-home.jpg?v=4"
      nav={c.nav}
      order={ORDER}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      {/* 1 · one simple breathing exercise (site standard rhythm) */}
      <BreathFirst room="yali" />

      {/* 2 · guided step-by-step */}
      <FollowLessons room="yali" />

      {/* 3 · self-help practice */}
      <Section id="feel" kicker={c.feelK} title={c.feelT}>
        <p className="text-muted">{c.feelLead}</p>
        <BodySignals />
      </Section>

      <Section id="shoulder" kicker={c.shoulderK} title={c.shoulderT}>
        <p className="text-muted">{c.shoulderLead}</p>
        <p className="mt-2 text-sm text-muted">{c.shoulderPrep}</p>
        <ShoulderDrop />
      </Section>

      <Section id="park" kicker={c.parkK} title={c.parkT}>
        <p>{c.parkLead}</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
          {c.parkSteps.map(([strong, rest]) => (
            <li key={strong}>
              <strong className="text-ink">{strong}</strong>
              {rest}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{c.parkNote}</p>
        <PressurePark />
      </Section>

      <Section id="daily" kicker={c.dailyK} title={c.dailyT}>
        <p className="text-muted">{c.dailyLead}</p>
        <CardGrid items={c.daily} />
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT}>
        <p className="text-muted">{c.acuLead}</p>
        <PointMap room="yali" />
        <p className="mt-5 text-sm text-muted">{c.acuNote}</p>
      </Section>

      <PlayBlock room="yali" />

      <Section id="music" kicker={c.musicK} title={c.musicT}>
        <p className="text-muted">{c.musicLead}</p>
        <CalmMusic />
      </Section>

      {/* 4 · safety: always visible */}
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

      {/* 5 · deeper reading, folded but fully present */}
      <Section id="view" kicker={c.viewK} title={c.viewT} collapsible>
        <p>{c.viewP1}</p>
        <p className="mt-3 text-muted">{c.viewP2}</p>
      </Section>
    </ClinicLayout>
  );
}
