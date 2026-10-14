import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { patchNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";
import { AcuCloseUp, AcuHint, BodySilhouette } from "@/components/acu-figure";

const POINT_STYLE = {
  baihui: { left: "50%", top: "2%" },
  yintang: { left: "50%", top: "7.5%" },
  shenmen: { left: "15%", top: "60%" },
  neiguan: { left: "17.5%", top: "54%" },
  taichong: { left: "38%", top: "95%" },
} as const;

type PointId = keyof typeof POINT_STYLE;
const SCAN_KEYS = ["fire", "timid", "spleen", "kidney", "phlegm"] as const;

export function FivePoints() {
  const c = useCopy().anshen;
  const [id, setId] = useState<PointId>("yintang");
  const [fill, setFill] = useState(0);
  const [done, setDone] = useState(false);
  const holding = useRef(false);
  const start = useRef(0);
  const timer = useRef<number | null>(null);

  function stop() {
    holding.current = false;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setFill(0);
  }

  function startHold() {
    holding.current = true;
    start.current = Date.now();
    setDone(false);
    timer.current = window.setInterval(() => {
      const p = Math.min(100, (Date.now() - start.current) / 200);
      setFill(p);
      if (p >= 100) {
        stop();
        setDone(true);
      }
    }, 40);
  }

  useEffect(() => () => stop(), []);

  const point = c.points[id];

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      <div className="rounded-card border border-line bg-paper p-6">
        <div className="relative mx-auto h-72 w-44">
          <BodySilhouette />
          {(Object.keys(POINT_STYLE) as PointId[]).map((key) => (
            <button
              key={key}
              type="button"
              className="point-dot"
              data-active={id === key}
              style={POINT_STYLE[key]}
              aria-label={c.points[key].t}
              onClick={() => setId(key)}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(Object.keys(POINT_STYLE) as PointId[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`min-h-10 rounded-full px-3 text-sm ${
                id === key ? "bg-accent text-paper" : "border border-line text-ink"
              }`}
              onClick={() => setId(key)}
            >
              {c.points[key].t}
            </button>
          ))}
        </div>
        <AcuHint />
      </div>
      <div className="rounded-card border border-line bg-paper p-6">
        <h3 className="font-serif text-xl">{point.t}</h3>
        <p className="mt-2 text-muted">{point.d}</p>
        <AcuCloseUp id={id} name={point.t} />
        <p className="mt-2 text-sm text-muted">{c.breath}</p>
        <div className="mt-4">
          <SolidButton onPointerDown={startHold} onPointerUp={stop} onPointerLeave={stop}>
            {done ? c.held : c.hold}
          </SolidButton>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
          <div className="h-full bg-accent transition-[width] duration-75" style={{ width: `${fill}%` }} />
        </div>
      </div>
    </div>
  );
}

export function HeartScan() {
  const c = useCopy().anshen;
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(key: string) {
    setPicked((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key].slice(0, 2);
      patchNote(
        "anshen",
        { scan: next.map((k) => c.scan[k as (typeof SCAN_KEYS)[number]].label) },
      );
      return next;
    });
  }

  return (
    <div className="mt-4 grid gap-2.5">
      {SCAN_KEYS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => toggle(key)}
          className={`rounded-xl border px-4 py-3 text-left text-sm ${
            picked.includes(key) ? "border-accent bg-paper" : "border-line bg-paper"
          }`}
        >
          {c.scan[key].label}
        </button>
      ))}
      {picked.length > 0 && (
        <div className="mt-2 rounded-card border border-line bg-paper p-5">
          <h3 className="font-serif text-lg">{c.scanNote}</h3>
          {picked.map((key) => (
            <p key={key} className="mt-2 text-sm text-muted">
              {c.scan[key as (typeof SCAN_KEYS)[number]].note}
            </p>
          ))}
          <p className="mt-3 text-xs text-muted">{c.scanFoot}</p>
        </div>
      )}
    </div>
  );
}

export function WorryPark() {
  const c = useCopy().anshen;
  const [draft, setDraft] = useState("");
  const [parked, setParked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={c.worryPh}
        className="min-h-24 w-full rounded-xl border border-line bg-paper p-3 text-ink outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <GhostButton
          onClick={() => {
            const v = draft.trim();
            if (!v) return;
            setParked((p) => [...p, v]);
            setDraft("");
            setOpen(false);
          }}
        >
          {c.parkLater}
        </GhostButton>
        <GhostButton onClick={() => setOpen(true)}>{c.parkOpen}</GhostButton>
      </div>
      {parked.length > 0 && !open && (
        <p className="mt-3 text-sm text-muted">{c.parkedN(parked.length)}</p>
      )}
      {open && (
        <div className="mt-4 rounded-card border border-line bg-paper p-5">
          <h3 className="font-serif text-lg">{c.worrySlot}</h3>
          {parked.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{c.worryEmpty}</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted">{c.worryReview}</p>
              <ul className="mt-3 list-disc pl-5 text-sm">
                {parked.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function PmrGuide() {
  const c = useCopy().anshen;
  const pmr = c.pmrLines;
  const [i, setI] = useState(-1);
  const timer = useRef<number | null>(null);

  function stop(msgIndex = -2) {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setI(msgIndex);
  }

  function start() {
    stop(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      if (n >= pmr.length) {
        stop(pmr.length - 1);
        return;
      }
      setI(n);
    }, 8000);
  }

  useEffect(() => () => stop(-1), []);

  const text = i === -1 ? c.pmrIdle : i === -2 ? c.pmrStop : pmr[i];

  return (
    <div className="mt-4">
      <p className="min-h-12 font-serif text-lg">{text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <SolidButton onClick={start}>{c.pmrStart}</SolidButton>
        <GhostButton onClick={() => stop(-2)}>{c.pmrPause}</GhostButton>
      </div>
    </div>
  );
}
