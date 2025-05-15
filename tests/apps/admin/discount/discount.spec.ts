import test, {BrowserContext, expect, Page} from "@playwright/test";
import {fakeDiscount} from "@builders/discount";
import {DiscountListPage} from "@pages/admin/discounts/DiscountListPage";
import {DiscountFormCreatePage} from "@pages/admin/discounts/DiscountFormCreatePage";
import {Discount} from "../../../../schemas/discount";


test.describe("Extra Addon create and delete", () => {
    test.describe.configure({ mode: "serial" });

    let context: BrowserContext;
    let page: Page;
    let discountListPage: DiscountListPage;
    let formCreatePage: DiscountFormCreatePage
    let fakeDiscounts : Discount[] = []

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        discountListPage = new DiscountListPage(page)
        formCreatePage = new DiscountFormCreatePage(page)
        await discountListPage.goto()
    });

    test.afterAll(async () => {


    })

    test("Should create addon", async () => {
        const discount = fakeDiscount({
        })
        await expect(discountListPage.titleListPage).toBeVisible()
        await discountListPage.addDiscountButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        await formCreatePage.fillForm(discount)
        await formCreatePage.submitButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        fakeDiscounts.push(discount)
    });

    test("Should delete Addon", async () => {
        const discount = fakeDiscounts[0]
        await discountListPage.selectDiscount(discount.description)
        await discountListPage.discountSelected.click()
        await expect(discountListPage.discountSelected).toBeVisible()
        await discountListPage.deleteDiscount()
        await discountListPage.page.waitForLoadState('networkidle')
        await expect(discountListPage.discountSelected).not.toBeVisible()
    });


})