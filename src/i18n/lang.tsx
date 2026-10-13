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
