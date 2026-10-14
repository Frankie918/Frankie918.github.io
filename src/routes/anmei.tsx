import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, QuietPhoto, Section } from "@/components/clinic-layout";
import { HygieneList, MythFlip, SleepDiary, SleepQuiz } from "@/components/anmei-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { useCopy } from "@/i18n/lang";
import { AcuCloseUp } from "@/components/acu-figure";

const PRESS_IDS = ["shenmen", "neiguan", "sanyinjiao", "yongquan"];

export const Route = createFileRoute("/anmei")({ component: AnmeiPage });

function AnmeiPage() {
  const c = useCopy().anmei;
  return (
    <ClinicLayout
      theme="anmei"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-anmei.jpg"
      nav={c.nav}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      <Section id="view" kicker={c.viewK} title={c.viewT}>
        <p>{c.viewP1}</p>
        <p className="mt-3 text-muted">{c.viewP2}</p>
        <QuietPhoto src="/still-anmei.jpg" alt={c.photo} />
        <CardGrid items={c.soils} />
      </Section>

      <Section id="quiz" kicker={c.quizK} title={c.quizT}>
        <p className="text-muted">{c.quizLead}</p>
        <SleepQuiz />
      </Section>

      <Section id="myths" kicker={c.mythsK} title={c.mythsT}>
        <p className="text-muted">{c.mythsLead}</p>
        <MythFlip />
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
        <CardGrid
          items={c.press}
          extra={(i, t) => <AcuCloseUp id={PRESS_IDS[i] ?? ""} name={t} />}
        />
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT}>
        <p>{c.acuP}</p>
        <PointMap room="anmei" />
        <CardGrid items={c.acuItems} />
        <p className="mt-5 text-muted">{c.acuNote}</p>
      </Section>

      <FollowLessons room="anmei" />

      <PlayBlock room="anmei" />

      <Section id="diary" kicker={c.diaryK} title={c.diaryT}>
        <SleepDiary />
      </Section>
    </ClinicLayout>
  );
}
