import { test as base, expect } from '@playwright/test';
import { CategoryListPage } from '@pages/admin/category/CategoryListPage';
import { CategoryFormCreatePage } from '@pages/admin/category/CategoryFormCreatePage';

export type CategoryFixture = {
    categoryListPage: CategoryListPage
    categoryFormCreatePage: CategoryFormCreatePage
    
};

export const test = base.extend<CategoryFixture>({

  categoryListPage: async ({ page }, use) => {
    const pageObject = new CategoryListPage(page);
    await use(pageObject);
  },

  categoryFormCreatePage: async ({ page }, use) => {
    const pageObject = new CategoryFormCreatePage(page);
    await use(pageObject);
  }

});

export { expect };