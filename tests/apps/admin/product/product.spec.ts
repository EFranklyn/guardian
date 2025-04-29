import { test, expect } from "@fixtures/admin/categoryFixture";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

import { buildFakeCategory } from "@builders/category";
import { Category } from "schemas/category";
import { ProductListPage } from "@pages/admin/product/ProductListPage";
import { ProductFormCreatePage } from "@pages/admin/product/ProductFormCreatePage";
import { buildFakeProduct } from "../../../../builders/product";

dotenv.config();

// await page.goto('https://write-box.appspot.com/');
//         await page.getByRole('button', { name: 'x' }).click();
//         await page.locator('.sc-hMFtBS').click();
//         await page.locator('#editor').click();
//         await page.locator('#editor').fill(JSON.stringify(fakeProduct));

test.describe("Admin - Product create, edit and delete", () => {
  test.describe.configure({ mode: "serial" });

  // let category = buildFakeCategory();

  // test.beforeEach(async ({ categoryListPage }) => {
  //   await categoryListPage.goto();
  //   console.log(category.name);
  // });

  test("Should create product", async ({ page }) => {
    const category = buildFakeCategory();

    //create, category before of create product (think in POM)
    const fakeProduct = buildFakeProduct({
      displayIn: category.displayIn,
      categoryName: 'Sundae'
    });

    const productList = new ProductListPage(page);    
    await productList.goto();
    await productList.addProductButton.click();

    const productFormCreate = new ProductFormCreatePage(page);
    
    await productFormCreate.page.waitForLoadState('networkidle')
    await expect(productFormCreate.headerCreateForm).toBeVisible()
    
    await productFormCreate.formFill(fakeProduct);
    await page.pause();
    await productFormCreate.page.pause();
  });
});
