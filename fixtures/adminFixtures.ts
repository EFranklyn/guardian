import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export type AdminFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<AdminFixtures>({
  loginPage: async ({ page }, use) => {
    const pageObject = new LoginPage(page);
    await use(pageObject);
  }
});

export { expect };