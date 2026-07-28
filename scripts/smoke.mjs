import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.AZUBIFORGE_URL || "http://127.0.0.1:5174";
const screenshotsDir = "test-results/screenshots";
const routes = [
  ["home", "/"],
  ["course", "/#course"],
  ["review", "/#review"],
  ["exam", "/#exam"],
  ["glossary", "/#glossary"],
  ["docs-ai", "/#docs-ai"]
];

await mkdir(screenshotsDir, { recursive: true });

const browser = await chromium.launch();
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const issues = [];

desktop.on("console", (message) => {
  if (message.type() === "error") issues.push(`console: ${message.text()}`);
});

desktop.on("pageerror", (error) => {
  issues.push(`pageerror: ${error.message}`);
});

await desktop.goto(baseUrl, { waitUntil: "networkidle" });
await desktop.waitForSelector("main h1", { timeout: 10000 });

const homePolish = await desktop.evaluate(() => ({
  streakCalendar: Boolean(document.querySelector(".streak-calendar")),
  streakDays: document.querySelectorAll(".streak-day").length
}));
if (!homePolish.streakCalendar || homePolish.streakDays !== 14) {
  issues.push(`home: streak calendar missing or incomplete (${homePolish.streakDays})`);
}

const desktopChrome = await desktop.evaluate(() => {
  const sidebar = document.querySelector(".sidebar");
  return {
    sidebar: Boolean(sidebar),
    sidebarVisible: sidebar ? getComputedStyle(sidebar).transform === "none" || getComputedStyle(sidebar).position === "sticky" : false,
    navHome: Boolean(document.querySelector('.sidebar [data-nav="home"]'))
  };
});

if (!desktopChrome.sidebar || !desktopChrome.navHome) {
  issues.push("desktop: sidebar navigation missing");
}

const firstChapter = await desktop.evaluate(() => window.AZUBIFORGE_DATA?.chapters?.[0]?.id || "");
routes.splice(2, 0, ["reader", `/#reader/${firstChapter}`]);

for (const [name, path] of routes) {
  await desktop.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await desktop.waitForSelector("main h1", { timeout: 10000 });

  const metrics = await desktop.evaluate(() => ({
    heading: document.querySelector("main h1")?.textContent?.trim() || "",
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    textLength: document.querySelector("main")?.textContent?.trim().length || 0
  }));

  await desktop.screenshot({ path: `${screenshotsDir}/${name}.png`, fullPage: true });
  console.log(`${name}: ${metrics.heading} (${metrics.textLength} chars)`);

  if (!metrics.textLength) issues.push(`${name}: empty main content`);
  if (metrics.scrollWidth > metrics.clientWidth + 2) {
    issues.push(`${name}: horizontal overflow ${metrics.clientWidth}/${metrics.scrollWidth}`);
  }
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForSelector("main h1", { timeout: 10000 });
await mobile.screenshot({ path: `${screenshotsDir}/mobile-home.png`, fullPage: true });

const mobileHome = await mobile.evaluate(() => ({
  menuToggle: Boolean(document.querySelector("[data-sidebar-toggle]")),
  menuVisible: getComputedStyle(document.querySelector("[data-sidebar-toggle]")).display !== "none",
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth
}));

await mobile.click("[data-sidebar-toggle]");
const sidebarOpen = await mobile.evaluate(() => document.body.classList.contains("sidebar-open"));
await mobile.click(".sidebar-close");
const sidebarClosed = await mobile.evaluate(() => !document.body.classList.contains("sidebar-open"));

await mobile.goto(`${baseUrl}/#reader/${firstChapter}`, { waitUntil: "networkidle" });
await mobile.waitForSelector(".mobile-study-dock", { timeout: 10000 });
const mobileReader = await mobile.evaluate(() => ({
  dockVisible: getComputedStyle(document.querySelector(".mobile-study-dock")).display !== "none",
  swipeTabs: Boolean(document.querySelector("[data-swipe-tabs]")),
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth
}));
await mobile.click('[data-reader-tab="practice"]');
await mobile.waitForSelector('[data-filter-group="reader-practice-mode"]', { timeout: 10000 });
const practiceFlash = await mobile.evaluate(() => Boolean(document.querySelector('[data-swipe-deck="reader-practice"], [data-filter-value="flash"].active')));
await mobile.screenshot({ path: `${screenshotsDir}/mobile-reader.png`, fullPage: true });

await mobile.goto(`${baseUrl}/#exam`, { waitUntil: "networkidle" });
await mobile.waitForSelector(".exam-shell", { timeout: 10000 });
await mobile.click('[data-filter-value="mock"]');
await mobile.waitForSelector(".mock-lobby, .mock-runner, .mock-results", { timeout: 10000 });
await mobile.screenshot({ path: `${screenshotsDir}/mobile-exam.png`, fullPage: true });

await mobile.goto(`${baseUrl}/#review`, { waitUntil: "networkidle" });
await mobile.waitForSelector(".review-focus", { timeout: 10000 });
const reviewWrongFilter = await mobile.evaluate(() => Boolean(document.querySelector('[data-filter-group="review-wrong"]')));
await mobile.screenshot({ path: `${screenshotsDir}/mobile-review.png`, fullPage: true });

console.log(`mobile-home: menu=${mobileHome.menuVisible} open=${sidebarOpen} closed=${sidebarClosed}`);
console.log(`mobile-reader: dock=${mobileReader.dockVisible} swipeTabs=${mobileReader.swipeTabs} practiceFlash=${practiceFlash}`);

if (!mobileHome.menuVisible) issues.push("mobile-home: menu toggle hidden");
if (!sidebarOpen) issues.push("mobile-home: sidebar did not open");
if (!sidebarClosed) issues.push("mobile-home: sidebar did not close");
if (!mobileReader.dockVisible) issues.push("mobile-reader: study dock hidden");
if (!mobileReader.swipeTabs) issues.push("mobile-reader: swipe tabs missing");
if (!practiceFlash) issues.push("mobile-reader: practice flash mode missing");
if (!reviewWrongFilter) issues.push("mobile-review: wrong-only filter missing");
if (mobileHome.scrollWidth > mobileHome.clientWidth + 2) {
  issues.push(`mobile-home: horizontal overflow ${mobileHome.clientWidth}/${mobileHome.scrollWidth}`);
}
if (mobileReader.scrollWidth > mobileReader.clientWidth + 2) {
  issues.push(`mobile-reader: horizontal overflow ${mobileReader.clientWidth}/${mobileReader.scrollWidth}`);
}

await browser.close();

if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
}
