import { writeFileSync } from "node:fs";
const base = "https://tcmmacau.github.io";
const pages = [["/", "1.0"], ["/anshen", "0.9"], ["/jieyu", "0.9"], ["/anmei", "0.9"], ["/jieqi", "0.8"], ["/faq", "0.7"], ["/listen", "0.5"]];
const d = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([p, pr]) => `  <url><loc>${base}${p}</loc><lastmod>${d}</lastmod><priority>${pr}</priority></url>`).join("\n")}\n</urlset>\n`;
writeFileSync("dist/client/sitemap.xml", xml);
writeFileSync("dist/client/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
