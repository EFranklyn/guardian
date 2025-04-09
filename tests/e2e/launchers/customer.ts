import { chromium, Page, Browser } from '@playwright/test';
import dotenv from 'dotenv';
import { interceptAndLog } from '../interceptors/interceptor';

dotenv.config();

export class CustomerApp {
  browser!: Browser;
  page!: Page;

  async launch() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();

    if (process.env.ENABLE_E2E_LOGS === 'true') {
          await this.page.route('**', (route, request) => interceptAndLog(route, request, 'customer'));
    }

    await this.page.goto(process.env.CUSTOMER_URL || 'http://localhost:3000');
    return this;
  }

  async prepare() {
    await this.page.waitForLoadState('networkidle');
  
    const acceptButton = this.page.locator('[data-test="accept-button"]');
    if (await acceptButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptButton.click();
    }
  }

  async close() {
    await this.browser.close();
  }
}