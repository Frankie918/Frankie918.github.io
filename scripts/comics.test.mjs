// Homepage comic rotation guards. Run: node --test scripts/comics.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { "@": `${root}src` }, jsx: true });
const {
  COMICS,
  COMIC_THEME_ORDER,
  currentComic,
  nextComicTheme,
} = await jiti.import(`${root}src/lib/comics.ts`);
const read = (p) => readFileSync(`${root}${p}`, "utf8");

test("catalog has at least the current 舒壓 comic", () => {
  assert.ok(COMICS.length >= 1);
  const cur = currentComic();
  assert.equal(cur.theme, "yali");
  assert.match(cur.image, /office-kids-loosen-up/);
  for (const lang of ["yue", "cmn", "en"]) {
    assert.ok(cur.title[lang]);
    assert.ok(cur.alt[lang]);
  }
});

test("theme rotation is 安神 → 解鬱 → 安寐 → 舒壓", () => {
  assert.deepEqual([...COMIC_THEME_ORDER], ["anshen", "jieyu", "anmei", "yali"]);
  assert.equal(nextComicTheme("yali"), "anshen");
  assert.equal(nextComicTheme("anshen"), "jieyu");
});

test("currentComic picks the newest published entry", () => {
  const fake = [
    {
      id: "a",
      theme: "anshen",
      image: "/a.jpg",
      published: "2026-10-01",
      title: { yue: "a", cmn: "a", en: "a" },
      alt: { yue: "a", cmn: "a", en: "a" },
    },
    {
      id: "b",
      theme: "jieyu",
      image: "/b.jpg",
      published: "2026-10-18",
      title: { yue: "b", cmn: "b", en: "b" },
      alt: { yue: "b", cmn: "b", en: "b" },
    },
  ];
  assert.equal(currentComic(fake).id, "b");
});

test("yali room no longer embeds the comic section", () => {
  const src = read("src/routes/yali.tsx");
  assert.equal(src.includes('id="comic"'), false);
  assert.equal(src.includes("office-kids-loosen-up"), false);
  assert.equal(/["']comic["']/.test(src), false);
});

test("homepage mounts HomeComic", () => {
  assert.match(read("src/routes/index.tsx"), /HomeComic/);
  assert.match(read("src/components/home-comic.tsx"), /逢周六更新|Updates every Saturday/);
});
