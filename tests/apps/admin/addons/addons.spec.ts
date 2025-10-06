import { buildFakeExtraAddOnGroup } from '@builders/addons';
import { AddonFormCreatePage } from '@pages/admin/addons/AddonFormCreatePage';
import { AddonListPage } from '@pages/admin/addons/AddonListPage';
import test, { type BrowserContext, expect, type Page } from '@playwright/test';
import type { ExtraAddonGroup } from '../../../../schemas/addon';

test.describe('Extra Addon create and delete', () => {
	test.describe.configure({
		mode: 'serial',
	});

	let context: BrowserContext;
	let page: Page;
	let addonListPage: AddonListPage;
	let addonFormCreatePage: AddonFormCreatePage;
	let fakeExtraAddonGroup: ExtraAddonGroup;

	test.beforeAll(async ({ browser }) => {
		context = await browser.newContext();
		page = await context.newPage();
		addonListPage = new AddonListPage(page);
		addonFormCreatePage = new AddonFormCreatePage(page);
		fakeExtraAddonGroup = buildFakeExtraAddOnGroup();
		await addonListPage.goto();
	});

	test('Should create addon', async () => {
		await addonListPage.addAddonButton.click();
		await addonFormCreatePage.page.waitForLoadState('networkidle');
		await addonFormCreatePage.addonGroupFillForm(fakeExtraAddonGroup);
		await addonFormCreatePage.addAddon();
		await addonFormCreatePage.page.waitForLoadState('networkidle');
		await addonFormCreatePage.addonFillForm(fakeExtraAddonGroup.addons[0]);
		await addonFormCreatePage.addonDoneButton.click();
		await addonFormCreatePage.submitButton.click();
		await addonFormCreatePage.page.waitForLoadState('networkidle');
		await addonListPage.selectAddonGroup(fakeExtraAddonGroup.name);
		await expect(addonListPage.addonSelected).toBeVisible();
	});

	test('Should delete addon', async () => {
		await addonListPage.selectAddonGroup(fakeExtraAddonGroup.name);
		await expect(addonListPage.addonSelected).toBeVisible();
		await addonListPage.deleteAddonGroup();
		await addonListPage.page.waitForLoadState('networkidle');
		await expect(addonListPage.addonSelected).not.toBeVisible();
	});
});
