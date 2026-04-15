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

  const normalizeInternalHref = (pathPart) => {
    if (pathPart.startsWith('#')) {
      return `index.html${pathPart}`;
    }

    return pathPart;
  };

  const rewriteInternalHref = (pathPart) => {
    const normalizedPath = normalizeInternalHref(pathPart);
    const routeUrl = new URL(`/${normalizedPath}`, 'https://static.local');

    let routePath = routeUrl.pathname.replace(/^\/+/, '');
    if (!routePath) {
      routePath = 'index.html';
    } else if (!/\.[^/]+$/.test(routePath)) {
      routePath = `${routePath}.html`;
    }

    return `${routePath}${routeUrl.search}${routeUrl.hash}`;
  };

  const rewriteSrcsetValue = (value) => {
    return value
      .split(',')
      .map((entry) => {
        const trimmed = entry.trim();
        if (!trimmed) {
          return trimmed;
        }

        const [url, ...descriptor] = trimmed.split(/\s+/);
        if (!url.startsWith('/') || url.startsWith('//') || url.match(/^(http|https|data:|mailto:|tel:)/i)) {
          return trimmed;
        }

        const pathPart = url.slice(1);
        const rewrittenUrl = `${getPrefix(pathPart)}${pathPart}`;
        return descriptor.length > 0 ? `${rewrittenUrl} ${descriptor.join(' ')}` : rewrittenUrl;
      })
      .join(', ');
  };

  // For JS files, internal _next/ chunk references use import() which resolves
  // relative to the JS file itself, so they need the depth-based prefix.
  // Similarly, Next.js internal RSC payloads rely on the depth prefix to not crash.
  // BUT user assets (images, etc.) are loaded via DOM operations (e.g. img.src)
  // which resolve relative to the HTML page, so they MUST use './'.
  const getPrefix = () => relativePrefix;

  const rewriteTurbopackRuntimePrefix = (value) => {
    if (fileExt !== '.js') {
      return value;
    }

    return value
      .replace(
        'let t="/_next/",r=',
        'let t=(()=>{let e=document?.currentScript?.src;if("string"==typeof e&&e.startsWith("file:")){let t=e.indexOf("/_next/");if(-1!==t)return e.slice(0,t+7)}return"/_next/"})(),r=',
      )
      .replace(
        'if(e)return{src:e.getAttribute("src")};',
        'if(e)return{src:e.src||e.getAttribute("src"),relSrc:e.getAttribute("src")||e.src};',
      )
      .replace(
        'if(e)return{src:e.src||e.getAttribute("src")};',
        'if(e)return{src:e.src||e.getAttribute("src"),relSrc:e.getAttribute("src")||e.src};',
      )
      .replace(
        'if(D("string"==typeof e?N(e):e.src).resolve(),null!=r){',
        'if(D("string"==typeof e?N(e):e.src).resolve(),"string"!=typeof e&&e.relSrc&&e.relSrc!==e.src&&D(e.relSrc).resolve(),null!=r){',
      );
  };

  const rewriteEmbeddedNextAssetStrings = (value) => {
    return value.replace(
      /((?:\\)?["'])\/(_next\/static\/(?:chunks|media)\/[^"'\\\]\s]+)((?:\\)?["'])/g,
      (match, openingQuote, pathPart, closingQuote) => {
        const openingQuoteChar = openingQuote.slice(-1);
        const closingQuoteChar = closingQuote.slice(-1);

        if (openingQuoteChar !== closingQuoteChar) {
          return match;
        }

        return `${openingQuote}${getPrefix(pathPart)}${pathPart}${closingQuote}`;
      },
    );
  };

  if (fileExt === '.js') {
    result = rewriteEmbeddedNextAssetStrings(result);
    result = rewriteTurbopackRuntimePrefix(result);
    return result;
  }

  // 1. HTML attributes and basic strings: src="/", href="/", srcset="/", etc.
  // We match "/" that isn't followed by another "/" (protocol relative) or whitespace.
  result = result.replace(
    /(((src|href|poster|action|url|content)=)(["']))\/(?!\/)(.*?)(\4)/gi,
    (match, prefix, _attrWithEquals, attr, _quote, pathPart, suffix) => {
      // Skip external/protocol URLs or data-URIs
      if (pathPart.match(/^(http|https|data:|mailto:|tel:)/i)) {
        return match;
      }

      const newPath = attr.toLowerCase() === 'href'
        ? rewriteInternalHref(pathPart)
        : normalizeInternalHref(pathPart);

      return `${prefix}${getPrefix(newPath)}${newPath}${suffix}`;
    }
  );

  // 2. JSON-embedded paths: "src":"/path" or 'src':'/path'
  // Handles standard JSON
  result = result.replace(
    /(["'](src|href|url|logo|image|icon|path)["']\s*[:=]\s*["'])\/(?!\/)(.*?)(["'])/gi,
    (match, prefix, key, pathPart, suffix) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:)/i)) {
        return match;
      }

      const newPath = key.toLowerCase() === 'href'
        ? rewriteInternalHref(pathPart)
        : normalizeInternalHref(pathPart);

      return `${prefix}${getPrefix(newPath)}${newPath}${suffix}`;
    }
  );

  // 3. Escaped JSON-embedded paths: \"src\":\"/path\"
  // Next.js RSC data often uses this.
  result = result.replace(
    /(\\"(src|href|url|logo|image|icon|path)\\"\s*[:=]\s*\\")\/(?!\/)(.*?)(?=\\")/gi,
    (match, prefix, key, pathPart) => {
      if (pathPart.match(/^(http|https|data:|mailto:|tel:)/i)) {
        return match;
      }

      const newPath = key.toLowerCase() === 'href'
        ? rewriteInternalHref(pathPart)
        : normalizeInternalHref(pathPart);

      return `${prefix}${getPrefix(newPath)}${newPath}`;
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

  result = result.replace(
    /((?:srcset|imageSrcSet)\s*=\s*["'])(.*?)(["'])/gi,
    (match, prefix, value, suffix) => `${prefix}${rewriteSrcsetValue(value)}${suffix}`
  );

  result = result.replace(
    /(["'](?:srcset|imageSrcSet)["']\s*[:=]\s*["'])(.*?)(["'])/gi,
    (match, prefix, value, suffix) => `${prefix}${rewriteSrcsetValue(value)}${suffix}`
  );

  result = rewriteEmbeddedNextAssetStrings(result);
  result = rewriteTurbopackRuntimePrefix(result);

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
