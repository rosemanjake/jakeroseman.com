// Astro emits the original JPG/PNG for every imported image, even when only
// optimized variants are referenced. Delete any dist/_astro image that no
// built HTML file points at.
import { readdir, readFile, unlink, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

let html = "";
for await (const path of walk(dist)) {
  if (path.endsWith(".html")) html += await readFile(path, "utf8");
}

let pruned = 0;
let bytes = 0;
for (const file of await readdir(join(dist, "_astro"))) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  if (html.includes(file)) continue;
  const path = join(dist, "_astro", file);
  bytes += (await stat(path)).size;
  await unlink(path);
  pruned++;
}
console.log(`pruned ${pruned} unreferenced originals (${(bytes / 1e6).toFixed(1)} MB)`);
