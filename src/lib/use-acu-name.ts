import { useLang } from "@/i18n/lang";
import { acuPoint } from "@/lib/acupoints";

/** Name of a point from the single acupoint source (src/lib/acupoints.ts). */
export function useAcuName() {
  const { lang } = useLang();
  return (id: string, kind: "body" | "ear" = "body") => acuPoint(id, kind)?.name[lang] ?? id;
}
