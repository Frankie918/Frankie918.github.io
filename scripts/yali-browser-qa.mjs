import { chromium } from "playwright";
// Usage: build the static site, serve dist/client (e.g. python3 -m http.server 4317), then
//   node scripts/yali-browser-qa.mjs   (env: QA_BASE, QA_OUT)
const BASE = process.env.QA_BASE ?? "http://127.0.0.1:4317";
const OUT = process.env.QA_OUT ?? "/tmp/yali-shots";
await import("node:fs").then((fs) => fs.mkdirSync(OUT, { recursive: true }));
const browser = await chromium.launch();
const results = [];
const ok = (name, cond, extra = "") => { results.push(`${cond ? "PASS" : "FAIL"} ${name} ${extra}`); };

async function ctx(viewport, lang = "yue", opts = {}) {
  const c = await browser.newContext({ viewport, deviceScaleFactor: 1, ...opts });
  await c.addInitScript((l) => { try { localStorage.setItem("shenxin-lang", l); } catch {} }, lang);
  await c.route(/goatcounter|zgo\.at/, (r) => r.abort());
  await c.addInitScript(() => {
    const orig = HTMLMediaElement.prototype.play;
    window.__aud = [];
    HTMLMediaElement.prototype.play = function () { if (!window.__aud.includes(this)) window.__aud.push(this); return orig.call(this); };
  });
  return c;
}

// ---------- desktop yue: full interaction run ----------
{
  const c = await ctx({ width: 1366, height: 900 });
  const page = await c.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => m.type() === "error" && !/ERR_FAILED/.test(m.text()) && errors.push(m.text()));
  const audioReq = []; page.on("request", (r) => r.url().includes("/audio/") && audioReq.push(r.url()));
  await page.goto(`${BASE}/yali/`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  // simulate gestures elsewhere on the page (ambient music elsewhere starts on gestures)
  await page.mouse.click(5, 400); await page.keyboard.press("Tab");
  await page.waitForTimeout(1500);
  ok("no audio requested before user starts music", audioReq.length === 0, JSON.stringify(audioReq));
  ok("no global ambient toggle on /yali", (await page.locator(".ambient-toggle").count()) === 0);
  ok("no stop pill before play", (await page.locator(".calm-stop").count()) === 0);
  ok("h1 is 舒壓", (await page.locator("h1").innerText()).trim() === "舒壓");
  const navText = await page.locator("nav ul").first().innerText();
  ok("nav order starts with 先呼吸, 跟住做", /先呼吸[\s\S]*跟住做[\s\S]*身體訊號/.test(navText), navText.replace(/\n/g, "|"));
  ok("room jump has 3 other rooms", (await page.locator("header a[href='/anshen'], header a[href='/jieyu'], header a[href='/anmei']").count()) === 3);
  await page.screenshot({ path: `${OUT}/desktop-yali-hero.png` });
  await page.screenshot({ path: `${OUT}/desktop-yali-full.png`, fullPage: true });

  // breathing circle
  await page.locator("#breath button", { hasText: "開始半分鐘" }).click();
  await page.waitForTimeout(1200);
  await page.locator("#breath").screenshot({ path: `${OUT}/desktop-breath-running.png` });
  await page.locator("#breath button", { hasText: "停" }).first().click().catch(() => {});

  // follow lesson toggle
  const done = page.locator("#follow button[aria-pressed]").first();
  await done.click();
  ok("follow lesson toggles", (await done.getAttribute("aria-pressed")) === "true");

  // body signals
  await page.locator("#feel button", { hasText: "肩頸硬" }).click();
  await page.locator("#feel button", { hasText: "心跳快" }).click();
  const cards = await page.locator("#feel article").count();
  ok("body signals show 2 cards", cards === 2, `cards=${cards}`);
  ok("heart card has urgent advice", (await page.locator("#feel article").nth(1).innerText()).includes("急症室"));
  await page.locator("#feel").screenshot({ path: `${OUT}/desktop-feel-selected.png` });

  // shoulder guide
  await page.locator("#shoulder button", { hasText: "開始" }).click();
  await page.waitForTimeout(500);
  const t1 = await page.locator("#shoulder p[aria-live]").innerText();
  ok("shoulder guide starts at prompt 1", t1.includes("坐穩。雙腳"), t1);
  await page.waitForTimeout(8300);
  const t2 = await page.locator("#shoulder p[aria-live]").innerText();
  ok("shoulder guide advances after ~8s", t2.includes("牙關"), t2);
  await page.locator("#shoulder").screenshot({ path: `${OUT}/desktop-shoulder-running.png` });
  await page.locator("#shoulder button", { hasText: /^停$/ }).click();
  ok("shoulder guide stops", (await page.locator("#shoulder p[aria-live]").innerText()).includes("已停"));

  // park
  await page.fill("#yali-what", "份報告禮拜五要交");
  await page.fill("#yali-step", "開個檔，寫好標題");
  await page.locator("#park button", { hasText: "暫存" }).click();
  await page.fill("#yali-what", "要覆好多電郵");
  await page.locator("#park button", { hasText: "暫存" }).click();
  ok("park list has 2", (await page.locator("#park ul li").count()) === 2);
  await page.locator("#park li button", { hasText: "細步做咗" }).click();
  ok("park step done toggles", (await page.locator("#park li button[aria-pressed='true']").count()) === 1);
  await page.locator("#park").screenshot({ path: `${OUT}/desktop-park.png` });

  // acupoints
  await page.locator("#acu button[aria-label='合谷']").first().click().catch(async () => { await page.locator("#acu button", { hasText: "合谷" }).first().click(); });
  const acuText = await page.locator("#acu").innerText();
  ok("acupoint shows shared location + pregnancy caution for 合谷", acuText.includes("第一、二掌骨之間") && acuText.includes("孕婦請勿自行按"));
  await page.locator("#acu").screenshot({ path: `${OUT}/desktop-acu-hegu.png` });

  // hour lamp + clinic card
  await page.locator("#play button", { hasText: "申" }).click();
  const card = await page.locator("#play pre").innerText().catch(() => "");
  ok("clinic card records 舒壓 activities", card.includes("舒壓") && card.includes("留意到") && card.includes("跟住做"), card.replace(/\n/g, " | "));

  // music
  ok("all track buttons default off", (await page.locator(".track-btn[aria-pressed='true']").count()) === 0);
  await page.locator(".track-btn", { hasText: "佩蘭" }).click();
  await page.waitForTimeout(3500);
  const state = await page.evaluate(() => {
    const a = [...document.querySelectorAll("audio")];
    return { inDom: a.length };
  });
  const st = await page.evaluate(() => window.__aud.map((a) => ({ paused: a.paused, loop: a.loop, vol: a.volume, src: a.src })));
  ok("music actually playing, looped, gentle volume", st.length === 1 && !st[0].paused && st[0].loop && st[0].vol > 0.15 && st[0].vol <= 0.5, JSON.stringify(st));
  ok("music requested only after click", audioReq.some((u) => u.endsWith("/audio/yali/peilan.mp3")), JSON.stringify(audioReq));
  ok("stop pill visible while playing", await page.locator(".calm-stop").isVisible());
  ok("track pressed state", (await page.locator(".track-btn[aria-pressed='true']").count()) === 1);
  await page.screenshot({ path: `${OUT}/desktop-music-playing.png` });
  await page.locator("#music").screenshot({ path: `${OUT}/desktop-music-section-playing.png` });
  // switch track: only one plays
  await page.locator(".track-btn", { hasText: "前奏曲" }).click();
  await page.waitForTimeout(800);
  ok("switching track keeps one active", (await page.locator(".track-btn[aria-pressed='true']").count()) === 1);
  await page.locator(".calm-stop").click();
  await page.waitForTimeout(900);
  const st2 = await page.evaluate(() => window.__aud.map((a) => ({ paused: a.paused, t: a.currentTime })));
  ok("audio paused and rewound after stop", st2.every((a) => a.paused && a.t === 0), JSON.stringify(st2));
  ok("stop pill hides after stop", (await page.locator(".calm-stop").count()) === 0);
  ok("no track active after stop", (await page.locator(".track-btn[aria-pressed='true']").count()) === 0);

  // care + view fold
  const care = await page.locator("#care").innerText();
  ok("care section has crisis line verbatim", care.includes("如果你有傷害自己或者唔想再生存嘅念頭"));
  ok("care booking link points to home #booking", (await page.locator("#care a").getAttribute("href")) === "/#booking");
  await page.locator("#care").screenshot({ path: `${OUT}/desktop-care.png` });
  ok("view folded by default", !(await page.locator("#view details").evaluate((d) => d.open)));
  await page.locator("#view summary").click();
  ok("view opens", await page.locator("#view details").evaluate((d) => d.open));
  ok("no console/page errors", errors.length === 0, errors.join(" ; "));
  await c.close();
}

// ---------- home integration ----------
for (const [vp, tag] of [[{ width: 1366, height: 900 }, "desktop"], [{ width: 390, height: 844 }, "mobile"]]) {
  const c = await ctx(vp);
  const page = await c.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  ok(`${tag} home feeling pick has 舒壓`, (await page.locator("a[href='/yali#breath']").count()) === 1);
  ok(`${tag} home room card links /yali`, (await page.locator("#rooms a[href='/yali']").count()) === 1);
  await page.screenshot({ path: `${OUT}/${tag}-home-hero.png` });
  await page.locator("#rooms").screenshot({ path: `${OUT}/${tag}-home-rooms.png` });
  await c.close();
}

// ---------- mobile, 3 languages ----------
for (const lang of ["yue", "cmn", "en"]) {
  const c = await ctx({ width: 390, height: 844 }, lang, { isMobile: true, hasTouch: true });
  const page = await c.newPage();
  await page.goto(`${BASE}/yali/`, { waitUntil: "load" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/mobile-${lang}-hero.png` });
  await page.screenshot({ path: `${OUT}/mobile-${lang}-full.png`, fullPage: true });
  const h1 = await page.locator("h1").innerText();
  ok(`mobile ${lang} h1`, { yue: "舒壓", cmn: "舒壓", en: "Stress Relief" }[lang] === h1.trim(), h1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(`mobile ${lang} no horizontal overflow`, overflow <= 1, `overflow=${overflow}`);
  if (lang !== "yue") {
    const txt = await page.locator("main, body").first().innerText();
    const cant = (txt.match(/[嘅咗唔喺嚟啲冇嘢睇攰瞓撳畀]/g) || []);
    ok(`mobile ${lang} page shows no Cantonese-only chars`, cant.length === 0, cant.slice(0, 10).join(""));
  }
  if (lang === "en") {
    await page.locator("#music").scrollIntoViewIfNeeded();
    await page.locator("#music").screenshot({ path: `${OUT}/mobile-en-music.png` });
  }
  await c.close();
}

// ---------- reduced motion ----------
{
  const c = await ctx({ width: 390, height: 844 }, "yue", { reducedMotion: "reduce" });
  const page = await c.newPage();
  await page.goto(`${BASE}/yali/`, { waitUntil: "load" });
  const still = await page.locator(".quiet-orb.is-still").count();
  ok("reduced motion: floating orb is still", still === 1);
  await page.locator("#shoulder").scrollIntoViewIfNeeded();
  await page.locator("#shoulder button", { hasText: "開始" }).click();
  const tr = await page.locator(".guide-dots > span").first().evaluate((e) => getComputedStyle(e).transitionDuration);
  ok("reduced motion: progress dots have no transition", tr === "0s", tr);
  await c.close();
}

// ---------- leaving the room stops music ----------
{
  const c = await ctx({ width: 1366, height: 900 });
  const page = await c.newPage();
  await page.goto(`${BASE}/yali/`, { waitUntil: "load" });
  await page.locator(".track-btn", { hasText: "詠歎調" }).click();
  await page.waitForTimeout(1500);
  const before = await page.evaluate(() => window.__aud.filter((a) => !a.paused).length);
  await page.locator("header a[href='/anmei']").click();
  await page.waitForURL(/anmei/);
  await page.waitForTimeout(800);
  const after = await page.evaluate(() => window.__aud.filter((a) => !a.paused && a.src.includes("/audio/yali/")).length);
  ok("client-side navigation away stops room music", before === 1 && after === 0, `before=${before} after=${after}`);
  await c.close();
}

// ---------- other rooms unaffected ----------
{
  const c = await ctx({ width: 1366, height: 900 });
  const page = await c.newPage();
  for (const r of ["anshen", "jieyu", "anmei"]) {
    await page.goto(`${BASE}/${r}/`, { waitUntil: "load" });
    ok(`${r} has no ambient autoplay toggle`, (await page.locator(".ambient-toggle").count()) === 0);
    ok(`${r} has floating music button, default off`, (await page.locator(".music-float-btn").count()) === 1 && (await page.locator(".track-btn[aria-pressed='true']").count()) === 0);
    ok(`${r} room-jump includes 舒壓`, (await page.locator("header a[href='/yali']").count()) === 1);
  }
  await page.goto(`${BASE}/anshen/`, { waitUntil: "load" });
  await page.locator("header").screenshot({ path: `${OUT}/desktop-anshen-header-jump.png` });
  await c.close();
}

await browser.close();
console.log(results.join("\n"));
console.log(results.some((r) => r.startsWith("FAIL")) ? "SOME FAILED" : "ALL PASS");
