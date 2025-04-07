import { _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class POSApp {
  app!: ElectronApplication;
  page!: Page;

  async launch() {
    this.app = await electron.launch({
      executablePath: process.env.POS_LAUNCH_PATH || 'C:/Program Files/foodinn-pos/foodinn-pos.exe',
      args: [],
    });
    this.page = await this.app.firstWindow();
    return this;
  }

  async launchToUse() {
    await this.launch();
    await this.configApiIfNotConfig();
    await this.login();

    const header = this.page.getByText('menuWalk');
    console.info('[POS] Waiting for POS main screen to become visible...');
    const ready = await header.waitFor({ state: 'visible', timeout: 120_000 }).then(() => true).catch(() => false);

    if (!ready) {
      console.info('[POS] POS main screen was not detected after login.');
    } else {
      console.info('[POS] POS main screen successfully detected.');
    }

    return this;
  }

  async login() {
    console.info('[POS] Initiating login process...');

    const loginOption = this.page.locator('span', { hasText: 'Login by username and password' });

    const loginOptionVisible = await loginOption.waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (loginOptionVisible) {
      console.info('[POS] Login method "username and password" detected. Clicking...');
      await loginOption.click();

      const userInput = this.page.locator('input[aria-label="Username"]');
      const passInput = this.page.locator('input[aria-label="Password"]');
      const loginBtn = this.page.getByRole('button', { name: /sign in/i });

      await userInput.waitFor({ state: 'visible', timeout: 5000 });
      await passInput.waitFor({ state: 'visible', timeout: 5000 });

      await userInput.fill(process.env.POS_USERNAME || '');
      await passInput.fill(process.env.POS_PASSWORD || '');

      await loginBtn.waitFor({ state: 'visible', timeout: 5000 });
      await loginBtn.click();

      console.info('[POS] Waiting for login redirection to complete...');
      await this.page.waitForURL(url => !url.href.includes('login'), { timeout: 120_000 });

      console.info('[POS] Login completed successfully.');
    } else {
      console.info('[POS] Login option not found. Possibly already logged in or redirected.');
    }
  }

  async configApiIfNotConfig() {
    console.info('[POS] Checking if API configuration screen is visible...');
    const setApiTitle = this.page.locator('span.title', { hasText: 'Set Api URL' });

    const isVisible = await setApiTitle.waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false);

    if (isVisible) {
      console.info('[POS] API configuration screen detected. Setting API URL...');
      const apiInput = this.page.locator('input[aria-label="Api URL"]');
      await apiInput.fill(process.env.API_URL || 'http://localhost:8000');

      const continueBtn = this.page.getByRole('button', { name: /continue/i });
      await continueBtn.click();

      const themeTitle = this.page.locator('span.theme-content__title');
      const themeText = await themeTitle.textContent();

      if (themeText?.trim() === 'Choice your app theme') {
        console.info('[POS] Theme selection screen detected. Clicking Continue...');
        const themeContinueBtn = this.page.getByRole('button', { name: /continue/i });
        await themeContinueBtn.waitFor({ state: 'visible', timeout: 5000 });
        await themeContinueBtn.click();
      } else {
        console.info('[POS] Theme selection screen not detected. Found text:', themeText);
      }

      console.info('[POS] API URL configured successfully.');
    } else {
      console.info('[POS] API configuration screen not found. Assuming it is already configured.');
    }
  }

  async close() {
    console.info('[POS] Closing POS application...');
    await this.app.close();
  }
}