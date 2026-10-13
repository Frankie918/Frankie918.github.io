export const PUBLISHED_SITE = "https://tcmmacau.github.io";

export function isShareable(href: string) {
  try {
    const host = new URL(href).hostname;
    if (host === "localhost" || host.endsWith(".local")) return false;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return false;
    return host.includes(".");
  } catch {
    return false;
  }
}

export function publicSiteHref() {
  const href = window.location.origin.replace(/\/$/, "");
  return isShareable(href) ? href : PUBLISHED_SITE;
}
