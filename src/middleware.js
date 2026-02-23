import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  const method = context.request.method; // Check if it's GET, POST, etc.

  // 1. Only redirect GET requests (prevents breaking forms/POST)
  // 2. Ignore the homepage
  // 3. Ignore files (images, assets)
  // 4. Check if it's missing the trailing slash
  if (
    method === 'GET' && 
    pathname !== '/' && 
    !pathname.endsWith('/') && 
    !pathname.includes('.')
  ) {
    const newUrl = new URL(context.request.url);
    newUrl.pathname = pathname + '/';
    
    return context.redirect(newUrl.toString(), 301);
  }

  return next();
});