import { createServerFn } from "@tanstack/react-start";

const PAGES = ["home", "anshen", "jieyu", "anmei", "yali", "listen", "qr"] as const;
export type ViewPage = (typeof PAGES)[number];

export const bumpViews = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as { page?: string } | null;
    const page = PAGES.includes(d?.page as ViewPage) ? (d!.page as ViewPage) : "home";
    return { page };
  })
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ n: number }>`
      insert into page_views (page, n) values (${data.page}, 1)
      on conflict (page) do update set n = page_views.n + 1
      returning n
    `;
    return { n: Number(rows[0]?.n ?? 0) };
  });
