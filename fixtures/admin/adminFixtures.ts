import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/admin/LoginPage';
import { CategoryPage } from '../../pages/admin/category/CategoryPage';

export type AdminFixtures = {
  loginPage: LoginPage;
  categoryPage: CategoryPage
};

export const test = base.extend<AdminFixtures>({
  loginPage: async ({ page }, use) => {
    const pageObject = new LoginPage(page);
    await use(pageObject);
  },

  categoryPage: async ({ page }, use) => {
    const pageObject = new CategoryPage(page);
    await use(pageObject);
  }
});

export { expect };