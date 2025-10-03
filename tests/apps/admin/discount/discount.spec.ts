import test, { type BrowserContext, expect, type Page } from '@playwright/test';
import { fakeDiscount } from '@builders/discount';
import { DiscountListPage } from '@pages/admin/discounts/DiscountListPage';
import { DiscountFormCreatePage } from '@pages/admin/discounts/DiscountFormCreatePage';
import type { Discount } from '../../../../schemas/discount';
import { DiscountPage } from '@pages/admin/discounts/DiscountPage';
import { buildFakeCategory } from '@builders/category';
import { buildFakeProduct } from '@builders/product';
import { CategoryContext } from '@pages/admin/category/CategoryPage';
import { ProductPage } from '@pages/admin/product/ProductPage';
import type { Category } from '../../../../schemas/category';
import type { Product } from 'schemas/product';

test.describe('Discount create and delete', () => {
	test.describe.configure({
		mode: 'serial',
	});

	let context: BrowserContext;
	let page: Page;
	let discountListPage: DiscountListPage;
	let formCreatePage: DiscountFormCreatePage;
	const fakeDiscounts: Discount[] = [];

	let categoryContext: CategoryContext;
	let fakeCategory: Category;
	let productContext: ProductPage;
	let fakeProduct: Product;

	test.beforeAll(async ({ browser }) => {
		context = await browser.newContext();
		page = await context.newPage();
		discountListPage = new DiscountListPage(page);
		formCreatePage = new DiscountFormCreatePage(page);

		categoryContext = new CategoryContext(page);
		productContext = new ProductPage(page);
		await discountListPage.goto();
	});

	test.afterAll(async () => {
		const discountContext = new DiscountPage(page);
		await discountContext.goto();

		for (const discount of fakeDiscounts) {
			await discountContext.deleteDiscount(discount.description);
		}
		await productContext.listPage.goto();
		await productContext.deleteProduct(fakeProduct.name);

		await productContext.listPage.goto();
		await categoryContext.deleteCategory(fakeCategory.name);
		await context.close();
	});

	test('Should create Discount', async () => {
		const discount = fakeDiscount();
		await expect(discountListPage.titleListPage).toBeVisible();
		await discountListPage.addDiscountButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await formCreatePage.fillForm(discount);
		await formCreatePage.submitButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		fakeDiscounts.push(discount);
	});

	test('Should delete Discount', async () => {
		const discount = fakeDiscounts[0];
		await discountListPage.selectDiscount(discount.description);
		await expect(discountListPage.discountSelected).toBeVisible();
		await discountListPage.deleteDiscount();
		await discountListPage.page.waitForLoadState('networkidle');
		await expect(discountListPage.discountSelected).not.toBeVisible();
		fakeDiscounts.pop();
	});

	test('Should create Discount type voucher', async () => {
		const discount: Discount = fakeDiscount({
			discountType: 'Voucher',
		});
		await expect(discountListPage.titleListPage).toBeVisible();
		await discountListPage.addDiscountButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await formCreatePage.fillForm(discount);
		await formCreatePage.submitButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await discountListPage.selectDiscount(discount.description);
		await expect(discountListPage.discountSelected).toBeVisible();
		fakeDiscounts.push(discount);
	});

	test('Should create Discount type order', async () => {
		const discount: Discount = fakeDiscount({
			discountType: 'Order',
		});
		await expect(discountListPage.titleListPage).toBeVisible();
		await discountListPage.addDiscountButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await formCreatePage.fillForm(discount);
		await formCreatePage.submitButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await discountListPage.selectDiscount(discount.description);
		await expect(discountListPage.discountSelected).toBeVisible();
		fakeDiscounts.push(discount);
	});

	test('Should create Discount type fixed', async () => {
		const discount: Discount = fakeDiscount({
			discountType: 'Fixed',
		});
		await expect(discountListPage.titleListPage).toBeVisible();
		await discountListPage.addDiscountButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await formCreatePage.fillForm(discount);
		await formCreatePage.submitButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await discountListPage.selectDiscount(discount.description);
		await expect(discountListPage.discountSelected).toBeVisible();
		fakeDiscounts.push(discount);
	});

	test('Should create Discount type fixed with products', async () => {
		const _fakeCategory = buildFakeCategory();
		const _fakeProduct = buildFakeProduct({
			displayIn: _fakeCategory.displayIn,
			categoryName: _fakeCategory.name,
		});

		await categoryContext.createCategory(_fakeCategory);
		fakeCategory = _fakeCategory;

		await productContext.createProduct(_fakeProduct);
		fakeProduct = _fakeProduct;

		const discount: Discount = fakeDiscount({
			discountType: 'Fixed',
		});

		await discountListPage.goto();
		await expect(discountListPage.titleListPage).toBeVisible();
		await discountListPage.addDiscountButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await formCreatePage.fillForm(discount);
		await formCreatePage.addProduct.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await formCreatePage.addProductToDiscount(_fakeProduct.name);
		await formCreatePage.buttonConfirmProducts.click();
		await formCreatePage.submitButton.click();
		await formCreatePage.page.waitForLoadState('networkidle');
		await discountListPage.selectDiscount(discount.description);
		await expect(discountListPage.discountSelected).toBeVisible();
		fakeDiscounts.push(discount);
	});
});
