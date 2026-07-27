import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const files = ["sw.js"];

await mkdir(dist, { recursive: true });

await Promise.all(
  files.map((file) => copyFile(resolve(root, file), resolve(dist, file)))
);

console.log(`Copied static runtime files: ${files.join(", ")}`);
