import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.AZUBIFORGE_URL || "http://127.0.0.1:5174";
const screenshotsDir = "test-results/screenshots";
const routes = [
  ["home", "/"],
  ["course", "/#course"],
  ["review", "/#review"],
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
  bottomNav: Boolean(document.querySelector(".bottom-nav")),
  bottomVisible: getComputedStyle(document.querySelector(".bottom-nav")).display !== "none",
  moreButton: Boolean(document.querySelector("[data-more-nav]")),
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth
}));

await mobile.click("[data-more-nav]");
const moreOpen = await mobile.evaluate(() => !document.querySelector("[data-more-sheet]")?.hidden);
await mobile.click("[data-more-close]");

await mobile.goto(`${baseUrl}/#reader/${firstChapter}`, { waitUntil: "networkidle" });
await mobile.waitForSelector(".mobile-study-dock", { timeout: 10000 });
const mobileReader = await mobile.evaluate(() => ({
  dockVisible: getComputedStyle(document.querySelector(".mobile-study-dock")).display !== "none",
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth
}));
await mobile.screenshot({ path: `${screenshotsDir}/mobile-reader.png`, fullPage: true });

await mobile.goto(`${baseUrl}/#review`, { waitUntil: "networkidle" });
await mobile.waitForSelector(".review-focus", { timeout: 10000 });
await mobile.screenshot({ path: `${screenshotsDir}/mobile-review.png`, fullPage: true });

console.log(`mobile-home: bottomNav=${mobileHome.bottomVisible} more=${moreOpen}`);
console.log(`mobile-reader: dock=${mobileReader.dockVisible}`);

if (!mobileHome.bottomVisible) issues.push("mobile-home: bottom nav hidden");
if (!moreOpen) issues.push("mobile-home: more sheet did not open");
if (!mobileReader.dockVisible) issues.push("mobile-reader: study dock hidden");
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

