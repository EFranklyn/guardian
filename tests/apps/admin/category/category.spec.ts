import { test as base, expect } from '@fixtures/admin/adminFixtures';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const test = base;


test.describe('Admin Category Page', () => {
  test.describe.configure({ mode: 'parallel' });
  
  test.beforeEach(async ({ categoryPage }) => {    
    await categoryPage.goto();
  });
  
  test('Should display title when accessing Category list', async ({ categoryPage }) => {
    await expect(categoryPage.titleListPage).toBeVisible();
  });


  test('Should display the creation form header after clicking to add category', async ({ categoryPage }) => {
    await categoryPage.gotoCreateForm();
    await expect(categoryPage.headerCreateForm).toBeVisible();
  });  
});
