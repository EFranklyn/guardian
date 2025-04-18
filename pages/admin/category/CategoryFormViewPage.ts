// import { Page, Locator } from '@playwright/test';

// export class CategoryListPage {
//   readonly page: Page;
//   readonly titleViewPage: Locator;
//   readonly addCategoryButton: Locator;
//   categorySelected: Locator;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   async goto() {
//     await this.page.goto('');
//     await this.page.waitForURL('**/');
//     await this.page.getByRole('button', { name: 'Expand "Registers"' }).click();
//     await this.page.getByText('Categories').click();

//   }

//   async gotoCreateForm(){
//     await this.addCategoryButton.click();
//   }

//   async selectCategory(categoryName: string) {
//     this.categorySelected = this.page.getByRole('row', { name: categoryName });
//   }


// }



