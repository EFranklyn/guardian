import {Locator, Page} from "@playwright/test";
import {AddOnGroup} from "../../../schemas/addon";

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

    constructor(page: Page) {
        this.page = page;
        this.addAddonGroupButton = this.page.getByRole('button').filter({hasText: /^add$/})
        { // Addon Group form
            this.inputName = this.page.getByRole('textbox', {name: 'Name'}).nth(2);
            this.selectDependencies = this.page.getByRole('textbox', {name: 'Name'}).nth(2);
            this.selectDisplayIn = this.page.locator('div').filter({hasText: /^Display In$/}).nth(2)
            this.inputMaxChoices = this.page.getByRole('spinbutton', {name: 'Max Choices'})
            this.inputMinChoices = this.page.getByRole('spinbutton', {name: 'Min Choices'})
            this.inputFreeAmount = this.page.getByRole('spinbutton', {name: 'Free Amount'})
            this.checkboxHideAddonsName = this.page.getByRole('checkbox', {name: 'Hide Addons Name'})
            this.checkboxShowName = this.page.getByRole('checkbox', {name: 'Show Name'})
            this.checkboxDisabled = this.page.getByRole('checkbox', {name: 'Disabled'}).nth(1)
            this.addAddonButton = this.page.getByRole('button', {name: 'Add Addon'})
        }
    }

    async fillDisplayIn(displayIn: string[]): Promise<void> {
        await this.selectDisplayIn.click();

        for (const display of displayIn) {
            await this.page.getByRole("option", { name: display }).click();
        }

        await this.selectDisplayIn.press('Escape');

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

