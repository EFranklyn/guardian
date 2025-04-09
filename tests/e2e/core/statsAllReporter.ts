// utils/logAllInteractions.ts
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
    return;
  }

  logGroup('📄 All calls recorded');
  for (const { app, method, route, url, requestDuration, payloadSize, responseSize } of all) {
    console.log(`• [${app}] ${method} ${route.padEnd(30)} → ${formatS(requestDuration)} | 📤 ${formatMB(payloadSize)} | 📥 ${formatMB(responseSize)} | 🔗 ${url}`);
  }

  const groupedByApp = new Map<string, Interaction[]>();
  for (const i of all) {
    if (!groupedByApp.has(i.app)) groupedByApp.set(i.app, []);
    groupedByApp.get(i.app)!.push(i);
  }

  logGroup('📦 Calls grouped by App');
  for (const [app, list] of groupedByApp) {
    console.log(`\n📌 App: ${app}`);
    for (const { method, route, requestDuration } of list) {
      console.log(`- ${method} ${route} (${formatS(requestDuration)})`);
    }
  }

  const mostFrequent = [...all.reduce((acc, i) => {
    const key = `${i.app} ${i.method} ${i.route}`;
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map<string, number>())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  logGroup('📈 Most popular routes');
  for (const [key, count] of mostFrequent) {
    console.log(`→ ${key} (${count}x)`);
  }
}

if (process.env.ENABLE_E2E_LOGS === 'true') {
    main();
  }
  