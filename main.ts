// Fridge Roast entry: emits the one-line roast stored in line.txt as entry.txt.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const sourcePath = resolve(repoRoot, "line.txt");
const roast = readFileSync(sourcePath, "utf8").trim();
if (roast.length < 1 || roast.length > 200) {
  throw new Error(`roast must be 1-200 characters, got ${roast.length}`);
}
const terminators = roast.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !roast.endsWith(terminators[0])) {
  throw new Error("roast must be exactly one sentence");
}
if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
writeFileSync(resolve(targetDir, "entry.txt"), roast, "utf8");
console.log(roast);
