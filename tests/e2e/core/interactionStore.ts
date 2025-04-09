import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(__dirname, '../data');
const DATA_PATH = path.join(DATA_DIR, 'interactions.json');

export type Interaction = {
  url: string;
  payloadSize: number;
  responseSize: number;
  requestStart: string;
  requestEnd: string; 
  requestDuration: number;
  appReferer: string;
  clientApp: string;
  app: string;
  route: string;
  method: string;
  payload?: any;
  response?: any;
  statusCode: number;
};

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify([]));
  }
}

export function resetInteractionsFile() {
  ensureFile();
  fs.writeFileSync(DATA_PATH, JSON.stringify([]));
}

export function writeInteraction(interaction: Interaction) {
  ensureFile();
  const existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Interaction[];
  existing.push(interaction);
  fs.writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2));
}

export function readInteractions(app: string): Interaction[] {
  ensureFile();
  const all = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Interaction[];
  return all.filter((i) => i.app === app);
}