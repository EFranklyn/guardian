import {Page} from "@playwright/test";
import {ProductListPage} from "@pages/admin/product/ProductListPage";


export class ProductPage {
    public readonly listPage: ProductListPage;

    constructor( private readonly page: Page) {
        this.page = page;
        this.listPage = new ProductListPage(page);
    }

    async deleteProduct(productName: string) {
        await this.listPage.clearFindProduct()
        await this.listPage.findProductByName(productName);
        await this.listPage.selectProduct(productName);
        await this.listPage.deleteProduct();

    }


}