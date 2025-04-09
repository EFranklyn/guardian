import { writeInteraction } from '../core/interactionStore';
import { fetch as nodeFetch } from 'undici';

export async function interceptAndLog(route: any, request: any, app: string) {
  const method = request.method();
  const url = new URL(request.url());
  const path = url.pathname.replace(/^\/rest/, '');
  const target = process.env.API_URL || 'http://localhost:8000';

  const shouldLog =
    ['POST', 'PUT', 'PATCH', 'GET'].includes(method) &&
    request.url().includes(target);

  if (!shouldLog) return await route.continue();

  const headers = request.headers();
  const appReferer = headers['referer'] || headers['referrer'] || 'unknown';
  const clientApp = headers['x-client-app'] || 'unknown';

  let requestBody: any = undefined;
  const contentType = headers['content-type'] || '';
  try {
    const raw = await request.postData();
    if (contentType.includes('application/x-www-form-urlencoded')) {
      requestBody = Object.fromEntries(new URLSearchParams(raw || ''));
    } else {
      requestBody = raw ? JSON.parse(raw) : undefined;
    }
  } catch (_) {}

  const start = performance.now();

  let finalBody: any = undefined;
  if (requestBody) {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      finalBody = new URLSearchParams(requestBody).toString();
    } else {
      finalBody = JSON.stringify(requestBody);
    }
  }

  const preparedHeaders = {
    ...headers,
  };

  if (requestBody && !headers['content-type']) {
    preparedHeaders['Content-Type'] = 'application/json';
  }

  let responseBody: any = null;
  let rawBody = '';
  let statusCode = 0;
  let responseSize = 0;
  let responseHeaders: any = {};
  let requestStart = new Date();
  let requestEnd = new Date();

  try {
    const res = await nodeFetch(request.url(), {
      method,
      headers: preparedHeaders,
      body: finalBody,
    });

    requestEnd = new Date();

    statusCode = res.status;
    responseHeaders = Object.fromEntries(res.headers.entries());
    rawBody = await res.text();

    try {
      responseBody = JSON.parse(rawBody);
    } catch {
      responseBody = rawBody;
    }

    responseSize = Buffer.byteLength(rawBody) / 1024 / 1024; // MB

    await route.fulfill({
      status: statusCode,
      headers: responseHeaders,
      body: rawBody,
    });
  } catch (err) {
    console.error('Erro ao enviar requisição manual:', err);
    await route.abort();
    return;
  }

  const payloadSize = requestBody ? Buffer.byteLength(JSON.stringify(requestBody)) / 1024 / 1024 : 0; // MB
  const requestDuration = (performance.now() - start) / 1000; // seconds, mais preciso

  writeInteraction({
    app,
    route: path,
    method,
    url: request.url(),
    payloadSize,
    responseSize,
    requestStart: requestStart.toISOString(),
    requestEnd: requestEnd.toISOString(),
    requestDuration,
    appReferer,
    clientApp,
    payload: requestBody,
    response: responseBody,
    statusCode
  });
}
