import { Page, Locator } from "@playwright/test";
import { Category } from "schemas/category";
import { Product } from "schemas/product";
import {ProductAddonManager} from "@pages/admin/product/ProductAddonManager";
import {AddOnGroup} from "../../../schemas/addon";

export class ProductFormCreatePage {
  readonly page: Page;
  readonly addonManager: ProductAddonManager

  readonly headerCreateForm: Locator;
  readonly inputName: Locator;
  readonly inputName2: Locator;
  readonly inputImageUrl: Locator;
  readonly inputRank: Locator;
  readonly checkboxDisabled: Locator;
  readonly selectCategory: Locator;
  readonly selectDisplayIn: Locator;
  readonly checkboxOpenFood: Locator;
  readonly inputTablePrice: Locator;
  readonly inputDrsDeposit: Locator;
  readonly inputPrice: Locator;
  readonly inputDescription: Locator;
  readonly submitButton: Locator 

  constructor(page: Page) {
    this.page = page;
    this.addonManager = new ProductAddonManager(page)

    this.headerCreateForm = this.page.getByText("arrow_back Create Product");

    this.inputName = this.page.getByRole("textbox", {
      name: "Name",
      exact: true,
    });
    this.inputName2 = this.page.getByRole("textbox", {
      name: "Name 2",
      exact: true,
    });
    this.inputImageUrl = this.page.getByText("imageImage Url");
    this.inputRank = this.page.getByRole("spinbutton", { name: "Rank" });
    this.checkboxDisabled = this.page.getByRole("checkbox", {
      name: "Disabled",
    });
    this.selectCategory = this.page.getByText('Categoryarrow_drop_down');
    this.selectDisplayIn = this.page.getByText('arrow_drop_down').nth(1);
    this.checkboxOpenFood = page.getByRole("checkbox", { name: "Open food" });
    this.inputPrice = this.page.getByText("euroPrice");
    this.inputTablePrice = this.page.getByText("euroTable Price");
    this.inputDrsDeposit = this.page.getByText("euroDRS Deposit");
    this.inputDescription = this.page.getByRole("textbox", {
      name: "Description",
    });

    this.submitButton = this.page.getByRole('button', { name: 'Submit' });


  }

  async addAddonGroup(addonGroup: AddOnGroup) {
    await this.addonManager.addAddonGroupButton.click()
    // await this.page.getByText('Options deleteinfoadd').nth(2).click();
    await this.addonManager.addonGroupFormFill(addonGroup)


  }



  // mover
  async tryFindOption(option: Locator, page: Page): Promise<void> {
  
    try {
      await option.waitFor({ state: "visible", timeout: 20 });
      return;
    } catch (e) {
      await page.keyboard.press('ArrowDown');
      return this.tryFindOption(option, page);
    }
  }


  async setCategory(categoryName: string) {
    await this.selectCategory.click();
    const option = this.page.getByRole("option", { name: categoryName });
    await this.tryFindOption(option, this.page);
    await option.click();
  }

  async fillDisplayIn(displayIn: string[]) {
    await this.selectDisplayIn.click();

    for (const display of displayIn) {
      await this.page.getByRole("option", { name: display }).click();
    }

    await this.page.getByText('arrow_drop_down').nth(1).click();
    
  }

  async formFill(product: Product) {
    await this.inputName.click();
    await this.inputName.fill(product.name);

    await this.inputName2.click();
    await this.inputName2.fill(product.name2);

    await this.inputImageUrl.click();
    await this.inputImageUrl.fill(product.imageUrl);

    await this.inputRank.click();
    await this.inputRank.fill(product.rank.toString());

    if (product.disabled) {
      await this.checkboxDisabled.check();
    } else {
      await this.checkboxDisabled.uncheck();
    }

    await this.setCategory(product.categoryName);
    await this.fillDisplayIn(product.displayIn);
    
    if (product.openFood) {
      await this.checkboxOpenFood.check();
    } else {
      await this.checkboxOpenFood.uncheck();
    }  
    
    await this.inputPrice.click();
    await this.inputPrice.fill(product.price.toString());

    await this.inputTablePrice.click();
    await this.inputTablePrice.fill(product.price.toString())

    await this.inputDrsDeposit.click();
    await this.inputDrsDeposit.fill(product.drsDeposit.toString())

    await this.inputDescription.click();
    await this.inputDescription.fill(product.description)
  }

  //   async submit() {
  //     await this.buttonSubmit.click();
  //   }
}
