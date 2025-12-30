/**
 * Cloudflare Pages Function: 图片代理
 * GET /__img?u=<encoded_url>
 * 
 * 只代理白名单域名的图片，避免直接访问第三方资源导致的连接问题
 */

// 允许代理的白名单域名
const ALLOWED_HOSTNAMES = ['i.ibb.co'];

export async function onRequestGet(context: { request: Request; env: any }): Promise<Response> {
  const { request } = context;
  const url = new URL(request.url);
  
  // 解析查询参数 u
  const encodedUrl = url.searchParams.get('u');
  if (!encodedUrl) {
    return new Response('Missing parameter: u', { status: 400 });
  }
  
  // 解码 URL
  let targetUrl: URL;
  try {
    targetUrl = new URL(decodeURIComponent(encodedUrl));
  } catch (error) {
    return new Response('Invalid URL format', { status: 400 });
  }
  
  // 检查域名白名单
  if (!ALLOWED_HOSTNAMES.includes(targetUrl.hostname)) {
    return new Response(`Hostname not allowed: ${targetUrl.hostname}`, { status: 400 });
  }
  
  // 使用 Cloudflare 缓存 fetch 远端图片
  let resp: Response;
  try {
    resp = await fetch(targetUrl.toString(), {
      cf: {
        cacheEverything: true,
        cacheTtl: 60 * 60 * 24 * 30, // 30 天缓存
      },
    });
  } catch (error) {
    return new Response(`Failed to fetch image: ${error}`, { status: 502 });
  }
  
  // 检查响应状态
  if (!resp.ok) {
    return new Response(`Upstream error: ${resp.status} ${resp.statusText}`, { status: 502 });
  }
  
  // 获取 content-type
  const contentType = resp.headers.get('content-type') || 'image/jpeg';
  
  // 构建响应头
  const headers = new Headers();
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'public, max-age=2592000, immutable');
  headers.set('Access-Control-Allow-Origin', '*');
  
  // 返回流式响应
  return new Response(resp.body, {
    status: 200,
    headers,
  });
}

