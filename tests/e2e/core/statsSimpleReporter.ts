import fs from 'fs';
import path from 'path';
import { Interaction } from './interactionStore';

const DATA_DIR = path.resolve(__dirname, '../data');
const filePath = path.join(DATA_DIR, 'interactions.json');


function formatMB(value: number): string {
  return `${value.toFixed(6)} MB`;
}

function formatS(value: number): string {
  return `${value.toFixed(2)}s`;
}

function logGroup(title: string) {
  console.log(`\n\x1b[1m=== ${title} ===\x1b[0m`);
}

function main() {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const all: Interaction[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (all.length === 0) {
    console.warn('⚠️ No interactions recorded.');
    return;
  }

  const byRoute = new Map<string, Interaction[]>();

  for (const entry of all) {
    const key = `${entry.method} ${entry.route}`;
    if (!byRoute.has(key)) byRoute.set(key, []);
    byRoute.get(key)!.push(entry);
  }

  logGroup('Metrics by Route');
  for (const [routeKey, list] of byRoute) {
    const total = list.length;
    const avgTime = list.reduce((a, b) => a + b.requestDuration, 0) / total;
    const avgPayload = list.reduce((a, b) => a + b.payloadSize, 0) / total;
    const avgResponse = list.reduce((a, b) => a + b.responseSize, 0) / total;

    console.log(`${routeKey.padEnd(40)} → ${total}x  ⏱️ ${formatS(avgTime)}  📦 ${formatMB(avgPayload)} ↩️ ${formatMB(avgResponse)}`);
  }

  const longest = [...all].sort((a, b) => b.requestDuration - a.requestDuration)[0];
  const heaviestPayload = [...all].sort((a, b) => b.payloadSize - a.payloadSize)[0];
  const heaviestResponse = [...all].sort((a, b) => b.responseSize - a.responseSize)[0];

  logGroup('🔍 Highlights');
  console.log(`⏳ More time consuming: ${longest.clientApp} ${longest.method} ${longest.route} (${formatS(longest.requestDuration)})`);
  console.log(`📤 Largest payload: ${longest.clientApp} ${heaviestPayload.method} ${heaviestPayload.route} (${formatMB(heaviestPayload.payloadSize)})`);
  console.log(`📥 Biggest response: ${longest.clientApp} ${heaviestResponse.method} ${heaviestResponse.route} (${formatMB(heaviestResponse.responseSize)})`);

  const byApp = new Map<string, Interaction[]>();

  for (const entry of all) {
    if (!byApp.has(entry.app)) byApp.set(entry.app, []);
    byApp.get(entry.app)!.push(entry);
  }

  logGroup('📊 Metrics by App');
  for (const [app, list] of byApp) {
    const total = list.length;
    const avgTime = list.reduce((a, b) => a + b.requestDuration, 0) / total;
    const avgPayload = list.reduce((a, b) => a + b.payloadSize, 0) / total;
    const avgResponse = list.reduce((a, b) => a + b.responseSize, 0) / total;

    console.log(`${app.padEnd(10)} → ${total}x  ⏱️ ${formatS(avgTime)}  📦 ${formatMB(avgPayload)} ↩️ ${formatMB(avgResponse)}`);
  }
}


if (process.env.ENABLE_E2E_LOGS === 'true') {
  main();
}
