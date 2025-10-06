import { buildFakeCategory } from '@builders/category';
import { test as base, expect } from '@fixtures/admin/categoryFixture';

const test = base;

test.describe('Admin - Category create, edit and delete', () => {
	test.describe.configure({
		mode: 'serial',
	});

	const category = buildFakeCategory();

	test.beforeEach(async ({ categoryListPage }) => {
		await categoryListPage.goto();
		console.log(category.name);
	});

	test('Should create category', async ({ categoryListPage, categoryFormCreatePage }) => {
		await expect(categoryListPage.titleListPage).toBeVisible();
		await categoryListPage.addCategoryButton.click();
		await expect(categoryFormCreatePage.headerCreateForm).toBeVisible();
		await categoryFormCreatePage.formFill(category);
		await categoryFormCreatePage.submit();
		await categoryListPage.selectCategory(category.name);
		await expect(categoryListPage.categorySelected).toBeVisible();
	});

	test('Should edit the created category', async ({ categoryListPage, categoryFormEditPage }) => {
		await categoryListPage.selectCategory(category.name);
		await categoryListPage.editCategory();

		category.name = `${category.name} edit`;
		category.displayIn = [
			'KIOSK',
			'TABLE',
		];
		await categoryFormEditPage.page.waitForLoadState('networkidle');
		await categoryFormEditPage.formFill(category);
		await categoryFormEditPage.submit();

		await expect(categoryListPage.categorySelected).not.toBeVisible();
		await categoryListPage.selectCategory(category.name);
		await expect(categoryListPage.categorySelected).toBeVisible();
	});

	test('Should delete the created category', async ({ categoryListPage }) => {
		await categoryListPage.selectCategory(category.name);
		await categoryListPage.deleteCategory();

		await expect(categoryListPage.categorySelected).not.toBeVisible();
	});
});
