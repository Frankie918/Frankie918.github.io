import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { COPY, type Copy, type Lang } from "@/i18n/copy";

const KEY = "shenxin-lang";

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  copy: Copy;
} | null>(null);

function htmlLang(lang: Lang) {
  if (lang === "en") return "en";
  if (lang === "yue") return "zh-Hant-HK";
  return "zh-Hant";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("yue");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "yue" || saved === "cmn" || saved === "en") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
    const meta: Record<Lang, { title: string; desc: string }> = {
      yue: { title: "身心課堂", desc: "身心課堂：安神、解鬱、安寐、舒壓。中醫教育，慢慢嚟。" },
      cmn: { title: "身心課堂", desc: "身心課堂：安神、解鬱、安寐、舒壓。中醫教育，慢慢來。" },
      en: {
        title: "Body & Mind Classroom",
        desc: "Body & Mind Classroom: Calm the Mind, Ease the Heart, Restful Sleep, Stress Relief. Chinese medicine education, at an unhurried pace.",
      },
    };
    document.title = meta[lang].title;
    for (const [sel, val] of [
      ['meta[name="description"]', meta[lang].desc],
      ['meta[property="og:title"]', meta[lang].title],
      ['meta[property="og:description"]', meta[lang].desc],
    ] as const) {
      const el = document.querySelector(sel);
      if (el) el.setAttribute("content", val);
    }
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }

  const value = useMemo(() => ({ lang, setLang, copy: COPY[lang] }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("LangProvider missing");
  return ctx;
}

export function useCopy() {
  return useLang().copy;
}

export const LANGS: { id: Lang; label: string }[] = [
  { id: "yue", label: "粵" },
  { id: "cmn", label: "普" },
  { id: "en", label: "EN" },
];
