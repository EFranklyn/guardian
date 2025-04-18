import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/admin/LoginPage';

export type loginFixture = {
  loginPage: LoginPage;
};

export const test = base.extend<loginFixture>({
  loginPage: async ({ page }, use) => {
    const pageObject = new LoginPage(page);
    await use(pageObject);
  },
});

export { expect };