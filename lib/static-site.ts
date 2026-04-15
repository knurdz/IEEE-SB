const NEXT_ASSET_MARKER = '/_next/';
const SPECIAL_URL_PATTERN = /^(?:[a-zA-Z][a-zA-Z\d+\-.]*:|\/\/|#)/;

// Inlined at build time from next.config.ts → env.NEXT_PUBLIC_BASE_PATH
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

let cachedStaticRootUrl: string | null | undefined;

export function isFileProtocol() {
  return typeof window !== 'undefined' && window.location.protocol === 'file:';
}

function normalizeStaticPath(path: string) {
  return path.startsWith('/')
    ? path.slice(1)
    : path.replace(/^(?:\.\/|\.\.\/)+/, '').replace(/^\/+/, '');
}

function getRelativePath(fromDirectoryUrl: string, targetUrl: string) {
  const fromUrl = new URL(fromDirectoryUrl);
  const toUrl = new URL(targetUrl);
  const fromSegments = fromUrl.pathname.split('/').filter(Boolean);
  const toSegments = toUrl.pathname.split('/').filter(Boolean);

  let commonSegmentCount = 0;
  while (
    commonSegmentCount < fromSegments.length &&
    commonSegmentCount < toSegments.length &&
    fromSegments[commonSegmentCount] === toSegments[commonSegmentCount]
  ) {
    commonSegmentCount += 1;
  }

  const relativeSegments = [
    ...Array(fromSegments.length - commonSegmentCount).fill('..'),
    ...toSegments.slice(commonSegmentCount),
  ];

  const relativePath = relativeSegments.join('/') || '.';
  return `${relativePath}${toUrl.search}${toUrl.hash}`;
}

function getNextAssetReference() {
  if (typeof document === 'undefined') {
    return null;
  }

  const candidate = document.querySelector<HTMLScriptElement | HTMLLinkElement>(
    'script[src*="_next/"], link[href*="_next/"]',
  );

  if (!candidate) {
    return null;
  }

  return candidate instanceof HTMLScriptElement ? candidate.src : candidate.href;
}

export function getStaticExportRootUrl() {
  if (!isFileProtocol()) {
    return null;
  }

  if (cachedStaticRootUrl !== undefined) {
    return cachedStaticRootUrl;
  }

  const nextAssetReference = getNextAssetReference();
  if (nextAssetReference) {
    const markerIndex = nextAssetReference.indexOf(NEXT_ASSET_MARKER);
    if (markerIndex !== -1) {
      cachedStaticRootUrl = `${nextAssetReference.slice(0, markerIndex)}/`;
      return cachedStaticRootUrl;
    }
  }

  cachedStaticRootUrl = new URL('.', window.location.href).toString();
  return cachedStaticRootUrl;
}

export function resolveStaticAssetUrl(path: string) {
  if (SPECIAL_URL_PATTERN.test(path)) {
    return path;
  }

  // file:// protocol → compute full file URL relative to the static root
  const rootUrl = getStaticExportRootUrl();
  if (rootUrl) {
    const normalizedPath = normalizeStaticPath(path);
    return normalizedPath ? new URL(normalizedPath, rootUrl).toString() : rootUrl;
  }

  // HTTP server (GitHub Pages etc.) → prepend basePath to absolute paths
  if (path.startsWith('/') && BASE_PATH && !path.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${path}`;
  }

  return path;
}

export function resolveStaticFileAssetPath(path: string) {
  if (SPECIAL_URL_PATTERN.test(path)) {
    return path;
  }

  // file:// protocol → compute a relative path from the current page to the asset
  if (isFileProtocol()) {
    const rootUrl = getStaticExportRootUrl();
    if (!rootUrl || typeof window === 'undefined') {
      return path;
    }

    const normalizedPath = normalizeStaticPath(path);
    if (!normalizedPath) {
      return '.';
    }

    const targetUrl = new URL(normalizedPath, rootUrl).toString();
    const currentDirectoryUrl = new URL('.', window.location.href).toString();
    return getRelativePath(currentDirectoryUrl, targetUrl);
  }

  // HTTP server (GitHub Pages etc.) → prepend basePath to absolute paths
  if (path.startsWith('/') && BASE_PATH && !path.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${path}`;
  }

  return path;
}

export function resolveStaticRouteHref(href: string) {
  if (!href.startsWith('/')) {
    return href;
  }

  // file:// protocol → rewrite to relative .html paths
  const rootUrl = getStaticExportRootUrl();
  if (rootUrl) {
    const routeUrl = new URL(href, 'https://static.local');
    let routePath = routeUrl.pathname.replace(/^\/+/, '');

    if (!routePath) {
      routePath = 'index.html';
    } else if (!/\.[^/]+$/.test(routePath)) {
      routePath = `${routePath}.html`;
    }

    return new URL(`${routePath}${routeUrl.search}${routeUrl.hash}`, rootUrl).toString();
  }

  // HTTP server (GitHub Pages etc.) → prepend basePath if missing
  if (BASE_PATH && !href.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${href}`;
  }

  return href;
}

export function getCurrentStaticRoutePathname() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isFileProtocol()) {
    return window.location.pathname;
  }

  const rootUrl = getStaticExportRootUrl();
  if (!rootUrl) {
    return null;
  }

  const currentUrl = new URL(window.location.href);
  const currentPath = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  const rootPath = new URL(rootUrl).pathname;
  let relativePath = currentPath.startsWith(rootPath)
    ? currentPath.slice(rootPath.length)
    : currentPath.replace(/^\/+/, '');

  const hashIndex = relativePath.indexOf('#');
  const hash = hashIndex === -1 ? '' : relativePath.slice(hashIndex);
  relativePath = hashIndex === -1 ? relativePath : relativePath.slice(0, hashIndex);

  const searchIndex = relativePath.indexOf('?');
  const search = searchIndex === -1 ? '' : relativePath.slice(searchIndex);
  relativePath = searchIndex === -1 ? relativePath : relativePath.slice(0, searchIndex);

  let routePath = relativePath.replace(/^\/+/, '');
  if (!routePath || routePath === 'index.html') {
    return `/${search}${hash}`;
  }

  routePath = routePath.replace(/index\.html$/i, '').replace(/\.html$/i, '');
  routePath = routePath.replace(/\/+$/, '');

  return `/${routePath}${search}${hash}`;
}
