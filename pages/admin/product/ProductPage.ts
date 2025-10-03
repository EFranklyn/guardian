import test, { expect, type Page } from '@playwright/test';
import { ProductListPage } from '@pages/admin/product/ProductListPage';
import { ProductFormCreatePage } from '@pages/admin/product/ProductFormCreatePage';
import type { Product } from '../../../schemas/product';

export class ProductPage {
	public readonly listPage: ProductListPage;
	public readonly createPage: ProductFormCreatePage;

	constructor(private readonly page: Page) {
		this.page = page;
		this.listPage = new ProductListPage(page);
		this.createPage = new ProductFormCreatePage(page);
	}

	async deleteProduct(productName: string) {
		await this.listPage.clearFindProduct();
		await this.listPage.findProductByName(productName);
		await this.listPage.selectProduct(productName);
		await this.listPage.deleteProduct();
		await this.listPage.page.waitForLoadState('networkidle');
	}

	async createProduct(product: Product) {
		await this.listPage.goto();
		await this.listPage.addProductButton.click();
		await this.createPage.page.waitForLoadState('networkidle');
		await this.createPage.formFill(product);

		for (const addOnGroup of product.addOnGroups) {
			await this.createPage.addonManager.addAddonGroupButton.click();
			await this.createPage.addonManager.addonGroupFormFill(addOnGroup);

			for (let addOnIndex = 0; addOnIndex < addOnGroup.addons.length; addOnIndex++) {
				const addOn = addOnGroup.addons[addOnIndex];
				await this.createPage.addonManager.clickToAddNewAddOn();
				await this.createPage.addonManager.addOnFormFill(addOnIndex, addOn);
			}
		}

		await this.createPage.submitButton.click();
		await this.createPage.page.waitForLoadState('networkidle');
		await this.listPage.page.waitForLoadState('networkidle');
		await test.step(`product ${product.name} created`, async () => {
			// Begin -
			// criar uma checagem dessas para cada POM e Context
			// semelhante ao que Levi fez
			await expect(this.listPage.titleListPage).toBeVisible();
			// end
			await this.listPage.clearFindProduct();
			await this.listPage.page.waitForLoadState('networkidle');
			await this.listPage.findProductByName(product.name);
			await this.listPage.page.waitForLoadState('networkidle');
			await this.listPage.selectProduct(product.name);
			await expect(this.listPage.productSelected).toBeVisible();
		});
	}
}
