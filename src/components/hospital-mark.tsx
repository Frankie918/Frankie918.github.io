import { useCopy } from "@/i18n/lang";

export function HospitalMark() {
  const dept = useCopy().ui.dept;
  return (
    <div className="flex min-w-0 items-center gap-2">
      <img
        src="/kwh-logo.png"
        alt="鏡湖醫院 Kiang Wu Hospital"
        className="h-9 w-auto"
      />
      <span className="hidden border-l border-line pl-2 font-serif text-sm tracking-widest text-ink sm:inline">
        {dept}
      </span>
    </div>
  );
}
