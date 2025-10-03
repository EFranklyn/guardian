import type { Page, Locator } from '@playwright/test';
import type { Category } from 'schemas/category';

export class CategoryFormCreatePage {
	readonly page: Page;
	readonly titleListPage: Locator;
	readonly headerCreateForm: Locator;
	readonly inputName: Locator;
	readonly inputDescription: Locator;
	readonly inputImageUrl: Locator;
	readonly selectParentCategory: Locator;
	readonly inputPosRank: Locator;
	readonly inputWebsiteRank: Locator;
	readonly inputPrintRank: Locator;
	readonly inputVat: Locator;
	readonly checkboxComposeName: Locator;
	readonly checkboxDisabled: Locator;
	readonly selectDisplayIn: Locator;
	readonly buttonSubmit: Locator;
	// readonly addCategoryButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.titleListPage = this.page.getByRole('main').getByText('Category List');
		this.headerCreateForm = this.page.getByText('arrow_back Create Category');

		this.inputName = this.page.getByRole('textbox', {
			name: 'Name',
		});
		this.inputImageUrl = this.page.getByRole('textbox', {
			name: 'Image Url',
		});
		this.inputPosRank = this.page.getByRole('spinbutton', {
			name: 'POS Rank',
		});
		this.inputWebsiteRank = this.page.getByRole('spinbutton', {
			name: 'Website Rank',
		});
		this.inputPrintRank = this.page.getByRole('spinbutton', {
			name: 'Print Rank',
		});
		this.inputVat = this.page.getByRole('textbox', {
			name: 'VAT',
		});
		this.checkboxComposeName = this.page.getByRole('checkbox', {
			name: 'Compose Name',
		});
		this.checkboxDisabled = this.page.getByRole('checkbox', {
			name: 'Disabled',
		});
		this.selectParentCategory = this.page.getByText('Parent Categoryarrow_drop_down');
		this.selectDisplayIn = this.page.getByText('Display Inarrow_drop_down');
		// this.selectDisplayIn = this.page.locator('div').filter({ hasText: /^Display In$/ }).first()
		this.inputDescription = this.page.getByRole('textbox', {
			name: 'Description',
		});
		this.buttonSubmit = this.page.getByRole('button', {
			name: 'Submit',
		});
	}

	async fillParentCategory(parentCategory: string) {
		await this.selectParentCategory.click();
		await this.page
			.getByRole('option', {
				name: parentCategory,
			})
			.click();
	}

	async fillDisplayIn(displayIn: string[]) {
		await this.selectDisplayIn.click();

		for (const display of displayIn) {
			await this.page
				.getByRole('option', {
					name: display,
				})
				.click();
		}

		await this.selectDisplayIn.press('Escape');
	}

	async formFill(category: Category) {
		await this.inputName.click();
		await this.inputName.fill(category.name);

		await this.inputImageUrl.click();
		await this.inputImageUrl.fill(category.imageUrl);

		await this.inputPosRank.click();
		await this.inputPosRank.fill(category.rank.toString());

		await this.inputWebsiteRank.click();
		await this.inputWebsiteRank.fill(category.onlineRank.toString());

		await this.inputPrintRank.click();
		await this.inputPrintRank.fill(category.printRank.toString());

		await this.inputVat.click();
		await this.inputVat.fill(category.vat.toString());

		if (category.composeName) {
			await this.checkboxComposeName.check();
		} else {
			await this.checkboxComposeName.uncheck();
		}

		if (category.disabled) {
			await this.checkboxDisabled.check();
		} else {
			await this.checkboxDisabled.uncheck();
		}

		await this.inputDescription.click();
		await this.inputDescription.fill(category.description);

		if (category.categoryParentName) {
			await this.fillParentCategory(category.categoryParentName);
		}

		await this.fillDisplayIn(category.displayIn);
	}

	async submit() {
		await this.buttonSubmit.click();
	}
}
