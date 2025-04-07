import { test, expect } from '@playwright/test';
import { AdminApp } from '../../launchers/admin';
import { CustomerApp } from '../../launchers/customer';
import { POSApp } from '../../launchers/pos';

const CATEGORY_NAME = 'E2E Test Category ' + Date.now();

test.describe('Category flow across Admin, Customer and POS', () => { // Increases timeout for full E2E flow

  test('Should create a category with POS and ONLINE display and verify its visibility in Customer and POS apps', 
    async () => {
    // --------------------- Admin App: Create Category ---------------------
    const admin = await new AdminApp().launch();
    await admin.login();
    await admin.page.goto(`${process.env.ADMIN_URL}/crud/category/list`);

    const addButton = admin.page.locator('button:has(i:has-text("add"))');
    await addButton.waitFor({ state: 'visible', timeout: 5000 });
    await addButton.click();

    expect(admin.page.url()).toContain('/crud/category/create');

    await admin.page.fill('input[aria-label="Name"]', CATEGORY_NAME);
    await admin.page.fill('input[aria-label="POS Rank"]', '1');
    await admin.page.fill('input[aria-label="Website Rank"]', '1');
    await admin.page.fill('input[aria-label="Print Rank"]', '1');

    await admin.page.getByLabel('Display In').click();
    await admin.page.getByRole('option', { name: 'POS' }).click();
    await admin.page.getByRole('option', { name: 'ONLINE' }).click();
    await admin.page.keyboard.press('Escape');

    await admin.page.getByRole('button', { name: /Submit/i }).click();

    await expect(admin.page).toHaveURL(/\/crud\/category\/list/);
    await expect(admin.page.locator('table')).toContainText(CATEGORY_NAME);

    console.log('[ADMIN] Category created successfully:', CATEGORY_NAME);
    await admin.close();

    // --------------------- Customer App: Validate Category ---------------------
    const customer = await new CustomerApp().launch();
    await customer.prepare();

    const browseMenuButton = customer.page.locator('[data-test="browse-menu"]');
    await expect(browseMenuButton).toBeVisible({ timeout: 5000 });
    await browseMenuButton.click();

    await customer.page.waitForLoadState('networkidle');
    await expect(customer.page.locator('body')).toContainText(CATEGORY_NAME);
    
    await customer.close();

    // --------------------- POS App: Validate Category ---------------------
    const pos = await new POSApp().launchToUse();

    await expect(pos.page.locator('body')).toContainText(CATEGORY_NAME);

    await pos.close();
  });
});