import { test, Browser, Page, BrowserContext, expect } from "@playwright/test";

import dotenv from "dotenv";

import { buildFakeCategory } from "@builders/category";
import { Category } from "schemas/category";
import { ProductListPage } from "@pages/admin/product/ProductListPage";
import { ProductFormCreatePage } from "@pages/admin/product/ProductFormCreatePage";
import { buildFakeProduct } from "../../../../builders/product";
import { CategoryContext } from "@pages/admin/category/CategoryPage";

dotenv.config();


//config of test from tests globals, where the context is equal
test.describe("Admin - Product create, edit and delete", () => {
  test.describe.configure({ mode: "serial" });

  let context: BrowserContext;
  let page: Page;
  let categoryContext: CategoryContext;
  let category: Category;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(); 
    page = await context.newPage();

    categoryContext = new CategoryContext(page);
    category = buildFakeCategory();
    await categoryContext.createCategory(category);
    console.log(category.name)
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("Should create product", async () => {
    const fakeProduct = buildFakeProduct({
      displayIn: category.displayIn,
      categoryName: category.name
    });

    const productList = new ProductListPage(page);    
    await productList.goto();
    await productList.addProductButton.click();

    const productFormCreate = new ProductFormCreatePage(page);

    await productFormCreate.page.waitForLoadState('networkidle')
    await expect(productFormCreate.headerCreateForm).toBeVisible()
    
    await productFormCreate.formFill(fakeProduct);
    await productFormCreate.submitButton.click();
    await expect(productList.titleListPage).toBeVisible();

    await productList.clearFindProduct()
    await productList.findProductByName(fakeProduct.name);

    await productList.selectProduct(fakeProduct.name);
    await expect(productList.productSelected).toBeVisible();
  });
});
