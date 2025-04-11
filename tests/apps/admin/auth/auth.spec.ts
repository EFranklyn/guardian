

import { test as base, expect } from '@fixtures/adminFixtures';

const test = base;

test.describe('Admin Login Page - Visuals and Functional Flow', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
   
  test('should render login page with expected UI elements', async ({ loginPage, uiData }) => {
    const { login } = uiData;

    await expect(loginPage.page).toHaveTitle(login.expectedTitle);
    await expect(loginPage.form).toBeVisible();
    await expect(loginPage.form).toHaveCount(1);
    await expect(loginPage.textSignIn).toBeVisible();
    await expect(loginPage.textSignIn).toHaveText(login.expectedSignInText);
    await expect(loginPage.usernameIcon).toBeVisible();
    await expect(loginPage.passwordIcon).toBeVisible();
    await expect(loginPage.visibilityIcon).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
    await expect(loginPage.inputFields).toHaveCount(login.expectedInputCount);
    await expect(loginPage.allButtons).toHaveCount(login.expectedButtonCount);
  });
});


test.describe('Admin Losgin Page - Visuals and Functional Flow', () => {
   
  test('should render login page with expected UI elements', async ({ loginPage, uiData }) => {
    const { login } = uiData;

    await expect(loginPage.page).toHaveTitle(login.expectedTitle);
    await expect(loginPage.form).toBeVisible();
    await expect(loginPage.form).toHaveCount(1);
    await expect(loginPage.textSignIn).toBeVisible();
    await expect(loginPage.textSignIn).toHaveText(login.expectedSignInText);
    await expect(loginPage.usernameIcon).toBeVisible();
    await expect(loginPage.passwordIcon).toBeVisible();
    await expect(loginPage.visibilityIcon).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
    await expect(loginPage.inputFields).toHaveCount(login.expectedInputCount);
    await expect(loginPage.allButtons).toHaveCount(login.expectedButtonCount);
  });
});