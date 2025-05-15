import {ProductListPage} from "@pages/admin/product/ProductListPage";
import {Page} from "@playwright/test";
import {DiscountListPage} from "@pages/admin/discounts/DiscountListPage";

export class DiscountPage {
    public readonly listPage: DiscountListPage;

    constructor( private readonly page: Page) {
        this.page = page;
        this.listPage = new DiscountListPage(page);

    }

    async deleteDiscount(productName: string) {
        await this.listPage.clearFindProduct()
        await this.listPage.findProductByName(productName);
        await this.listPage.selectProduct(productName);
        await this.listPage.deleteProduct();
        await this.listPage.page.waitForLoadState('networkidle')

    }


}