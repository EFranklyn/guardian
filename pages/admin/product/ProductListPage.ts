import { Page, Locator } from '@playwright/test';

export class ProductListPage {
  readonly page: Page;
  readonly titleListPage: Locator;
  readonly addProductButton: Locator;
//   categorySelected: Locator;
//   readonly confirmModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleListPage = this.page.getByText('arrow_back Product List');
    this.addProductButton =  this.page.getByRole('button').filter({ hasText: 'add' });
    // this.categorySelected = this.page.getByRole('row').nth(1);
    // this.confirmModalButton = this.page.getByRole('button', { name: 'OK' });

  }

  async goto() {
    await this.page.goto('');
    await this.page.waitForURL('**/');
    await this.page.getByRole('button', { name: 'Expand "Registers"' }).click();
    await this.page.getByText('Products').click();

  }

//   async selectCategory(categoryName: string) {
//     this.categorySelected = this.page.getByRole('row')
//     .filter({ has: this.page.getByRole('cell', { name: new RegExp(`^${categoryName}$`, 'i') })
//     });
//   }

//   async deleteCategory() {
//     await this.categorySelected.getByRole('button').nth(2).click();
//     await this.confirmModalButton.click();
//   }

//   async editCategory(){
//     await this.categorySelected.getByRole('button').nth(1).click();
//   }

}



