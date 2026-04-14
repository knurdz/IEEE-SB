/**
 * Post-build script to convert absolute paths to relative paths in
 * the Next.js static export (`out/` directory) so the site works
 * when opened directly via file:// protocol.
 *
 * This version handles:
 * - HTML attributes (src, href, srcset, action, poster)
 * - JSON-embedded paths (in HTML script tags and RSC .txt files)
 * - Escaped JSON paths (\"src\":\"/\")
 * - CSS url() references
 * - JS file paths
 *
 * Usage: node scripts/fix-static-paths.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'out');

/**
 * Recursively find all files with specific extensions in a directory.
 */
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

/**
 * Calculate the relative prefix from a file's location to the out root.
 * e.g. out/events/ieeextreme.html → "../"
 *      out/index.html             → "./"
 *      out/_next/static/css/a.css → "../../../"
 */
function getRelativePrefix(filePath) {
  const relDir = path.relative(outDir, path.dirname(filePath));
  if (!relDir) return './';
  const depth = relDir.split(path.sep).length;
  return '../'.repeat(depth);
}

/**
 * Rewrite absolute paths in file content to relative paths.
 */
function rewritePaths(content, relativePrefix, fileExt = '') {
  let result = content;

  // For JS files, internal _next/ chunk references use import() which resolves
  // relative to the JS file itself, so they need the depth-based prefix.
  // Similarly, Next.js internal RSC payloads rely on the depth prefix to not crash.
  // BUT user assets (images, etc.) are loaded via DOM operations (e.g. img.src)
  // which resolve relative to the HTML page, so they MUST use './'.
  const getPrefix = (pathPart) => {
    if (fileExt === '.js') {
      if (/\.(png|jpe?g|gif|svg|webp|ico|avif|mp4|webm|pdf)$/i.test(pathPart)) {
        return './';
      }
      return relativePrefix;
    }
    return relativePrefix;
  };

  // 1. HTML attributes and basic strings: src="/", href="/", srcset="/", etc.
  // We match "/" that isn't followed by another "/" (protocol relative) or whitespace.
  result = result.replace(
    /((?:src|href|srcset|poster|action|url|content)=["']?)\/(?!\/)(.*?)(["']|[\s>)]|$)/gi,
    (match, prefix, pathPart, suffix) => {
      // Skip external/protocol URLs or data-URIs
      if (pathPart.match(/^(http|https|data:|mailto:|tel:|#)/i)) {
        return match;
      }
      return `${prefix}${getPrefix(pathPart)}${pathPart}${suffix}`;
    }
  );

  // 2. JSON-embedded paths: "src":"/path" or 'src':'/path'
  // Handles standard JSON
  result = result.replace(
    /(["'](?:src|href|url|logo|image|icon|path)["']\s*[:=]\s*["'])\/(?!\/)(.*?)(["'])/gi,
    (match, prefix, pathPart, suffix) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:|#)/i)) {
        return match;
      }
      // Add .html to internal links if they don't have an extension
      let newPath = pathPart;
      if (prefix.includes('href') && !newPath.includes('.') && !newPath.includes('#') && newPath.length > 0) {
        newPath += '.html';
      }
      return `${prefix}${getPrefix(newPath)}${newPath}${suffix}`;
    }
  );

  // 3. Escaped JSON-embedded paths: \"src\":\"/path\"
  // Next.js RSC data often uses this.
  result = result.replace(
    /(\\"(?:src|href|url|logo|image|icon|path)\\"\s*[:=]\s*\\")\/(?!\/)(.*?)(?=\\")/gi,
    (match, prefix, pathPart) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:|#)/i)) {
        return match;
      }
      // Add .html to internal links if they don't have an extension
      let newPath = pathPart;
      if (prefix.includes('href') && !newPath.includes('.') && !newPath.includes('#') && newPath.length > 0) {
        newPath += '.html';
      }
      return `${prefix}${getPrefix(newPath)}${newPath}`;
    }
  );

  // 4. HTML attributes and basic strings: src="/", href="/", etc.
  result = result.replace(
    /((?:src|href|srcset|poster|action|content)=["']?)\/(?!\/)(.*?)(["']|[\s>)]|$)/gi,
    (match, prefix, pathPart, suffix) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:|#)/i)) {
        return match;
      }
      
      let newPath = pathPart;
      
      // Standardize empty or root path to index.html for links
      if (prefix.includes('href')) {
        if (newPath === "" || newPath === "/") {
          newPath = "index.html";
        } else if (!newPath.includes('.') && !newPath.includes('#') && newPath.length > 0) {
          // It's likely a route, append .html
          newPath += '.html';
        }
      }
      
      return `${prefix}${getPrefix(newPath)}${newPath}${suffix}`;
    }
  );

  // 5. CSS url(/path) references (without quotes)
  result = result.replace(
    /(url\s*\(\s*)\/(?!\/)(.*?)(?=\s*\))/gi,
    (match, prefix, pathPart) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:|#)/i)) {
        return match;
      }
      return `${prefix}${getPrefix(pathPart)}${pathPart}`;
    }
  );

  // 6. Plain string literals with absolute paths to image/asset files.
  // These are paths like "/event/image.jpg" or "/logo/icon.svg" that aren't
  // preceded by src= or other HTML attributes.
  result = result.replace(
    /(?<=['"])\/((?:[a-zA-Z0-9_ -]+\/)*[^'"]*\.(?:png|jpe?g|gif|svg|webp|ico|avif|mp4|webm|pdf))(?=['"])/gi,
    (match, pathPart) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:|#)/i)) {
        return match;
      }
      return `${getPrefix(pathPart)}${pathPart}`;
    }
  );

  return result;
}

// --- Main ---
console.log('🔧 Fixing static paths for file:// protocol support...\n');

const extensionsToProcess = ['.html', '.css', '.js', '.txt', '.json', '.webmanifest'];
const files = findFiles(outDir, extensionsToProcess);
let totalFixed = 0;

for (const filePath of files) {
  const relPrefix = getRelativePrefix(filePath);
  const relName = path.relative(outDir, filePath);
  
  // Skip map files as they are binary-ish/generated and usually not needed for runtime
  if (relName.endsWith('.map')) continue;

  try {
    const original = fs.readFileSync(filePath, 'utf-8');
    const fixed = rewritePaths(original, relPrefix, path.extname(filePath).toLowerCase());

    if (original !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf-8');
      console.log(`  ✅ ${relName} (prefix: ${relPrefix})`);
      totalFixed++;
    }
  } catch (err) {
    console.warn(`  ⚠️  Failed to process ${relName}: ${err.message}`);
  }
}

console.log(`\n✨ Done! Fixed ${totalFixed}/${files.length} files.`);
