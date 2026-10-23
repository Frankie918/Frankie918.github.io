// 我的收藏 guards (2026-10). Run: node --test scripts/favourites.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { "@": `${root}src` }, jsx: true });
const { COPY } = await jiti.import(`${root}src/i18n/copy.ts`);
const { FAV_ITEMS, FAV_UI, FAV_STORAGE_KEY, parseFavs, toggleFav } = await jiti.import(`${root}src/lib/favourites.ts`);
const read = (p) => readFileSync(`${root}${p}`, "utf8");

test("every favourite has a title in all three languages and a unique key", () => {
  assert.equal(new Set(FAV_ITEMS.map((i) => i.key)).size, FAV_ITEMS.length);
  for (const lang of ["yue", "cmn", "en"])
    for (const i of FAV_ITEMS) {
      const t = i.title(COPY[lang]);
      assert.equal(typeof t, "string", `${lang} ${i.key}`);
      assert.ok(t.trim().length > 0, `${lang} ${i.key} empty`);
    }
  for (const room of ["anshen", "jieyu", "anmei", "yali"]) assert.ok(FAV_ITEMS.some((i) => i.room === room), room);
});

test("every favourite anchor has a star on its room page", () => {
  const src = {
    anshen: read("src/routes/anshen.tsx"),
    jieyu: read("src/routes/jieyu.tsx"),
    anmei: read("src/routes/anmei.tsx"),
    yali: read("src/routes/yali.tsx") + read("src/components/yali-tools.tsx"),
  };
  const shared = read("src/components/play-block.tsx") + read("src/components/follow-lessons.tsx");
  for (const i of FAV_ITEMS) {
    if (i.anchor === "breath" || i.anchor === "follow") {
      assert.match(shared, new RegExp(`id="${i.anchor}" fav=\\{\`\\$\\{room\\}#${i.anchor}\`\\}`));
      continue;
    }
    assert.ok(src[i.room].includes(`id="${i.anchor}"`), `${i.key} anchor missing`);
    assert.ok(src[i.room].includes(`fav="${i.key}"`), `${i.key} star missing`);
  }
});

test("storage parsing is defensive and toggling is pure", () => {
  assert.equal(FAV_STORAGE_KEY, "shenxin-favs-v1");
  assert.deepEqual(parseFavs(null), []);
  assert.deepEqual(parseFavs("{bad"), []);
  assert.deepEqual(parseFavs('{"a":1}'), []);
  assert.deepEqual(parseFavs('["yali#stand","nope#x",3,"yali#stand"]'), ["yali#stand"]);
  const a = ["yali#stand"];
  assert.deepEqual(toggleFav(a, "anmei#diary"), ["yali#stand", "anmei#diary"]);
  assert.deepEqual(toggleFav(a, "yali#stand"), []);
  assert.deepEqual(a, ["yali#stand"]);
});

test("favourites stay local: no network calls in the feature files", () => {
  for (const p of ["src/lib/favourites.ts", "src/components/fav-star.tsx", "src/components/fav-list.tsx"])
    assert.doesNotMatch(read(p), /fetch\(|XMLHttpRequest|sendBeacon|navigator\.share/, p);
});

test("UI copy: Traditional Chinese, 著 not 着, natural Cantonese", () => {
  for (const lang of ["yue", "cmn"]) {
    const ui = FAV_UI[lang];
    const all = [ui.kicker, ui.title, ui.empty, ui.note, ui.clear, ui.add("x"), ui.remove("x")].join("");
    assert.doesNotMatch(all, /着|们|这|为|储存在你的/);
  }
  assert.equal(FAV_UI.yue.kicker, "我的收藏");
  assert.equal(FAV_UI.yue.empty, "仲未收藏任何練習，見到鍾意嘅撳一下星星就得。");
  assert.match(FAV_UI.yue.note, /只會儲喺你部機度/);
  assert.match(FAV_UI.en.empty, /star/);
});
