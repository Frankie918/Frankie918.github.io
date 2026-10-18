import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, QuietPhoto, Section } from "@/components/clinic-layout";
import { HygieneList, MythFlip, SleepDiary, SleepQuiz } from "@/components/anmei-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { BreathFirst, PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { AcuPressGrid } from "@/components/acu-info";
import { useCopy, useLang } from "@/i18n/lang";
import { RoomMusicSection } from "@/components/room-music";
import { MUSIC_UI } from "@/lib/room-music";

export const Route = createFileRoute("/anmei")({ component: AnmeiPage });

/**
 * Patient journey (2026-10): breathe first → follow along → tonight's practice → deeper reading.
 * Section ids are unchanged: the sleep quiz still links #cbti / #hygiene / #yangsheng / #view
 * (folded sections open automatically), and anmei-diary-v1 storage is untouched.
 */
const ORDER = [
  "breath",
  "follow",
  "quiz",
  "cbti",
  "hygiene",
  "yangsheng",
  "diary",
  "play",
  "myths",
  "view",
  "acu",
  "music",
] as const;

function AnmeiPage() {
  const c = useCopy().anmei;
  const mui = MUSIC_UI[useLang().lang];
  return (
    <ClinicLayout
      theme="anmei"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-anmei.jpg?v=4"
      nav={c.nav}
      order={ORDER}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      {/* 1 · one simple breathing exercise */}
      <BreathFirst room="anmei" />

      {/* 2 · guided step-by-step */}
      <FollowLessons room="anmei" />

      {/* 3 · tonight's practice */}
      <Section id="quiz" kicker={c.quizK} title={c.quizT}>
        <p className="text-muted">{c.quizLead}</p>
        <SleepQuiz />
      </Section>

      <Section id="cbti" kicker={c.cbtiK} title={c.cbtiT}>
        <p>{c.cbtiP}</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
          {c.cbtiSteps.map(([strong, rest]) => (
            <li key={strong}>
              <strong className="text-ink">{strong}</strong>
              {rest}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{c.cbtiNote}</p>
      </Section>

      <Section id="hygiene" kicker={c.hyK} title={c.hyT}>
        <p>{c.hyP1}</p>
        <p className="mt-3 text-muted">{c.hyP2}</p>
        <HygieneList />
      </Section>

      <Section id="yangsheng" kicker={c.ysK} title={c.ysT}>
        <p className="text-muted">{c.ysLead}</p>
        <CardGrid items={c.ys} />
        <h3 className="mt-8 font-serif text-xl">{c.pressT}</h3>
        <p className="mt-2 text-sm text-muted">{c.pressLead}</p>
        <AcuPressGrid items={c.press} />
      </Section>

      <Section id="diary" kicker={c.diaryK} title={c.diaryT}>
        <SleepDiary />
      </Section>

      <PlayBlock room="anmei" />

      {/* 4 · deeper reading */}
      <Section id="myths" kicker={c.mythsK} title={c.mythsT}>
        <p className="text-muted">{c.mythsLead}</p>
        <MythFlip />
      </Section>

      <Section id="view" kicker={c.viewK} title={c.viewT} collapsible safety={<p>{c.viewP2}</p>}>
        <p>{c.viewP1}</p>
        <QuietPhoto src="/still-anmei.jpg?v=4" alt={c.photo} />
        <CardGrid items={c.soils} />
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT} collapsible safety={<p>{c.acuNote}</p>}>
        <p>{c.acuP}</p>
        <PointMap room="anmei" />
        <CardGrid items={c.acuItems} />
      </Section>

      <Section id="music" kicker={mui.sectionK} title={mui.sectionT}>
        <p className="text-muted">{mui.lead}</p>
        <RoomMusicSection />
      </Section>
    </ClinicLayout>
  );
}
