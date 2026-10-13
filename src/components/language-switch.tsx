import { LANGS, useLang } from "@/i18n/lang";

export function LanguageSwitch() {
  const { lang, setLang, copy } = useLang();
  const titles = { yue: copy.ui.langYue, cmn: copy.ui.langCmn, en: copy.ui.langEn };
  return (
    <div className="lang-bar" role="group" aria-label={copy.ui.language}>
      {LANGS.map((item) => (
        <button
          key={item.id}
          type="button"
          title={titles[item.id]}
          aria-label={titles[item.id]}
          aria-pressed={lang === item.id}
          onClick={() => setLang(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
