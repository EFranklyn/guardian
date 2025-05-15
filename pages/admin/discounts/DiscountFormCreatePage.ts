import {Locator, Page} from "@playwright/test";
import {Discount} from "../../../schemas/discount";


export class DiscountFormCreatePage {
    readonly page: Page;
    readonly titleListPage: Locator;
    readonly inputDescription: Locator;
    readonly inputStartDate: Locator;
    readonly inputEnDate: Locator;
    readonly selectDays: Locator;
    readonly selectDiscountTypeValue: Locator;
    readonly inputDiscountValue: Locator;
    readonly selectDiscountType: Locator;
    readonly selectAvaiableFor: Locator;
    readonly inputMinimumOrderValue: Locator;
    readonly inputVaucherCode: Locator;
    readonly inputUsageLimit: Locator;
    readonly checkboxSingleUse: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleListPage = this.page.getByText('arrow_back Create Discount')
        this.inputDescription = this.page.getByRole('textbox', { name: 'Description' });
        this.inputStartDate = this.page.getByRole('textbox', { name: 'Start date' })
        this.inputEnDate = this.page.getByRole('textbox', { name: 'End date' })
        this.selectDays = this.page.getByText('Daysarrow_drop_down')
        this.selectDiscountTypeValue = this. page.locator('div').filter({ hasText: /^arrow_drop_down$/ }).nth(1)
        this.inputDiscountValue = this.page.getByText('euroDiscount value')
        this.selectDiscountType = this.page.locator('div').filter({ hasText: /^arrow_drop_down$/ }).nth(2)
        this.selectAvaiableFor = this.page.getByText('Available forarrow_drop_down')
        this.inputMinimumOrderValue = this.page.getByRole('textbox', { name: 'Minimum value to discount' })
        this.inputVaucherCode = this.page.getByRole('textbox', { name: 'Voucher code' })
        this.inputUsageLimit =  this.page.getByRole('spinbutton', { name: 'Usage limit' })
        this.checkboxSingleUse =  this.page.getByRole('checkbox', { name: 'Single use per user' })
        this.submitButton = this.page.getByRole('button', { name: 'Submit' })
    }

    async chooseDays(days: string[]=[]) {
        await this.selectDays.click();
        for(const day of days){
            await this.page.getByRole('option', { name: day }).click();
        }
        await this.selectDays.press('Escape');
    }

    async chooseDiscountTypeValue(discountTypeValue: string) {
        await this.selectDiscountTypeValue.click();
        await this.page.getByRole('option', { name: discountTypeValue }).click();
    }

    async chooseDiscountType(discountType: string) {
        await this.selectDiscountType.click();
        const option =this.page.getByRole('option', { name: discountType })
        await option.click();
        await option.isVisible()
        await option.waitFor({state:'hidden'})


        // isso teoricamente resolve o problema de conflitos dos q-portais no DOM
    }

    async chooseAvaiableFor(avaiableFor: string[]) {
        // await this.page.pause()
        await this.selectAvaiableFor.click();

        await this.page.waitForLoadState('load')
        const options = await this.page.getByRole('option').all()
        for(const option of options){
            const availableForName = await option.textContent()
            console.log('>>>', availableForName)
            const isSelected = Boolean(await option.getAttribute('aria-selected') === 'true')
            const hasAvailable = availableForName && avaiableFor.includes(availableForName)
        if(!isSelected && hasAvailable){
            await option.click()
        }else if(isSelected && !hasAvailable){
            await option.click()
        }
        }
        await this.selectAvaiableFor.click();

    }


    async fillForm(discount: Discount) {
        await this.inputDescription.click();
        await this.inputDescription.fill(discount.description);
        await this.inputStartDate.click()
        await this.inputStartDate.fill(discount.startDate)
        await this.inputEnDate.click()
        await this.inputEnDate.fill(discount.endDate)

        if(discount.days){
            await this.chooseDays(discount.days)
        }
        await this.chooseDiscountTypeValue(discount.valueType)
        await this.inputDiscountValue.click()

        await this.inputDiscountValue.fill(discount.value.toString())
        await this.chooseDiscountType(discount.discountType)
        await this.chooseAvaiableFor(discount.takeawayOptions)

        if( await this.inputMinimumOrderValue.isVisible()){
            await this.inputMinimumOrderValue.click()
            await this.inputMinimumOrderValue.fill(discount.minimumOrderValue.toString())
        }

        if(await this.inputVaucherCode.isVisible()){
            await this.inputVaucherCode.click()
            await this.inputVaucherCode.fill(discount.voucherCode)
        }

        if(await this.inputUsageLimit.isVisible()){
            await this.inputUsageLimit.click()
            await this.inputUsageLimit.fill(discount.usageLimit.toString())
        }

        if(await this.checkboxSingleUse.isVisible()){
            if(discount.singleUse){
                await this.checkboxSingleUse.check()
            }else{
                await this.checkboxSingleUse.uncheck()
            }

        }



    }



}