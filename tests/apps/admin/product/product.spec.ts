import { test, Page, BrowserContext, expect } from "@playwright/test";

import dotenv from "dotenv";

import { buildFakeCategory } from "@builders/category";
import { Category } from "schemas/category";
import { ProductListPage } from "@pages/admin/product/ProductListPage";
import { ProductFormCreatePage } from "@pages/admin/product/ProductFormCreatePage";
import { buildFakeProduct } from "@builders/product";
import { CategoryContext } from "@pages/admin/category/CategoryPage";
import {Product} from "../../../../schemas/product";
import {ProductPage} from "@pages/admin/product/ProductPage";

dotenv.config();

interface TestProduct {
  testName:string;
  product: Product;
}

//config of test from tests globals, where the context is equal
test.describe("Admin - Product create, edit and delete", () => {
  test.describe.configure({ mode: "serial" });

  let context: BrowserContext;
  let page: Page;
  let categoryContext: CategoryContext;

  let category: Category;
  let productsForTest: TestProduct[] = [];
  let productList: ProductListPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(); 
    page = await context.newPage();

    categoryContext = new CategoryContext(page);
    category = buildFakeCategory();
    await categoryContext.createCategory(category);
    productList = new ProductListPage(page);
    await productList.goto();
  });

  // use this only dev times or improve this poha
  test.afterAll(async () => {
    const productContext = new ProductPage(page);
    await productContext.listPage.goto();
    for (const product of productsForTest) {
      await productContext.deleteProduct(product.product.name);
    }

    await categoryContext.deleteCategory(category.name);
    await context.close();
  });

  test("Should create product without addons", async () => {
    const fakeProduct = buildFakeProduct({
      displayIn: category.displayIn,
      categoryName: category.name
    });

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


    productsForTest.push({testName:test.info().title, product: fakeProduct}) // improve this
  });
});
