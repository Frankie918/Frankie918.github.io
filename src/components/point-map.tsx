import { useState } from "react";
import { loadNotes, patchNote, type RoomId } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";
import { AcuCloseUp, AcuHint, BodySilhouette } from "@/components/acu-figure";
import { AcuInfo } from "@/components/acu-info";
import { useAcuName } from "@/lib/use-acu-name";

type Dot = { id: string; left: string; top: string };

const EAR: Record<RoomId, Dot[]> = {
  anshen: [
    { id: "shenmen", left: "56%", top: "32%" },
    { id: "xin", left: "46%", top: "54%" },
    { id: "pizhixia", left: "56%", top: "66%" },
  ],
  jieyu: [
    { id: "gan", left: "60%", top: "42%" },
    { id: "shenmen", left: "56%", top: "32%" },
    { id: "jiaogan", left: "38%", top: "36%" },
  ],
  anmei: [
    { id: "shenmen", left: "56%", top: "32%" },
    { id: "zhen", left: "66%", top: "68%" },
    { id: "pi", left: "52%", top: "58%" },
  ],
  yali: [
    { id: "shenmen", left: "56%", top: "32%" },
    { id: "jiaogan", left: "38%", top: "36%" },
    { id: "pizhixia", left: "56%", top: "66%" },
  ],
};

const BODY: Record<RoomId, Dot[]> = {
  anshen: [
    { id: "yintang", left: "50%", top: "7.5%" },
    { id: "shenmen", left: "15%", top: "60%" },
    { id: "neiguan", left: "17.5%", top: "54%" },
    { id: "taichong", left: "38%", top: "95%" },
  ],
  jieyu: [
    { id: "qimen", left: "40%", top: "33%" },
    { id: "neiguan", left: "17.5%", top: "54%" },
    { id: "hegu", left: "13%", top: "65%" },
    { id: "taichong", left: "38%", top: "95%" },
  ],
  anmei: [
    { id: "shenmen", left: "15%", top: "60%" },
    { id: "neiguan", left: "17.5%", top: "54%" },
    { id: "sanyinjiao", left: "46%", top: "88%" },
    { id: "yongquan", left: "62%", top: "97%" },
  ],
  yali: [
    { id: "yintang", left: "50%", top: "7.5%" },
    // Schematic only (front silhouette): 風池 shown at the side of the neck, 肩井 at the shoulder top.
    { id: "fengchi", left: "40%", top: "15%" },
    { id: "jianjing", left: "32%", top: "21%" },
    { id: "neiguan", left: "17.5%", top: "54%" },
    { id: "hegu", left: "13%", top: "65%" },
    { id: "taichong", left: "38%", top: "95%" },
  ],
};

// Names, locations and cautions come from src/lib/acupoints.ts; room copy only holds the use note.
function lookup(pts: Record<string, { d: string }>, id: string) {
  return pts[id];
}

function EarOutline() {
  return (
    <svg viewBox="10 8 102 166" className="ear-svg" aria-hidden="true">
      <path
        className="ear-fill"
        d="M40 84
           C30 66 34 44 50 28
           C64 14 86 10 100 20
           C114 30 118 54 116 80
           C114 108 108 134 96 152
           C84 168 64 174 50 164
           C40 156 40 144 50 136
           C38 126 26 110 28 94
           C29 88 34 84 40 84 Z"
      />
      <path
        className="ear-line"
        d="M50 82
           C46 60 60 34 80 30
           C96 28 106 44 106 64
           C106 90 100 116 88 136"
      />
      <path className="ear-line" d="M46 90 C62 86 80 80 98 70" />
      <path className="ear-line" d="M68 140 C76 122 80 104 76 88" />
      <path className="ear-line" d="M76 88 C84 76 94 64 102 54" />
      <path className="ear-line" d="M76 88 C62 82 50 70 44 58" />
      <path className="ear-line" d="M32 74 C44 78 48 90 44 100" />
      <path className="ear-line" d="M54 126 C64 120 76 126 78 136" />
      <ellipse className="ear-canal" cx="56" cy="102" rx="6.5" ry="8.5" />
    </svg>
  );
}

export function PointMap({ room }: { room: RoomId }) {
  const p = useCopy().play;
  const pts = p.maps[room] as Record<string, { d: string }>;
  const acuName = useAcuName();
  const bodyFirst = room === "jieyu" || room === "yali";
  const [mode, setMode] = useState<"ear" | "body">(bodyFirst ? "body" : "ear");
  const [id, setId] = useState(bodyFirst ? BODY[room][0].id : EAR[room][0].id);
  const dots = mode === "ear" ? EAR[room] : BODY[room];
  const shownId = lookup(pts, id) && dots.some((d) => d.id === id) ? id : dots[0].id;
  const item = lookup(pts, shownId);
  const name = (pid: string) => acuName(pid, mode);

  function pick(next: string) {
    setId(next);
    // Saved into the clinic card (TodayNote.points) as the display name, same as before.
    const label = name(next);
    const prev = new Set(loadNotes()[room].points ?? []);
    prev.add(label);
    patchNote(room, { points: [...prev] });
  }

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      <div className="rounded-card border border-line bg-paper p-6">
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className={`min-h-11 rounded-full px-4 text-sm ${mode === "ear" ? "bg-bg-deep text-paper" : "border border-line"}`}
            onClick={() => {
              setMode("ear");
              if (!EAR[room].some((d) => d.id === id)) setId(EAR[room][0].id);
            }}
          >
            {p.mapEar}
          </button>
          <button
            type="button"
            className={`min-h-11 rounded-full px-4 text-sm ${mode === "body" ? "bg-bg-deep text-paper" : "border border-line"}`}
            onClick={() => {
              setMode("body");
              if (!BODY[room].some((d) => d.id === id)) setId(BODY[room][0].id);
            }}
          >
            {p.mapBody}
          </button>
        </div>
        {mode === "ear" ? (
          <div className="ear-map relative mx-auto">
            <EarOutline />
            {dots.map((d) => (
              <button
                key={d.id}
                type="button"
                className="point-dot"
                data-active={id === d.id}
                style={{ left: d.left, top: d.top }}
                aria-label={name(d.id)}
                onClick={() => pick(d.id)}
              />
            ))}
          </div>
        ) : (
          <div className="relative mx-auto h-72 w-44">
            <BodySilhouette />
            {dots.map((d) => (
              <button
                key={d.id}
                type="button"
                className="point-dot"
                data-active={id === d.id}
                style={{ left: d.left, top: d.top }}
                aria-label={name(d.id)}
                onClick={() => pick(d.id)}
              />
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {dots.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`min-h-10 rounded-full px-3 text-sm ${
                id === d.id ? "bg-accent text-paper" : "border border-line text-ink"
              }`}
              onClick={() => pick(d.id)}
            >
              {name(d.id)}
            </button>
          ))}
        </div>
        {mode === "body" && <AcuHint />}
      </div>
      <div className="rounded-card border border-line bg-paper p-6">
        <h3 className="font-serif text-xl">{name(shownId)}</h3>
        <AcuInfo id={shownId} kind={mode} use={item?.d} />
        {mode === "body" && <AcuCloseUp id={shownId} name={name(shownId)} />}
        <p className="mt-3 text-xs text-muted">{p.mapNote}</p>
      </div>
    </div>
  );
}
