import { Page, Locator } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly titleListPage: Locator;
  readonly addCategoryButton: Locator;
  readonly headerCreateForm: Locator;
//   readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleListPage = this.page.getByRole('main').getByText('Category List');
    this.addCategoryButton =  this.page.getByRole('button').filter({ hasText: 'add' });
    this.headerCreateForm = this.page.getByText('arrow_back Create Category');
//   await page.locator('div').filter({ hasText: /^arrow_back Create Category$/ }).getByRole('button').click();
    // this.signInButton = page.getByRole('button', { name: /sign in/i });
    // this.usernameInput = this.page.getByRole('textbox', { name: 'Username' })
    // this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    // this.errorMessage = page.getByText('Incorrect username or password');
//     await page.goto('http://devteam-test.eu-west-1.elasticbeanstalk.com/admin/login');
//   await page.getByRole('textbox', { name: 'Name' }).click();
//   await page.getByRole('textbox', { name: 'Name' }).fill('name');
//   await page.getByRole('textbox', { name: 'Image Url' }).click();
//   await page.getByRole('textbox', { name: 'Image Url' }).fill('qualquer coia');
//   await page.getByRole('spinbutton', { name: 'POS Rank' }).click();
//   await page.getByRole('spinbutton', { name: 'POS Rank' }).fill('1');
//   await page.getByRole('spinbutton', { name: 'Website Rank' }).click();
//   await page.getByRole('spinbutton', { name: 'Website Rank' }).fill('1');
//   await page.getByRole('spinbutton', { name: 'Print Rank' }).click();
//   await page.getByRole('spinbutton', { name: 'Print Rank' }).fill('1');
//   await page.getByRole('textbox', { name: 'VAT' }).click();
//   await page.getByRole('textbox', { name: 'VAT' }).fill('200.00');
//   await page.getByRole('checkbox', { name: 'Compose Name' }).click();
//   await page.getByRole('checkbox', { name: 'Disabled' }).click();
//   await page.locator('div').filter({ hasText: /^Parent Category$/ }).first().click();
//   await page.getByRole('option', { name: 'American Drinks' }).locator('div').nth(2).click();
//   await page.locator('div:nth-child(10) > .q-field > .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native').click();
//   await page.getByRole('option', { name: 'ONLINE' }).locator('div').nth(1).click();
//   await page.getByRole('option', { name: 'TABLE' }).click();
//   await page.getByRole('option', { name: 'POS' }).click();
//   await page.getByRole('combobox', { name: 'Display In' }).press('Escape');
//   await page.getByRole('button', { name: 'POS Colors' }).click();
//   await page.getByRole('textbox', { name: 'Font color' }).click();
//   await page.getByRole('textbox', { name: 'Font color' }).fill('#FFFFFF');
//   await page.getByRole('textbox', { name: 'Background1' }).click();
//   await page.getByRole('textbox', { name: 'Background1' }).fill('#F44336');
//   await page.getByRole('textbox', { name: 'Background2' }).click();
//   await page.getByRole('textbox', { name: 'Background2' }).fill('#B71C1C');
//   await page.getByRole('button', { name: 'Done' }).click();
//   await page.getByRole('button', { name: 'Website Colors' }).click();
//   await page.getByRole('button', { name: 'Done' }).click();
    

  }

  async goto() {
    await this.page.goto('');
    await this.page.waitForURL('**/');
    await this.page.getByRole('button', { name: 'Expand "Registers"' }).click();
    await this.page.getByText('Categories').click();

  }

  async gotoCreateForm(){
    this.addCategoryButton.click();
  }
}



