import type { Locator, Page } from '@playwright/test';

export class AddonListPage {
	readonly page: Page;
	readonly titleListPage: Locator;
	readonly addAddonButton: Locator;
	readonly inputFind: Locator;
	addonSelected: Locator;

	constructor(page: Page) {
		this.page = page;
		this.titleListPage = this.page.getByText('arrow_back Create Addon Group');
		this.addAddonButton = this.page.getByRole('button').filter({
			hasText: 'add',
		});
		this.inputFind = this.page.getByRole('textbox', {
			name: 'Name',
			exact: true,
		});
		this.addonSelected = this.page.getByRole('row').nth(1);
	}

	async clearFindAddon() {
		await this.inputFind.click();
		await this.inputFind.fill('');
		await this.page.keyboard.press('Enter');
		await this.page.waitForLoadState('networkidle');
	}

	async selectAddonGroup(addonName: string) {
		this.addonSelected = await this.page.getByRole('row').filter({
			has: this.page.getByRole('cell', {
				name: new RegExp(`^${addonName}$`, 'i'),
			}),
		});
	}

	async deleteAddonGroup() {
		await this.addonSelected.getByRole('button').nth(2).click();
		await this.page
			.getByRole('button', {
				name: 'OK',
			})
			.click();
	}

	async findAddonByName(name: string) {
		await this.inputFind.click();
		await this.inputFind.fill(name);
		await this.page.keyboard.press('Enter');
		await this.page.waitForLoadState('networkidle');
	}

	async goto() {
		await this.page.goto('');
		await this.page.waitForURL('**/');
		await this.page
			.getByRole('button', {
				name: 'Expand "Registers"',
			})
			.click();
		await this.page.getByText('Addons').click();
	}
}
