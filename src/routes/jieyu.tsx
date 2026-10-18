import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, QuietPhoto, Section } from "@/components/clinic-layout";
import { BaPlanner, WeatherPick, WoodSteps } from "@/components/jieyu-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { BreathFirst, PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { RoomMusicSection } from "@/components/room-music";
import { MUSIC_UI } from "@/lib/room-music";
import { useLang } from "@/i18n/lang";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/jieyu")({ component: JieyuPage });

/**
 * Patient journey (2026-10): breathe first → follow along → small steps → deeper reading.
 * Section ids are unchanged so old links and saved progress (jieyu-bloom-*) keep working.
 */
const ORDER = ["breath", "follow", "steps", "ba", "weather", "play", "music", "view", "types", "acu", "daily"] as const;

function JieyuPage() {
  const c = useCopy().jieyu;
  const mui = MUSIC_UI[useLang().lang];
  return (
    <ClinicLayout
      theme="jieyu"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-jieyu.jpg?v=4"
      nav={c.nav}
      order={ORDER}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      {/* 1 · one simple breathing exercise */}
      <BreathFirst room="jieyu" />

      {/* 2 · guided step-by-step */}
      <FollowLessons room="jieyu" />

      {/* 3 · self-help practice */}
      <Section id="steps" kicker={c.stepsK} title={c.stepsT}>
        <p className="text-muted">{c.stepsLead}</p>
        <WoodSteps />
      </Section>

      <Section id="ba" kicker={c.baK} title={c.baT}>
        <p>{c.baLead}</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
          {c.baSteps.map(([strong, rest]) => (
            <li key={strong}>
              <strong className="text-ink">{strong}</strong>
              {rest}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{c.baNote}</p>
        <h3 className="mt-8 font-serif text-xl">{c.baToday}</h3>
        <BaPlanner />
      </Section>

      <Section id="weather" kicker={c.weatherK} title={c.weatherT}>
        <p className="text-muted">{c.weatherLead}</p>
        <WeatherPick />
      </Section>

      <PlayBlock room="jieyu" />

      <Section id="music" kicker={mui.sectionK} title={mui.sectionT}>
        <p className="text-muted">{mui.lead}</p>
        <RoomMusicSection />
      </Section>

      {/* 4 · deeper reading, folded but fully present */}
      <Section id="view" kicker={c.viewK} title={c.viewT} collapsible safety={<p>{c.viewP2}</p>}>
        <p>{c.viewP1}</p>
        <QuietPhoto src="/still-jieyu.jpg?v=4" alt={c.photo} />
      </Section>

      <Section id="types" kicker={c.typesK} title={c.typesT} collapsible>
        <CardGrid items={c.types} />
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT} collapsible safety={<p>{c.acuNote}</p>}>
        <p>{c.acuP}</p>
        <PointMap room="jieyu" />
        <CardGrid items={c.acuItems} />
      </Section>

      <Section id="daily" kicker={c.dailyK} title={c.dailyT} collapsible>
        <CardGrid items={c.daily} />
      </Section>
    </ClinicLayout>
  );
}
