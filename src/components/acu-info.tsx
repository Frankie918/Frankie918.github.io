import { useLang } from "@/i18n/lang";
import { ACU_LABELS, acuPoint } from "@/lib/acupoints";
import { AcuCloseUp } from "@/components/acu-figure";
import { useAcuName } from "@/lib/use-acu-name";


/**
 * Location + room-specific note + caution for one point.
 * Location and caution always come from the shared source so every page says the same thing.
 */
export function AcuInfo({
  id,
  kind = "body",
  use,
  compact = false,
}: {
  id: string;
  kind?: "body" | "ear";
  use?: string;
  compact?: boolean;
}) {
  const { lang } = useLang();
  const pt = acuPoint(id, kind);
  const L = ACU_LABELS[lang];
  const size = compact ? "text-sm" : "";
  return (
    <div className="acu-info">
      {pt && (
        <p className={`mt-2 ${size} text-ink`}>
          <span className="mr-1 text-xs tracking-[0.16em] text-accent">{L.loc}</span>
          {pt.loc[lang]}
        </p>
      )}
      {use && <p className={`mt-2 ${size} text-muted`}>{use}</p>}
      {pt?.caution && (
        <p className={`mt-2 ${size} text-ink`}>
          <span className="mr-1 text-xs tracking-[0.16em] text-accent">{L.caution}</span>
          {pt.caution[lang]}
        </p>
      )}
    </div>
  );
}

/** Card grid of body points (used by 安寐「睡前輕按」). */
export function AcuPressGrid({ items }: { items: readonly { id: string; body: string }[] }) {
  const name = useAcuName();
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="rounded-card border border-line bg-paper p-5">
          <h3 className="font-serif text-lg">{name(item.id)}</h3>
          <AcuInfo id={item.id} use={item.body} compact />
          <AcuCloseUp id={item.id} name={name(item.id)} />
        </article>
      ))}
    </div>
  );
}
