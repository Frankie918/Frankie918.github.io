/**
 * 全站預設呼吸節奏 · Site-wide default breathing rhythm (single source).
 * Standard chosen in the 2026-10 reorganisation: inhale 4 s, exhale 6 s, no hold —
 * already used by the breathing circle, PMR and the monthly practice, and the least
 * burdensome. The older "吸 4 · 停 2 · 呼 6" variant was retired everywhere.
 * Copy strings state it literally as 「鼻吸 4、口呼 6」 / "in 4, out 6";
 * scripts/content-consistency.test.mjs guards against the old variant returning.
 */
export const BREATH_IN_SEC = 4;
export const BREATH_OUT_SEC = 6;
export const BREATH_ROUNDS = 3;

