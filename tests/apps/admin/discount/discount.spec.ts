import test, {BrowserContext, expect, Page} from "@playwright/test";
import {fakeDiscount} from "@builders/discount";
import {DiscountListPage} from "@pages/admin/discounts/DiscountListPage";
import {DiscountFormCreatePage} from "@pages/admin/discounts/DiscountFormCreatePage";
import {Discount} from "../../../../schemas/discount";
import {DiscountPage} from "@pages/admin/discounts/DiscountPage";


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
        const discountContext = new DiscountPage(page);
        await discountContext.goto()
        for (const discount of fakeDiscounts) {
            await discountContext.deleteDiscount(discount.description);
        }

        await context.close();

    })

    test("Should create addon", async () => {
        const discount = fakeDiscount()
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
        await expect(discountListPage.discountSelected).toBeVisible()
        await discountListPage.deleteDiscount()
        await discountListPage.page.waitForLoadState('networkidle')
        await expect(discountListPage.discountSelected).not.toBeVisible()
        fakeDiscounts.pop()
    });

    test("Should create Addon type voucher", async () => {
        const discount:Discount = fakeDiscount({
            discountType: 'Voucher'
        })
        await expect(discountListPage.titleListPage).toBeVisible()
        await discountListPage.addDiscountButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        await formCreatePage.fillForm(discount)
        await formCreatePage.submitButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        fakeDiscounts.push(discount)
    });

    test("Should create Addon type order", async () => {
        const discount:Discount = fakeDiscount({
            discountType: 'Order'
        })
        await expect(discountListPage.titleListPage).toBeVisible()
        await discountListPage.addDiscountButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        await formCreatePage.fillForm(discount)
        await formCreatePage.submitButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        fakeDiscounts.push(discount)
    });

    test("Should create Addon type fixed", async () => {
        const discount:Discount = fakeDiscount({
            discountType: 'Fixed'
        })
        await expect(discountListPage.titleListPage).toBeVisible()
        await discountListPage.addDiscountButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        await formCreatePage.fillForm(discount)
        await formCreatePage.submitButton.click()
        await formCreatePage.page.waitForLoadState('networkidle')
        fakeDiscounts.push(discount)
    });


})