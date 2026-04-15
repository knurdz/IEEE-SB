import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'out');

function findFiles(dir, extensions) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, extensions));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const BRAND_COMMENT = '<!-- Designed & Developed By Knurdz -->';

function injectBrandComment(content) {
  return `${BRAND_COMMENT}\n${content.trimEnd()}\n${BRAND_COMMENT}`;
}

const noJekyllPath = path.join(outDir, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');

const htmlFiles = findFiles(outDir, ['.html']);
let totalFixed = 0;

for (const filePath of htmlFiles) {
  const relName = path.relative(outDir, filePath);
  try {
    const original = fs.readFileSync(filePath, 'utf-8');
    const updated = injectBrandComment(original);

    if (original !== updated) {
      fs.writeFileSync(filePath, updated, 'utf-8');
      console.log(`  ✅ ${relName}`);
      totalFixed++;
    }
  } catch (err) {
    console.warn(`  ⚠️  Failed to process ${relName}: ${err.message}`);
  }
}

console.log(`\n✨ Done! Branded ${totalFixed}/${htmlFiles.length} HTML files.`);
