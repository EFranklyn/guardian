import {Locator, Page} from "@playwright/test";


export class DiscountListPage {
    readonly page: Page;
    readonly titleListPage: Locator;
    readonly addDiscountButton: Locator;
    discountSelected: Locator;
    readonly inputFindVouncherCode: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleListPage = this.page.getByText('arrow_back Discount List')
        this.addDiscountButton =  this.page.getByRole('button').filter({ hasText: 'add' });
        this.discountSelected = this.page.getByRole('row').nth(1);
        this.inputFindVouncherCode = this.page.getByRole('textbox', { name: 'Voucher code' })
    }

    async goto() {
        await this.page.goto('');
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Expand "Registers"' }).click();
        await this.page.getByText('Discounts').click();
    }

    async clearFind() {
        await this.inputFindVouncherCode.click();
        const clearButton = this.inputFindVouncherCode.getByRole('button', { name: 'Clear' })
        if(await clearButton.isVisible()){
            await clearButton.click();
        }
        await this.page.waitForLoadState('networkidle')
    }

    async findDiscountByVoucherCode(code: string) {
        await this.inputFindVouncherCode.click();
        await this.inputFindVouncherCode.fill(code);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle')
    }

    async selectDiscount(description: string) {
        this.discountSelected = this.page.getByRole('row')
            .filter({ has: this.page.getByRole('cell', { name: new RegExp(`^${description}$`, 'i') })
            });
    }

    async deleteDiscount() {
        await this.discountSelected.getByRole('button').nth(2).click();
        await this.page.getByRole('button', {name: 'OK'}).click();
    }
}