import { useEffect } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
const RELOAD_KEY = "sx-mod-reload";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

function isStaleModule(message: string) {
  return /importing a module script failed/i.test(message);
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message = errorMessage(error);

  useEffect(() => {
    if (!isStaleModule(message)) return;
    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    } catch {
      /* ignore */
    }
  }, [message]);

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400">
        {message}
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.removeItem(RELOAD_KEY);
          } catch {
            /* ignore */
          }
          window.location.reload();
        }}
        className="mt-2 min-h-11 rounded-full bg-zinc-900 px-5 py-2 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
      >
        Reload
      </button>
    </main>
  );
}
