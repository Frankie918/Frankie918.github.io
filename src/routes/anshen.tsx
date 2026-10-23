import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, ClinicLayout, QuietPhoto, Section } from "@/components/clinic-layout";
import { FivePoints, HeartScan, PmrGuide, WorryPark } from "@/components/anshen-tools";
import { FollowLessons } from "@/components/follow-lessons";
import { FavHeading } from "@/components/fav-star";
import { BreathFirst, PlayBlock } from "@/components/play-block";
import { PointMap } from "@/components/point-map";
import { RoomMusicSection } from "@/components/room-music";
import { MUSIC_UI } from "@/lib/room-music";
import { useLang } from "@/i18n/lang";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/anshen")({ component: AnshenPage });

/**
 * Patient journey (2026-10): breathe first → follow along → self-help practice → deeper reading.
 * Section ids are unchanged so old links (#view, #cbt …) and saved progress keep working.
 */
const ORDER = ["breath", "follow", "cbt", "points", "scan", "play", "music", "view", "types", "acu", "daily"] as const;

function AnshenPage() {
  const c = useCopy().anshen;
  const mui = MUSIC_UI[useLang().lang];
  return (
    <ClinicLayout
      theme="anshen"
      title={c.title}
      kicker={c.kicker}
      lede={c.lede}
      bgSrc="/bg-anshen.jpg?v=4"
      nav={c.nav}
      order={ORDER}
      footerName={c.footerName}
      footerNote={c.footerNote}
    >
      {/* 1 · one simple breathing exercise */}
      <BreathFirst room="anshen" />

      {/* 2 · guided step-by-step */}
      <FollowLessons room="anshen" />

      {/* 3 · self-help practice */}
      <Section id="cbt" kicker={c.cbtK} title={c.cbtT}>
        <p>{c.cbtLead}</p>

        <div id="worry" className="mt-10">
          <FavHeading fav="anshen#worry" label={c.worryT} className="font-serif text-2xl">{c.worryT}</FavHeading>
        </div>
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

        <div id="pmr" className="mt-12">
          <FavHeading fav="anshen#pmr" label={c.pmrT} className="font-serif text-2xl">{c.pmrT}</FavHeading>
        </div>
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

      <Section id="points" fav="anshen#points" kicker={c.pointsK} title={c.pointsT}>
        <p className="text-muted">{c.pointsLead}</p>
        <FivePoints />
      </Section>

      <Section id="scan" fav="anshen#scan" kicker={c.scanK} title={c.scanT}>
        <p className="mb-2 text-muted">{c.scanLead}</p>
        <HeartScan />
      </Section>

      <PlayBlock room="anshen" />

      <Section id="music" kicker={mui.sectionK} title={mui.sectionT}>
        <p className="text-muted">{mui.lead}</p>
        <RoomMusicSection />
      </Section>

      {/* 4 · deeper reading, folded but fully present */}
      <Section id="view" kicker={c.viewK} title={c.viewT} collapsible safety={<p>{c.viewP2}</p>}>
        <p>{c.viewP1}</p>
        <QuietPhoto src="/still-anshen.jpg?v=4" alt={c.photo} />
      </Section>

      <Section id="types" kicker={c.typesK} title={c.typesT} collapsible>
        <CardGrid items={c.types} />
      </Section>

      <Section id="acu" kicker={c.acuK} title={c.acuT} collapsible safety={<p>{c.acuNote}</p>}>
        <p>{c.acuP}</p>
        <PointMap room="anshen" />
        <CardGrid items={c.acuItems} />
      </Section>

      <Section id="daily" kicker={c.dailyK} title={c.dailyT} collapsible>
        <CardGrid items={c.daily} />
      </Section>
    </ClinicLayout>
  );
}
