import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, QuietPhoto, Section } from "@/components/clinic-layout";
import { FivePoints, HeartScan, PmrGuide, WorryPark } from "@/components/anshen-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/anshen")({ component: AnshenPage });

function AnshenPage() {
  const c = useCopy().anshen;
  return (
    <ClinicLayout
      theme="anshen"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-anshen.jpg?v=4"
      nav={c.nav}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      <Section id="view" kicker={c.viewK} title={c.viewT}>
        <p>{c.viewP1}</p>
        <p className="mt-3 text-muted">{c.viewP2}</p>
        <QuietPhoto src="/still-anshen.jpg?v=4" alt={c.photo} />
      </Section>

      <Section id="types" kicker={c.typesK} title={c.typesT}>
        <CardGrid items={c.types} />
      </Section>

      <Section id="points" kicker={c.pointsK} title={c.pointsT}>
        <p className="text-muted">{c.pointsLead}</p>
        <FivePoints />
      </Section>

      <Section id="scan" kicker={c.scanK} title={c.scanT}>
        <p className="mb-2 text-muted">{c.scanLead}</p>
        <HeartScan />
      </Section>

      <Section id="cbt" kicker={c.cbtK} title={c.cbtT}>
        <p>{c.cbtLead}</p>

        <h3 className="mt-10 font-serif text-2xl">{c.worryT}</h3>
        <p className="mt-3">{c.worryP}</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
          {c.worrySteps.map(([strong, rest]) => (
            <li key={strong}>
              <strong className="text-ink">{strong}</strong>
              {rest}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{c.worryNote}</p>
        <p className="mt-6 font-serif text-lg">{c.worryTry}</p>
        <WorryPark />

        <h3 className="mt-12 font-serif text-2xl">{c.pmrT}</h3>
        <p className="mt-3">{c.pmrP}</p>
        <p className="mt-3 text-muted">{c.pmrPrep}</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
          {c.pmrSteps.map(([strong, rest]) => (
            <li key={strong}>
              <strong className="text-ink">{strong}</strong>
              {rest}
            </li>
          ))}
        </ol>
        <p className="mt-6 font-serif text-lg">{c.pmrTry}</p>
        <PmrGuide />

        <h3 className="mt-12 font-serif text-2xl">{c.avoidT}</h3>
        <p className="mt-3 text-muted">{c.avoidP}</p>
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT}>
        <p>{c.acuP}</p>
        <PointMap room="anshen" />
        <CardGrid items={c.acuItems} />
        <p className="mt-5 text-muted">{c.acuNote}</p>
      </Section>

      <FollowLessons room="anshen" />

      <PlayBlock room="anshen" />

      <Section id="daily" kicker={c.dailyK} title={c.dailyT}>
        <CardGrid items={c.daily} />
      </Section>
    </ClinicLayout>
  );
}
