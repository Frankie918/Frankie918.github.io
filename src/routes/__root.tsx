import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LanguageSwitch } from "@/components/language-switch";
import { HospitalMark } from "@/components/hospital-mark";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteAtmosphere } from "@/components/site-atmosphere";
import { LangProvider } from "@/i18n/lang";
import appCss from "../styles.css?url";

const APP_NAME = "身心課堂";
const STATIC_SITE = import.meta.env.VITE_STATIC_SITE === "true";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#1A2834" },
      {
        name: "description",
        content: "身心課堂：安神、解鬱、安寐。中醫教育，慢慢嚟。",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      ...(STATIC_SITE
        ? []
        : [
            { rel: "manifest", href: "/__grok/manifest.webmanifest" },
            { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
          ]),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&family=Noto+Serif+TC:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="zh-Hant" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LangProvider>
            <div className="site-top">
              <HospitalMark />
              <LanguageSwitch />
            </div>
            <Outlet />
            <SiteAtmosphere />
          </LangProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
