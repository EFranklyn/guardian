import { test as base, expect } from '@playwright/test';
import loginUiData from '../uiData/admin/loginUi.json';
import { LoginPage } from '../pages/LoginPage';

export type AdminFixtures = {
    loginPage: LoginPage;
    uiData: {
        login: typeof loginUiData;
    };
  };

export const test = base.extend<AdminFixtures>({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await use(login);
  },
  
  uiData: async ({}, use) => {
    await use({ login: loginUiData,
     });
  },
});

export { expect };