import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, QuietPhoto, Section } from "@/components/clinic-layout";
import { BaPlanner, WeatherPick, WoodSteps } from "@/components/jieyu-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/jieyu")({ component: JieyuPage });

function JieyuPage() {
  const c = useCopy().jieyu;
  return (
    <ClinicLayout
      theme="jieyu"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-jieyu.jpg?v=4"
      nav={c.nav}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      <Section id="view" kicker={c.viewK} title={c.viewT}>
        <p>{c.viewP1}</p>
        <p className="mt-3 text-muted">{c.viewP2}</p>
        <QuietPhoto src="/still-jieyu.jpg?v=4" alt={c.photo} />
      </Section>

      <Section id="types" kicker={c.typesK} title={c.typesT}>
        <CardGrid items={c.types} />
      </Section>

      <Section id="steps" kicker={c.stepsK} title={c.stepsT}>
        <p className="text-muted">{c.stepsLead}</p>
        <WoodSteps />
      </Section>

      <Section id="weather" kicker={c.weatherK} title={c.weatherT}>
        <p className="text-muted">{c.weatherLead}</p>
        <WeatherPick />
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

      <Section id="acu" kicker={c.acuK} title={c.acuT}>
        <p>{c.acuP}</p>
        <PointMap room="jieyu" />
        <CardGrid items={c.acuItems} />
        <p className="mt-5 text-muted">{c.acuNote}</p>
      </Section>

      <FollowLessons room="jieyu" />

      <PlayBlock room="jieyu" />

      <Section id="daily" kicker={c.dailyK} title={c.dailyT}>
        <CardGrid items={c.daily} />
      </Section>
    </ClinicLayout>
  );
}
