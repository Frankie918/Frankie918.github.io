// Four-room music guards: every room offers 中樂 + 西樂, licences documented, player opt-in.
// Run via npm test (node --test 'scripts/**/*.test.mjs').
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { "@": `${root}src` }, jsx: true });
const { ROOM_MUSIC, HOME_MUSIC, MUSIC_UI, defaultTrack, defaultTrackFor, contextFromPath } = await jiti.import(`${root}src/lib/room-music.ts`);

const ROOMS = ["anshen", "jieyu", "anmei", "yali"];
const BAD = /根治|治好|治癒|療效|保證|包好|cure|guarantee|proven|will fix/i;

test("each of the four rooms offers exactly one Chinese and one Western track", () => {
  for (const room of ROOMS) {
    const tracks = ROOM_MUSIC[room].tracks;
    assert.equal(tracks.length, 2, `${room} must have exactly 2 tracks`);
    assert.equal(tracks.filter((t) => t.group === "cn").length, 1, `${room} needs exactly one Chinese track`);
    assert.equal(tracks.filter((t) => t.group === "west").length, 1, `${room} needs exactly one Western track`);
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
  // Four genuinely DIFFERENT Western works: distinct srcs, distinct ids, and
  // distinct parent compositions (workId) — no two movements of one work.
  const west = ROOMS.flatMap((r) => ROOM_MUSIC[r].tracks.filter((t) => t.group === "west"));
  const westSrcs = west.map((t) => t.src);
  assert.equal(new Set(westSrcs).size, 4, "Western tracks must not repeat across rooms");
  assert.equal(new Set(west.map((t) => t.id)).size, 4, "Western track ids must be distinct");
  assert.equal(new Set(west.map((t) => t.workId)).size, 4, "no two Western tracks may share a parent work/composition");
  assert.ok(new Set(west.map((t) => t.composer)).size >= 3, "at least 3 different Western composers");
  assert.deepEqual([...westSrcs].sort(), ["/audio/yali/aria.mp3", "/audio/yali/chopin-nocturne.mp3", "/audio/yali/prelude.mp3", "/audio/yali/satie-gymnopedie.mp3"]);
  assert.equal(ROOM_MUSIC.anshen.tracks.find((t) => t.group === "west").id, "aria");
  assert.equal(ROOM_MUSIC.jieyu.tracks.find((t) => t.group === "west").id, "nocturne");
  assert.equal(ROOM_MUSIC.anmei.tracks.find((t) => t.group === "west").id, "gymnopedie");
  assert.equal(ROOM_MUSIC.yali.tracks.find((t) => t.group === "west").id, "prelude");
  // Goldberg Variations is allowed ONLY once (anshen Aria); no other Goldberg movement anywhere.
  const goldberg = west.filter((t) => t.workId === "bach-goldberg-variations-bwv988");
  assert.equal(goldberg.length, 1, "Goldberg may appear only once");
  assert.equal(goldberg[0].id, "aria");
  assert.ok(!existsSync(`${root}public/audio/yali/var13.mp3`), "var13 file must be removed");
  assert.ok(!existsSync(`${root}public/audio/yali/var25.mp3`), "var25 file must be removed");
  const catalogue = readFileSync(`${root}src/lib/room-music.ts`, "utf8");
  assert.doesNotMatch(catalogue, /var13|var25/);
  // Existing Chinese tracks are reused, not replaced.
  assert.equal(ROOM_MUSIC.anshen.tracks.find((t) => t.group === "cn").src, "/audio/pingsha.mp3");
  assert.equal(ROOM_MUSIC.jieyu.tracks.find((t) => t.group === "cn").src, "/audio/yangguan.mp3");
  assert.equal(ROOM_MUSIC.anmei.tracks.find((t) => t.group === "cn").src, "/audio/zuiyu.mp3");
});

test("舒壓 is exactly 《孔子讀易》 + clinician-preferred Prelude BWV 846 (《佩蘭》 excluded)", () => {
  const west = ROOM_MUSIC.yali.tracks.filter((t) => t.group === "west");
  assert.equal(west.length, 1);
  assert.equal(west[0].id, "prelude");
  assert.equal(west[0].src, "/audio/yali/prelude.mp3");
  const cn = ROOM_MUSIC.yali.tracks.filter((t) => t.group === "cn");
  assert.equal(cn.length, 1);
  assert.equal(cn[0].id, "kongzi");
  assert.equal(cn[0].src, "/audio/yali/kongzi.mp3");
  assert.ok(!ROOM_MUSIC.yali.tracks.some((t) => t.id === "peilan"), "peilan must not be in 舒壓 room list");
});

test("player defaults to the room's Chinese track on entry, mute respected, one at a time, stops on leave", () => {
  const player = readFileSync(`${root}src/components/room-music.tsx`, "utf8");
  assert.equal(defaultTrack("anshen").id, "pingsha");
  assert.equal(defaultTrack("jieyu").id, "yangguan");
  assert.equal(defaultTrack("anmei").id, "zuiyu");
  assert.equal(defaultTrack("yali").id, "kongzi");
  for (const room of ROOMS) assert.equal(defaultTrack(room).group, "cn", `${room} default must be Chinese`);
  assert.match(player, /defaultTrackFor\(context\)/, "context entry attempts its default");
  assert.match(player, /startTrack\(def\)/, "entry starts the default track");
  assert.match(player, /armDefault\(def\)/, "blocked autoplay arms the default");
  assert.match(player, /pointerdown/, "armed start listens for first tap");
  assert.match(player, /keydown/, "armed start listens for first keypress");
  assert.doesNotMatch(player, /autoPlay|autoplay\s*=/, "no autoplay attribute; play() is attempted in code");
  assert.match(player, /useState<string \| null>\(null\)/, "starts with no track claimed playing");
  assert.match(player, /await el\.play\(\)/, "playing state set only after play() resolves");
  assert.match(player, /mutedVisitRef\.current = contextRef\.current/, "mute records this context visit");
  assert.match(player, /mutedVisitRef\.current === context/, "armed/default start checks the visit mute");
  assert.match(player, /disarmDefault\(\)/, "mute disarms the pending default");
  assert.match(player, /handledContextRef\.current = context/, "context switch is handled once per context");
  assert.match(player, /mutedVisitRef\.current = null/, "context switch resets the visit mute");
  assert.equal((player.match(/new Audio\(\)/g) ?? []).length, 1, "single shared audio element");
  assert.match(player, /hardStop\(\)/, "room change/leave stops the music");
  const root_ = readFileSync(`${root}src/routes/__root.tsx`, "utf8");
  assert.match(root_, /<FloatingMusic \/>/, "floating button mounted in sticky top bar");
  assert.match(root_, /<MusicProvider>/, "single shared player");
  assert.match(player, /MAX_VOLUME = 0\.5/, "gentle volume cap");
  assert.match(player, /DEFAULT_LEVEL = 40/, "default level is 40 x 0.5 = 20% volume");
  assert.match(player, /music-float-btn/, "floating button");
  assert.match(player, /ui\.mute/, "clear mute/off choice");
  const atmo = readFileSync(`${root}src/components/site-atmosphere.tsx`, "utf8");
  for (const r of ROOMS) assert.match(atmo, new RegExp(`"/${r}"`), `no separate ambient track for ${r}`);
  for (const route of ROOMS) {
    const src = readFileSync(`${root}src/routes/${route}.tsx`, "utf8");
    assert.match(src, /RoomMusicSection/, `${route} has in-page music section`);
    assert.match(src, /"music"/, `${route} orders #music in nav`);
  }
});

test("homepage: single Canon track only, default on entry, shared player stops it on room entry", () => {
  assert.equal(HOME_MUSIC.tracks.length, 1, "homepage must have exactly one track (no Chinese/Western choice)");
  const canon = HOME_MUSIC.tracks[0];
  assert.equal(canon.id, "canon");
  assert.equal(canon.src, "/audio/calm.mp3");
  assert.ok(existsSync(`${root}public/audio/calm.mp3`), "pre-existing calm.mp3 restored");
  for (const lang of ["yue", "cmn", "en"]) {
    assert.ok(canon.title[lang] && canon.hint[lang], `canon missing ${lang}`);
    // No homepage explanatory music copy (clinician 2026-10-18): no credit,
    // no home lead/safety text — only the floating button, track name, mute.
    assert.equal(HOME_MUSIC.credit, undefined, `home must carry no rendered credit copy (${lang})`);
    assert.equal(MUSIC_UI[lang].homeLead, undefined, `MUSIC_UI ${lang} must have no homepage lead copy`);
    assert.equal(MUSIC_UI[lang].homeSafety, undefined, `MUSIC_UI ${lang} must have no homepage safety copy`);
  }
  const homeRoute = readFileSync(`${root}src/routes/index.tsx`, "utf8");
  assert.doesNotMatch(homeRoute, /musicCredit/, "homepage route must not render any music credit/explanation");
  const catalogue = readFileSync(`${root}src/lib/room-music.ts`, "utf8");
  assert.doesNotMatch(catalogue, /homeLead|homeSafety|首頁只播|首页只播|homepage plays only/i, "no homepage music explanation copy left in catalogue");
  assert.equal(defaultTrackFor("home").id, "canon", "homepage default is Canon");
  assert.equal(contextFromPath("/"), "home");
  assert.equal(contextFromPath("/anshen"), "anshen");
  assert.equal(contextFromPath("/yali"), "yali");
  assert.equal(contextFromPath("/faq"), null);
  // No Canon/Canon-choice leakage into rooms: rooms keep exactly cn+west above,
  // and homepage track must not appear in any room list.
  for (const room of ROOMS) assert.ok(!ROOM_MUSIC[room].tracks.some((t) => t.id === "canon"), `${room} must not list Canon`);
  const player = readFileSync(`${root}src/components/room-music.tsx`, "utf8");
  assert.match(player, /contextFromPath\(path\)/, "player derives homepage/room context from path");
  assert.match(player, /context === "home"/, "homepage renders single-track (ungrouped) panel");
  // Homepage autoplay like before: immediate play() on entry, retried on
  // pageshow / visibility return if rejected; no muted-autoplay trick.
  assert.match(player, /pageshow/, "homepage retries playback on pageshow");
  assert.match(player, /visibilitychange/, "homepage retries playback when visible again");
  assert.match(player, /contextRef\.current === "home"/, "pageshow/visibility retry is homepage-only");
  assert.doesNotMatch(player, /\.muted\s*=|muted\s*[:=]\s*true/, "no muted-autoplay-then-unmute trick");
  assert.match(player, /isHome/, "homepage panel copy is scoped out");
  // Rooms keep their panel lead/safety/credit; homepage renders none of it.
  assert.match(player, /\{!isHome && \(/, "lead/safety only for rooms");
  assert.match(player, /!isHome && musicSetFor\(context\)\.credit/, "credit only for rooms");
  assert.doesNotMatch(player, /AmbientMusic/, "legacy ambient player must not be resurrected");
  assert.ok(!existsSync(`${root}src/components/ambient-music.tsx`), "ambient-music.tsx stays deleted");
  const doc = readFileSync(`${root}docs/yali-music-licences.md`, "utf8");
  assert.match(doc, /calm\.mp3/, "licence doc lists homepage Canon file");
  assert.match(doc, /never documented/, "licence doc flags undocumented Canon recording provenance");
});
