// ═══════════════════════════════════════════════════════════
// generate-gallery.mjs
//
// Scansiona public/images/gallery/<categoria>/<file>
// e genera:
//   1. src/app/data/gallery-generated.ts  (usato da Angular)
//   2. public/images/gallery/manifest.json (letto a runtime)
//
// UTILIZZO:
//   npm run gen-gallery
//   (gira automaticamente con: npm start / npm run build)
//
// Per aggiungere foto: metti i file nella cartella giusta e
// riesegui npm run gen-gallery (oppure riavvia npm start).
// ═══════════════════════════════════════════════════════════

import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const GALLERY_DIR  = 'public/images/gallery';
const OUT_TS       = 'src/app/data/gallery-generated.ts';
const OUT_JSON     = 'public/images/gallery/manifest.json';
const IMAGE_EXTS   = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

/** "cambi-automatici" → "Cambi Automatici" */
function toLabel(folder) {
  return folder.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/** Genera un testo alt leggibile dal nome file */
function toAlt(filename, categoryLabel) {
  const name = basename(filename, extname(filename))
    .replace(/^(gallery-\d+)$/, '')          // rimuove "gallery-01" generico
    .replace(/WhatsApp Image \S+ at \S+/i, '') // rimuove prefissi WhatsApp
    .replace(/^[_\-a-z0-9]+$/i, '')          // rimuove nomi incomprensibili
    .trim();
  return name || categoryLabel;
}

// Leggi le categorie (= sottocartelle)
const categories = readdirSync(GALLERY_DIR)
  .filter(f => statSync(join(GALLERY_DIR, f)).isDirectory())
  .sort();

const lines = [];
lines.push(`// ─────────────────────────────────────────────────────────────`);
lines.push(`// FILE GENERATO AUTOMATICAMENTE — esegui: npm run gen-gallery`);
lines.push(`// Non modificare manualmente.`);
lines.push(`// ─────────────────────────────────────────────────────────────`);
lines.push(`import type { GalleryImage } from '../models/models';`);
lines.push(``);
lines.push(`export const GALLERY_IMAGES: GalleryImage[] = [`);

for (const cat of categories) {
  const label = toLabel(cat);
  const catDir = join(GALLERY_DIR, cat);
  const files = readdirSync(catDir)
    .filter(f => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) continue;

  lines.push(`  // ── ${label} ${'─'.repeat(Math.max(0, 50 - label.length))}`);
  for (const file of files) {
    // URL-encoda il nome file (gestisce spazi e caratteri speciali)
    const encodedFile = encodeURIComponent(file);
    const src = `images/gallery/${cat}/${encodedFile}`;
    const alt = toAlt(file, label);
    lines.push(`  { src: '${src}', alt: '${alt}' },`);
  }
  lines.push(``);
}

lines.push(`];`);
lines.push(``);

// ── Genera manifest.json (letto a runtime dal GalleryService) ─
const manifest = {};
for (const cat of categories) {
  const catDir = join(GALLERY_DIR, cat);
  const files = readdirSync(catDir)
    .filter(f => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort();
  if (files.length === 0) continue;
  const label = toLabel(cat);
  manifest[cat] = files.map(file => ({
    src: `images/gallery/${cat}/${encodeURIComponent(file)}`,
    alt: toAlt(file, label),
  }));
}

writeFileSync(OUT_TS, lines.join('\n'), 'utf8');
writeFileSync(OUT_JSON, JSON.stringify(manifest, null, 2), 'utf8');

let total = 0;
for (const cat of categories) {
  total += readdirSync(join(GALLERY_DIR, cat)).filter(f => IMAGE_EXTS.has(extname(f).toLowerCase())).length;
}
console.log(`✓ Generato ${OUT_TS}`);
console.log(`✓ Generato ${OUT_JSON}`);
console.log(`  Categorie: ${categories.join(', ')}`);
console.log(`  Foto totali: ${total}`);
