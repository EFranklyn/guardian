// utils/interceptor.ts

import { writeInteraction } from "../core/interactionStore";


export async function interceptAndLog(route: any, request: any, app: string) {
  const method = request.method();
  const url = new URL(request.url());
  const path = url.pathname.replace(/^\/rest/, '');
  const target = process.env.API_URL || 'http://localhost:8000';

  const shouldLog =
    ['POST', 'PUT', 'PATCH', 'GET'].includes(method) &&
    request.url().includes(target);

  if (!shouldLog){
    console.log('[INTERCEPTOR] Skipping request:', method, path, request.url(), target); 
    return await route.continue()
};

  const requestStart = new Date();
  const response = await route.fetch();
  const requestEnd = new Date();

  const headers = request.headers();
  const appReferer = headers['referer'] || headers['referrer'] || 'unknown';
  const clientApp = headers['x-client-app'] || 'unknown';

  let requestBody = undefined;
  try {
    requestBody = await request.postDataJSON();
  } catch (_) {}

  let responseBody = undefined;
  try {
    responseBody = await response.json();
  } catch (_) {}

  const payloadSize = requestBody ? Buffer.byteLength(JSON.stringify(requestBody)) : 0;
  const responseSize = responseBody ? Buffer.byteLength(JSON.stringify(responseBody)) : 0;
  const requestDuration = requestEnd.getTime() - requestStart.getTime();

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
    statusCode: response.status()
  });

  await route.fulfill({ response });
}