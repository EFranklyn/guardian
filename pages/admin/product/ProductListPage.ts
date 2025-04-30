import {Page, Locator} from '@playwright/test';

export class ProductListPage {
    readonly page: Page;
    readonly titleListPage: Locator;
    readonly addProductButton: Locator;
    readonly inputFindName: Locator
    productSelected: Locator;
//   categorySelected: Locator;
//   readonly confirmModalButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleListPage = this.page.getByText('arrow_back Product List');
        this.addProductButton = this.page.getByRole('button').filter({hasText: 'add'});
        this.inputFindName = this.page.getByRole('textbox', {name: 'Name', exact: true});
        this.productSelected = this.page.getByRole('row').nth(1);

    }

    async goto(): Promise<void> {
        await this.page.goto('');
        await this.page.waitForURL('**/');
        await this.page.getByRole('button', {name: 'Expand "Registers"'}).click();
        await this.page.getByText('Products').click();
    }

    async findProductByName(name: string) {
        await this.inputFindName.click();
        await this.inputFindName.fill(name);
        await this.page.keyboard.press('Enter');
    }

    async clearFindProduct() {
        await this.inputFindName.click();
        await this.inputFindName.fill('');
        await this.page.keyboard.press('Enter');
    }

    async selectProduct(productName: string) {
        this.productSelected = this.page.getByRole('row')
        .filter({ has: this.page.getByRole('cell', { name: new RegExp(`^${productName}$`, 'i') })
        });
    }


}