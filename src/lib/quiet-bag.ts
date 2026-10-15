/** Shuffle-bag dealing: every item appears once per deck, no back-to-back repeat across decks. */

type BagState = { sig: string; order: number[]; pos: number; last: number };

export type BagStore = { get(k: string): string | null; set(k: string, v: string): void };

function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return String(h >>> 0);
}

function shuffle(n: number, avoidFirst: number, rnd: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  if (n > 1 && a[0] === avoidFirst) {
    const k = 1 + Math.floor(rnd() * (n - 1));
    [a[0], a[k]] = [a[k]!, a[0]!];
  }
  return a;
}

/** Deal the next index from a persisted bag keyed by `key` over `keys` (item identities). */
export function dealFromBag(
  key: string,
  keys: readonly string[],
  store: BagStore,
  rnd: () => number = Math.random,
): number {
  const n = keys.length;
  if (n === 0) return -1;
  const sig = hash(keys.join("\u0001"));
  let st: BagState | null = null;
  try {
    const raw = store.get(key);
    if (raw) st = JSON.parse(raw) as BagState;
  } catch {
    st = null;
  }
  if (!st || st.sig !== sig || !Array.isArray(st.order) || st.order.length !== n) {
    st = { sig, order: shuffle(n, st && st.sig === sig ? st.last : -1, rnd), pos: 0, last: -1 };
  }
  if (st.pos >= n) {
    st.order = shuffle(n, st.last, rnd);
    st.pos = 0;
  }
  const idx = st.order[st.pos]!;
  st.pos += 1;
  st.last = idx;
  try {
    store.set(key, JSON.stringify(st));
  } catch {
    /* ignore */
  }
  return idx;
}

const mem = new Map<string, string>();
export function browserBagStore(): BagStore {
  return {
    get(k) {
      try {
        return window.sessionStorage.getItem(k);
      } catch {
        return mem.get(k) ?? null;
      }
    },
    set(k, v) {
      try {
        window.sessionStorage.setItem(k, v);
      } catch {
        mem.set(k, v);
      }
    },
  };
}
