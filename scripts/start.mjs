// ═══════════════════════════════════════════════════════════
// scripts/start.mjs
//
// Avvia insieme:
//   1. Generatore gallery (subito + ogni volta che cambia una foto)
//   2. ng serve (dev server Angular)
//
// USO: npm start
// ═══════════════════════════════════════════════════════════

import { watch, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const GALLERY_DIR = 'public/images/gallery';
const IMAGE_EXTS  = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// ── 1. Genera subito ────────────────────────────────────────
async function runGenerator() {
  return new Promise(resolve => {
    const p = spawn('node', ['scripts/generate-gallery.mjs'], { stdio: 'inherit', shell: true });
    p.on('close', resolve);
  });
}

await runGenerator();

// ── 2. Watcher: rigenera quando si aggiunge/rimuove una foto ─
let debounce = null;

watch(GALLERY_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  const ext = extname(filename).toLowerCase();
  if (!IMAGE_EXTS.has(ext) && filename !== 'manifest.json') return;
  if (filename === 'manifest.json') return; // evita loop

  clearTimeout(debounce);
  debounce = setTimeout(async () => {
    console.log(`\n[gallery] Rilevata modifica: ${filename} — rigenerazione...`);
    await runGenerator();
    console.log('[gallery] ✓ manifest.json aggiornato\n');
  }, 300);
});

console.log(`[gallery] Watcher attivo su ${GALLERY_DIR}`);

// ── 3. Avvia ng serve ───────────────────────────────────────
const ng = spawn('npx', ['ng', 'serve', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
});

ng.on('close', code => process.exit(code ?? 0));
process.on('SIGINT',  () => ng.kill('SIGINT'));
process.on('SIGTERM', () => ng.kill('SIGTERM'));
