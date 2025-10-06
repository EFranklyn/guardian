import { DiscountListPage } from '@pages/admin/discounts/DiscountListPage';
import type { Page } from '@playwright/test';

export class DiscountPage {
	public readonly listPage: DiscountListPage;

	constructor(private readonly page: Page) {
		this.page = page;
		this.listPage = new DiscountListPage(page);
	}
	async goto() {
		await this.listPage.goto();
	}

	async deleteDiscount(description: string) {
		await this.listPage.selectDiscount(description);
		await this.listPage.deleteDiscount();
		await this.listPage.page.waitForLoadState('networkidle');
	}
}
