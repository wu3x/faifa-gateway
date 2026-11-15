import filenames from "virtual:place-photos";

// Arabic spelling and punctuation variants, plus bilingual card titles.
export function normalizePlaceName(input: string): string {
  return input.normalize("NFKC")
    .split(/\s+[–—-]\s+|\s+\/\s+/)[0]
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase();
}

const index = new Map<string, { order: number; file: string }[]>();
for (const file of filenames) {
  const basename = file.replace(/\.(jpe?g|png|webp|avif)$/i, "");
  // Optional trailing number, separated by spaces, underscores, hyphens or nothing.
  const match = basename.match(/^(.*?)[\s_-]*([0-9٠-٩]+)$/u);
  const name = match ? match[1] : basename;
  const order = match ? Number(match[2].replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660))) : 0;
  const key = normalizePlaceName(name);
  if (!key) continue;
  const group = index.get(key) || [];
  group.push({ order, file });
  index.set(key, group);
}
for (const group of index.values()) group.sort((a, b) => a.order - b.order || a.file.localeCompare(b.file, "ar"));

export function getPlacePhotos(title: string): string[] {
  const key = normalizePlaceName(title);
  const files = index.get(key) || [];
  return files.slice(0, 3).map(({ file }) => import.meta.env.BASE_URL + "place-photos/" + encodeURIComponent(file));
}
