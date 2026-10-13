import { useCopy } from "@/i18n/lang";

export function ClinicContact() {
  const ui = useCopy().ui;
  return (
    <div className="mt-4 text-sm">
      <p>{ui.contact}</p>
      <p className="mt-1">
        {ui.desk}{" "}
        <a href="tel:+85382958601" className="tracking-wide text-inherit no-underline">
          8295 8601
        </a>
      </p>
    </div>
  );
}
