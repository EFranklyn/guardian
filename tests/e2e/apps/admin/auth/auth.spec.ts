import { test, expect } from '@playwright/test';
import { AdminApp } from '../../../launchers/admin';

test.describe('Admin Login Page - Visuals and Functional Flow', () => {

  test('Should load login page with expected URL, title and elements', 
    async () => {
    const admin = await new AdminApp().launch();
    await admin.page.waitForURL('**/admin/login');
    expect(admin.page.url().endsWith('/admin/login')).toBeTruthy();
    await expect(admin.page).toHaveTitle('admin')
    
    const form = admin.page.locator('form div').filter({ hasText: 'Sign In personUsernamelockPasswordvisibility' });
    await expect(form).toBeVisible();
    await expect(form).toHaveCount(1);

    const textSiginIn = form.locator('span')    
    await expect(textSiginIn).toBeVisible();
    await expect(textSiginIn).toHaveText('Sign In');
    
    const usernameInput = admin.page.getByText('personUsername')
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput.locator('i.q-icon', { hasText: 'person' })).toBeVisible();

    const buttonSigin = admin.page.getByRole('button', { name: /sign in/i });
    await expect(buttonSigin).toBeVisible();

    const passwordInput = admin.page.getByText('lockPasswordvisibility');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput.locator('i.q-icon', { hasText: 'lock' })).toBeVisible();
    await expect(passwordInput.locator('i.q-icon', { hasText: 'visibility' })).toBeVisible();

    const allInputs = admin.page.locator('input');
    await expect(allInputs).toHaveCount(2);

    const allButtons = admin.page.locator('button');
    await expect(allButtons).toHaveCount(1);
    await admin.close();
  });
});