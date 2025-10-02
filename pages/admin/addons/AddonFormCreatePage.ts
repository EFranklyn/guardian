import {Locator, Page} from "@playwright/test";
import {ExtraAddon, ExtraAddonGroup} from "../../../schemas/addon";


export class AddonFormCreatePage {
    readonly page: Page;
    readonly titleListPage: Locator;
    readonly inputName: Locator;
    readonly inputRank: Locator;
    readonly inputMaxChoices: Locator;
    readonly inputMinChoices: Locator;
    readonly inputFreeAmount: Locator;
    readonly checkHideAddonsName: Locator;
    readonly checkShowName: Locator;
    readonly checkBoxDisabled: Locator;
    readonly buttonAddAddon: Locator;
    readonly submitButton: Locator;

    readonly formAddonModal: Locator;
    readonly addonInputName: Locator;
    readonly addonInputName2: Locator;
    readonly addonInputPrice: Locator;
    readonly addonInputTablePrice: Locator;
    readonly addonInputVatPrice: Locator;
    readonly addonInputVatPerc: Locator;
    readonly addonInputDrsDeposit: Locator;
    readonly addonCheckBoxDisabled: Locator;
    readonly addonInputDescription: Locator;
    readonly addonDoneNewButton: Locator;
    readonly addonDoneButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleListPage = this.page.getByText('arrow_back Create Addon Group');
        this.buttonAddAddon = this.page.getByRole('button', { name: 'Add Addon' })
        this.submitButton = this.page.getByRole('button', { name: 'Submit' })
        { // form addon group
            this.inputName = this.page.getByRole('textbox', {name: 'Name'});
            this.inputRank = this.page.getByRole('spinbutton', {name: 'Rank'});
            this.inputMaxChoices = this.page.getByRole('spinbutton', {name: 'Max Choices'});
            this.inputMinChoices = this.page.getByRole('spinbutton', {name: 'Min Choices'});
            this.inputFreeAmount = this.page.getByRole('spinbutton', {name: 'Free Amount'});
            this.checkHideAddonsName = this.page.getByRole('checkbox', {name: 'Hide Addons Name'});
            this.checkShowName = this.page.getByRole('checkbox', {name: 'Show Name'});
            this.checkBoxDisabled = this.page.getByRole('checkbox', {name: 'Disabled'});
        }
        { // form AddonModal
            this.formAddonModal = this.page.getByText('NameName 2€Price€Table Price€')
            this.addonInputName = this.formAddonModal.getByRole('textbox', { name: 'Name', exact: true })
            this.addonInputName2 = this.formAddonModal.getByRole('textbox', { name: 'Name 2', exact: true })
            this.addonInputPrice = this.formAddonModal.getByRole('textbox', { name: 'Price', exact: true })
            this.addonInputTablePrice = this.formAddonModal.getByRole('textbox', { name: 'Table Price' })
            this.addonInputVatPrice = this.formAddonModal.getByRole('textbox', { name: 'VAT Price' })
            this.addonInputVatPerc = this.formAddonModal.getByRole('textbox', { name: 'VAT %' })
            this.addonInputDrsDeposit = this.formAddonModal.getByRole('textbox', { name: 'DRS Deposit' })
            this.addonCheckBoxDisabled = this.formAddonModal.getByRole('checkbox', { name: 'Disabled' })
            this.addonInputDescription = this.formAddonModal.getByRole('textbox', { name: 'Description' })
            this.addonDoneButton = this.page.getByRole('button', { name: 'Done', exact: true })
            this.addonDoneNewButton = this.formAddonModal.getByRole('button', { name: 'Done and New', exact: true })
        }
    }

    async addAddon(){
        if(await this.buttonAddAddon.isVisible()){
            await this.buttonAddAddon.click();
        }else{
            await this.page.getByRole('button').filter({ hasText: /^add$/ })
        }
    }

    async addonFillForm(addon: ExtraAddon){
        await this.addonInputName.click();
        await this.addonInputName.fill(addon.name);
        await this.addonInputName2.click();
        await this.addonInputName2.fill(addon.name2);
        await this.addonInputPrice.click();
        await this.addonInputPrice.fill(addon.price.toString());
        await this.addonInputTablePrice.click();
        await this.addonInputTablePrice.fill(addon.price2.toString());
        await this.addonInputVatPrice.click();
        await this.addonInputVatPrice.fill(addon.vatPrice.toString());
        await this.addonInputVatPerc.click();
        await this.addonInputVatPerc.fill(addon.vatPerc.toString());
        await this.addonInputDrsDeposit.click();
        await this.addonInputDrsDeposit.fill(addon.drsDeposit.toString());

        if(addon.disabled){
            await this.addonCheckBoxDisabled.check();
        }else{
            await this.addonCheckBoxDisabled.uncheck();
        }

        await this.addonInputDescription.click();
        await this.addonInputDescription.fill(addon.description);
    }

    async addonGroupFillForm(addon: ExtraAddonGroup) {
        await this.inputName.click();
        await this.inputName.fill(addon.name);
        await this.inputRank.click();
        await this.inputRank.fill(addon.rank.toString());
        await this.inputMaxChoices.click();
        await this.inputMaxChoices.fill(addon.maxChoices.toString());
        await this.inputMinChoices.click();
        await this.inputMinChoices.fill(addon.minChoices.toString());
        await this.inputFreeAmount.click();
        await this.inputFreeAmount.fill(addon.freeAmount.toString());

        if(addon.hideAddonsName){
            await this.checkHideAddonsName.check();
        }else{
            await this.checkHideAddonsName.uncheck();
        }

        if(addon.showName){
            await this.checkShowName.check();
        }else{
            await this.checkShowName.uncheck();
        }

        if(addon.disabled){
            await this.checkBoxDisabled.check();
        }else{
            await this.checkBoxDisabled.uncheck();
        }
    }



}