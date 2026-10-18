// Four-room music guards: every room offers 中樂 + 西樂, licences documented, player opt-in.
// Run via npm test (node --test 'scripts/**/*.test.mjs').
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { "@": `${root}src` }, jsx: true });
const { ROOM_MUSIC, MUSIC_UI } = await jiti.import(`${root}src/lib/room-music.ts`);

const ROOMS = ["anshen", "jieyu", "anmei", "yali"];
const BAD = /根治|治好|治癒|療效|保證|包好|cure|guarantee|proven|will fix/i;

test("each of the four rooms offers at least one Chinese and one Western track", () => {
  for (const room of ROOMS) {
    const tracks = ROOM_MUSIC[room].tracks;
    assert.ok(tracks.filter((t) => t.group === "cn").length >= 1, `${room} needs a Chinese track`);
    assert.ok(tracks.filter((t) => t.group === "west").length >= 1, `${room} needs a Western track`);
    for (const lang of ["yue", "cmn", "en"]) {
      for (const t of tracks) {
        assert.ok(t.title[lang] && t.hint[lang], `${room}/${t.id} missing ${lang} title/hint`);
        assert.doesNotMatch(`${t.title[lang]} ${t.hint[lang]}`, BAD, `${room}/${t.id} efficacy wording`);
      }
      assert.ok(ROOM_MUSIC[room].credit[lang], `${room} missing ${lang} credit`);
      assert.ok(MUSIC_UI[lang].cn && MUSIC_UI[lang].west && MUSIC_UI[lang].mute, `MUSIC_UI ${lang} labels`);
    }
  }
});

test("every track file exists locally and Western licences are documented", () => {
  const doc = readFileSync(`${root}docs/yali-music-licences.md`, "utf8");
  assert.match(doc, /CC0/);
  for (const room of ROOMS) {
    for (const t of ROOM_MUSIC[room].tracks) {
      const f = `${root}public${t.src}`;
      assert.ok(existsSync(f), f);
      assert.ok(statSync(f).size < 7_000_000, `${t.src} too large`);
      assert.match(doc, new RegExp(t.src.replace(/\//g, "\\/")), `licence doc lists ${t.src}`);
    }
  }
  // Only the two verified CC0 Bach recordings are used as Western tracks anywhere.
  const westSrcs = new Set(ROOMS.flatMap((r) => ROOM_MUSIC[r].tracks.filter((t) => t.group === "west").map((t) => t.src)));
  assert.deepEqual([...westSrcs].sort(), ["/audio/yali/aria.mp3", "/audio/yali/prelude.mp3"]);
  // Existing Chinese tracks are reused, not replaced.
  assert.equal(ROOM_MUSIC.anshen.tracks.find((t) => t.group === "cn").src, "/audio/pingsha.mp3");
  assert.equal(ROOM_MUSIC.jieyu.tracks.find((t) => t.group === "cn").src, "/audio/yangguan.mp3");
  assert.equal(ROOM_MUSIC.anmei.tracks.find((t) => t.group === "cn").src, "/audio/zuiyu.mp3");
});

test("舒壓 keeps clinician-preferred Prelude BWV 846, listed first among Western tracks", () => {
  const west = ROOM_MUSIC.yali.tracks.filter((t) => t.group === "west");
  assert.equal(west[0].id, "prelude");
  assert.equal(west[0].src, "/audio/yali/prelude.mp3");
});

test("player is off by default, floating like the language switch, mute stops, no room ambient", () => {
  const player = readFileSync(`${root}src/components/room-music.tsx`, "utf8");
  assert.match(player, /useState<string \| null>\(null\)/, "starts stopped/silent");
  assert.doesNotMatch(player, /autoPlay|autoplay\s*=/);
  assert.doesNotMatch(player, /pointerdown|keydown/, "no autoplay-on-first-tap");
  assert.match(player, /MAX_VOLUME = 0\.5/, "gentle volume cap");
  assert.match(player, /music-float-btn/, "floating button");
  assert.match(player, /ui\.mute/, "clear mute/off choice");
  const root_ = readFileSync(`${root}src/routes/__root.tsx`, "utf8");
  assert.match(root_, /<FloatingMusic \/>/, "floating button mounted in sticky top bar");
  assert.match(root_, /<MusicProvider>/, "single shared player");
  const atmo = readFileSync(`${root}src/components/site-atmosphere.tsx`, "utf8");
  for (const r of ROOMS) assert.match(atmo, new RegExp(`"/${r}"`), `ambient disabled for ${r}`);
  for (const route of ROOMS) {
    const src = readFileSync(`${root}src/routes/${route}.tsx`, "utf8");
    assert.match(src, /RoomMusicSection/, `${route} has in-page music section`);
    assert.match(src, /"music"/, `${route} orders #music in nav`);
  }
});
