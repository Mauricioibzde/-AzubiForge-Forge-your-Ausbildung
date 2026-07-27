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
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const issues = [];

page.on("console", (message) => {
  if (message.type() === "error") issues.push(`console: ${message.text()}`);
});

page.on("pageerror", (error) => {
  issues.push(`pageerror: ${error.message}`);
});

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForSelector("main h1", { timeout: 10000 });

const firstChapter = await page.evaluate(() => window.AZUBIFORGE_DATA?.chapters?.[0]?.id || "");
routes.splice(2, 0, ["reader", `/#reader/${firstChapter}`]);

for (const [name, path] of routes) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.waitForSelector("main h1", { timeout: 10000 });

  const metrics = await page.evaluate(() => ({
    heading: document.querySelector("main h1")?.textContent?.trim() || "",
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    textLength: document.querySelector("main")?.textContent?.trim().length || 0
  }));

  await page.screenshot({ path: `${screenshotsDir}/${name}.png`, fullPage: true });
  console.log(`${name}: ${metrics.heading} (${metrics.textLength} chars)`);

  if (!metrics.textLength) issues.push(`${name}: empty main content`);
  if (metrics.scrollWidth > metrics.clientWidth + 2) {
    issues.push(`${name}: horizontal overflow ${metrics.clientWidth}/${metrics.scrollWidth}`);
  }
}

await browser.close();

if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
}
