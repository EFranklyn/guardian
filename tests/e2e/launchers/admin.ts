import { chromium, Page, Browser } from '@playwright/test';
import dotenv from 'dotenv';
import { interceptAndLog } from '../interceptors/interceptor';

dotenv.config();

export class AdminApp {
  browser!: Browser;
  page!: Page;

  async launch() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();

    console.info('[ADMIN] Launching AdminApp...');
    console.info('[ADMIN] Navigating to:', process.env.ADMIN_URL);
    
    if (process.env.ENABLE_E2E_LOGS === 'true') {
      await this.page.route('**', (route, request) => interceptAndLog(route, request, 'admin'));
    }
    
    await this.page.goto(process.env.ADMIN_URL || 'http://localhost:3001');

    return this;
  }

  async login() {
    console.info('[ADMIN] Forcing navigation to /login...');
    await this.page.goto(`${process.env.ADMIN_URL}/login`, { waitUntil: 'networkidle' });

    const currentURL = this.page.url();
    if (!currentURL.includes('/login')) {
      console.info('[ADMIN] Already authenticated, skipping login.');
      return;
    }

    console.info('[ADMIN] Performing login...');
    await this.page.fill('input[aria-label="Username"]', process.env.ADMIN_EMAIL || '');
    await this.page.fill('input[aria-label="Password"]', process.env.ADMIN_PASSWORD || '');
    await this.page.getByRole('button', { name: /sign in/i }).click();

    await this.page.waitForURL('**/dashboard', { timeout: 10000 });
    console.info('[ADMIN] Login successful.');
  }

  async close() {
    console.info('[ADMIN] Closing AdminApp...');
    await this.browser.close();
  }
}