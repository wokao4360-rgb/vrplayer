/**
 * Cloudflare Pages Function: 同源图片代理
 * 路由：GET /_img?u=<encoded_url>
 *
 * 仅代理白名单域名的图片，解决 i.ibb.co / s41.ax1x.com 在国内作为第三方子资源时的稳定性和 CORS 问题。
 */

const ALLOWED_HOSTS = ['i.ibb.co', 's41.ax1x.com'];

export async function onRequestGet(context: { request: Request }): Promise<Response> {
  const { request } = context;
  const url = new URL(request.url);

  const encoded = url.searchParams.get('u');
  if (!encoded) {
    return new Response('Missing query parameter: u', { status: 400 });
  }

  let target: URL;
  try {
    const decoded = decodeURIComponent(encoded);
    target = new URL(decoded);
  } catch {
    return new Response('Invalid URL', { status: 400 });
  }

  // 只允许 https
  if (target.protocol !== 'https:') {
    return new Response('Only https is allowed', { status: 400 });
  }

  // 只允许白名单 host
  if (!ALLOWED_HOSTS.includes(target.hostname)) {
    return new Response(`Hostname not allowed: ${target.hostname}`, { status: 400 });
  }

  // 构造上游请求头
  const upstreamHeaders = new Headers();
  upstreamHeaders.set(
    'User-Agent',
    'Mozilla/5.0 (compatible; VRPlayerImageProxy/1.0; +https://example.com)'
  );
  upstreamHeaders.set(
    'Accept',
    'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
  );

  let upstreamResp: Response;
  try {
    upstreamResp = await fetch(target.toString(), {
      headers: upstreamHeaders,
      cf: {
        cacheEverything: true,
        cacheTtl: 60 * 60 * 24 * 30, // 30 天
      } as any,
    });
  } catch {
    return new Response('Upstream fetch failed', { status: 502 });
  }

  const fallbackContentType = 'image/jpeg';
  const contentType = upstreamResp.headers.get('content-type') || fallbackContentType;

  // 上游非 2xx：按原状态码返回简短文本提示
  if (!upstreamResp.ok) {
    const status = upstreamResp.status || 502;
    const text = `Upstream error: ${status}`;
    return new Response(text, {
      status,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }

  const respHeaders = new Headers();
  respHeaders.set('Content-Type', contentType);
  respHeaders.set('Access-Control-Allow-Origin', '*');
  respHeaders.set('Cache-Control', 'public, max-age=2592000, immutable');

  // 以流方式透传上游 body
  return new Response(upstreamResp.body, {
    status: 200,
    headers: respHeaders,
  });
}


