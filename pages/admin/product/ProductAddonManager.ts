import {Locator, Page} from "@playwright/test";
import {AddOn, AddOnGroup} from "../../../schemas/addon";

export class ProductAddonManager {
    readonly page: Page;
    readonly  addAddonGroupButton: Locator;
    inputName: Locator;
    selectDependencies: Locator;
    selectDisplayIn: Locator;
    inputMaxChoices: Locator;
    inputMinChoices: Locator;
    inputFreeAmount: Locator;
    checkboxHideAddonsName: Locator;
    checkboxShowName: Locator;
    checkboxDisabled: Locator;
    addAddonButton: Locator;
    formAddOnGroup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addAddonGroupButton = this.page.getByRole('toolbar')
            .filter({ hasText: 'Options deleteinfoadd' }).getByRole('button')


        { // Addon Group form
            this.formAddOnGroup = this.page.getByRole('tabpanel').first()
            this.inputName = this.page.getByRole('textbox', {name: 'Name'}).nth(2);
            this.selectDependencies = this.page.getByRole('textbox', {name: 'Name'}).nth(2);
            // this.selectDisplayIn = this.page.locator('div').filter({hasText: /^Display In$/}).nth(2)
            this.selectDisplayIn = this.page.locator('div').filter({ hasText: /^arrow_drop_down$/ }).nth(3)
            this.inputMaxChoices = this.page.getByRole('spinbutton', {name: 'Max Choices'})
            this.inputMinChoices = this.page.getByRole('spinbutton', {name: 'Min Choices'})
            this.inputFreeAmount = this.page.getByRole('spinbutton', {name: 'Free Amount'})
            this.checkboxHideAddonsName = this.page.getByRole('checkbox', {name: 'Hide Addons Name'})
            this.checkboxShowName = this.page.getByRole('checkbox', {name: 'Show Name'})
            this.checkboxDisabled = this.page.getByRole('checkbox', {name: 'Disabled'}).nth(1)
            this.addAddonButton = this.page.getByRole('button', {name: 'Add Addon'}) // resolve this desgraça
        }




        // await page.locator('.q-tab-panel > div:nth-child(2) > div:nth-child(2)').click();
    }


    async addOnFormFill(index:number, addOn:AddOn){

        const cardAddon = await this.page.getByText('drag_indicator NameName');
        const formAddOn = cardAddon.nth(index)
        await formAddOn.getByRole('textbox', {name: 'Name', exact: true }).click();
        await formAddOn.getByRole('textbox', {name: 'Name', exact: true }).fill(addOn.name);
        await formAddOn.getByRole('textbox', { name: 'Name 2', exact: true }).click();
        await formAddOn.getByRole('textbox', { name: 'Name 2', exact: true }).fill(addOn.name2);
        await formAddOn.getByText('Compose Namearrow_drop_down').click()
        await formAddOn.getByText('Compose Namearrow_drop_down').click()
        await formAddOn.locator('label').filter({ hasText: '€Price' }).getByLabel('Price').click();
        await formAddOn.locator('label').filter({ hasText: '€Price' }).getByLabel('Price').fill(addOn.price.toString());
        await formAddOn.getByText('Show Price (Online)arrow_drop_down').click();
        await formAddOn.getByText('Show Price (Online)arrow_drop_down').click();

        await formAddOn.getByText('€Table Price').click();
        addOn.price2 > 0 && await formAddOn.getByText('€Table Price').fill(addOn.price2.toString());

        await formAddOn.getByRole('textbox', { name: 'VAT Price' }).click()
        addOn.vatPrice > 0 && await formAddOn.getByRole('textbox', { name: 'VAT Price' }).fill(addOn.vatPrice.toString());

        await formAddOn.getByRole('textbox', { name: 'VAT %' }).click();
        addOn.vatPerc > 0 && await formAddOn.getByRole('textbox', { name: 'VAT %' }).fill(addOn.vatPerc.toString());

        await formAddOn.locator('label').filter({ hasText: '€DRS Deposit' }).getByLabel('DRS Deposit').click();
        addOn.drsDeposit > 0 && await formAddOn.locator('label').filter({ hasText: '€DRS Deposit' }).getByLabel('DRS Deposit').fill(addOn.drsDeposit.toString());
    }

    async clickToAddNewAddOn(){
        if(await this.addAddonButton.isVisible()){
            await this.addAddonButton.click()
        }else{
            await this.page.locator('div').filter({ hasText: /^add$/ }).getByRole('button').click()
        }
    }


    async fillDisplayIn(displayIn: string[]) {
        await this.selectDisplayIn.click();
        const options = await this.page.getByRole('option').all()
        for(const opition of options){
            const displayInName = await opition.textContent()
            const isSelected = Boolean(await opition.getAttribute('aria-selected') === 'true')
            const hasDisplayIn = displayInName && displayIn.includes(displayInName)

            if(!isSelected && hasDisplayIn){
                await opition.click()
            }else if(isSelected && !hasDisplayIn){
                await opition.click()
            }
        }
        await this.selectDisplayIn.click();
    }

    async addonGroupFormFill(addonGroup:AddOnGroup): Promise<void>{
        await this.inputName.click();
        await this.inputName.fill(addonGroup.name);
        await this.fillDisplayIn(addonGroup.displayIn);
        await this.inputMaxChoices.click();
        await this.inputMaxChoices.fill(addonGroup.maxChoices.toString());
        await this.inputMinChoices.click();
        await this.inputMinChoices.fill(addonGroup.minChoices.toString());
        await this.inputFreeAmount.click();
        await this.inputFreeAmount.fill(addonGroup.freeAmount.toString());

        if (addonGroup.hideAddonsName) {
            await this.checkboxHideAddonsName.check();
        } else {
            await this.checkboxHideAddonsName.uncheck()
        }

        if (addonGroup.showName) {
            await this.checkboxShowName.check();
        } else {
            await this.checkboxShowName.uncheck()
        }

        if (addonGroup.disabled) {
            await this.checkboxDisabled.check();
        } else {
            await this.checkboxDisabled.uncheck()
        }
    }


}

