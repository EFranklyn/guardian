import { Page } from "@playwright/test";
import { CategoryFormCreatePage } from "./CategoryFormCreatePage";
import { CategoryFormEditPage } from "./CategoryFormEditPage";
import { CategoryListPage } from "./CategoryListPage";
import { Category } from "schemas/category";



export class CategoryContext {
    public readonly listPage: CategoryListPage;
    public readonly formCreate: CategoryFormCreatePage;
    public readonly formEdit: CategoryFormEditPage;
    constructor( private readonly page: Page) {
        this.page = page;
        this.listPage = new CategoryListPage(page);
        this.formCreate = new CategoryFormCreatePage(page);
        this.formEdit = new CategoryFormEditPage(page);
    }

    async createCategory(category: Category) {
        this.listPage.goto()
        await this.listPage.addCategoryButton.click();
        await this.formCreate.formFill(category)
        await this.formCreate.submit();
    }
}