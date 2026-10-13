import { createFileRoute, Link } from "@tanstack/react-router";
import { ClinicContact } from "@/components/clinic-contact";
import { SiteQr } from "@/components/site-qr";
import { ViewCount } from "@/components/view-count";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/qr")({ component: QrPage });

function QrPage() {
  const copy = useCopy();
  return (
    <main className="qr-print min-h-screen bg-bg px-6 py-16 text-ink">
      <div className="mx-auto max-w-md text-center">
        <Link to="/" className="text-xs tracking-[0.22em] text-accent no-underline">
          {copy.ui.back}
        </Link>
        <p className="mt-10 text-xs tracking-[0.28em] text-accent">{copy.qr.kicker}</p>
        <h1 className="mt-3 font-serif text-5xl">{copy.ui.site}</h1>
        <p className="mt-3 text-muted">{copy.qr.sub}</p>
        <div className="mx-auto mt-8 w-full max-w-[min(100%,420px)]">
          <SiteQr size={420} download />
        </div>
        <div className="mt-10 text-sm">
          <ClinicContact />
        </div>
        <ViewCount page="qr" tone="light" />
      </div>
    </main>
  );
}
