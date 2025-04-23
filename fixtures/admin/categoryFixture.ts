import { test as base, expect } from '@playwright/test';
import { CategoryListPage } from '@pages/admin/category/CategoryListPage';
import { CategoryFormCreatePage } from '@pages/admin/category/CategoryFormCreatePage';
import { CategoryFormEditPage } from '@pages/admin/category/CategoryFormEditPage';

export type CategoryFixture = {
    categoryListPage: CategoryListPage
    categoryFormCreatePage: CategoryFormCreatePage
    categoryFormEditPage: CategoryFormEditPage
    
};

export const test = base.extend<CategoryFixture>({

  categoryListPage: async ({ page }, use) => {
    const pageObject = new CategoryListPage(page);
    await use(pageObject);
  },

  categoryFormCreatePage: async ({ page }, use) => {
    const pageObject = new CategoryFormCreatePage(page);
    await use(pageObject);
  },

  categoryFormEditPage: async ({ page }, use) => {
    const pageObject = new CategoryFormEditPage(page);
    await use(pageObject);
  }

});

export { expect };