export function createTileManifestRequestInit(): RequestInit {
  const init: RequestInit = {
    cache: 'no-store',
  };
  (init as any).priority = 'high';
  return init;
}

export function appendFreshParamToTileManifestUrl(url: string, pageUrl?: string): string {
  const runtimePageUrl =
    pageUrl ??
    (typeof window !== 'undefined' && window.location?.href
      ? window.location.href
      : (typeof location !== 'undefined' ? location.href : undefined));

  if (!runtimePageUrl) {
    return url;
  }

  try {
    const current = new URL(runtimePageUrl);
    const fresh = current.searchParams.get('fresh');
    if (!fresh) {
      return url;
    }
    const target = new URL(url, runtimePageUrl);
    if (!target.searchParams.has('fresh')) {
      target.searchParams.set('fresh', fresh);
    }
    return target.toString();
  } catch {
    return url;
  }
}
