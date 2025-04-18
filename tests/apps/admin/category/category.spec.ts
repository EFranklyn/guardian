import { test as base, expect } from '@fixtures/admin/categoryFixture';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

import { buildFakeCategory } from '@builders/category';
import { Category } from 'schemas/category';

dotenv.config();

const test = base;


test.describe('Admin - Category Page', () => {
  test.describe.configure({ mode: 'parallel' });
  
  test.beforeEach(async ({ categoryListPage }) => {    
    await categoryListPage.goto();
  });
  
  test('Should display title when accessing Category list', async ({ categoryListPage }) => {
    await expect(categoryListPage.titleListPage).toBeVisible();
  });
});

test.describe('Admin - Category create, edit and delete', () => {
    test.describe.configure({ mode: 'serial' });
    
    const category = buildFakeCategory();
    
    test.beforeEach(async ({ categoryListPage }) => {    
      await categoryListPage.goto();
      console.log(category.name);
    });
    
    test('Should create category', async ({ categoryListPage, categoryFormCreatePage }) => {
      console.log('criação', category.name);
      await expect(categoryListPage.titleListPage).toBeVisible();
      await categoryListPage.addCategoryButton.click();
      await expect(categoryFormCreatePage.headerCreateForm).toBeVisible();
      await categoryFormCreatePage.formFill(category)
      await categoryFormCreatePage.submit();
      await categoryListPage.selectCategory(category.name);
      await categoryListPage.categorySelected.ariaSnapshot()
      await expect(categoryListPage.categorySelected).toBeVisible();
    });


    test('Should delete the created category', async ({ categoryListPage, categoryFormCreatePage }) => {
      console.log(category.name);
      // await categoryListPage.page.pause()
      await categoryListPage.selectCategory(category.name);
      await categoryListPage.categorySelected.highlight();
      await categoryListPage.deleteCategory()
      
      await expect(categoryListPage.categorySelected).not.toBeVisible();
    });

  });

