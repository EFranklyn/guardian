// tests/e2e/launchers/customer.ts
import { chromium, Page, Browser } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class CustomerApp {
  browser!: Browser;
  page!: Page;

  async launch() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
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