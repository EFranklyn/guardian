import { test as base, expect } from '@fixtures/admin/loginFixture';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { PROTECTED_ROUTES } from './mocks';

dotenv.config();

const test = base;

const VALID_USER = {
  username: process.env.ADMIN_USERNAME!,
  password: process.env.ADMIN_PASSWORD!,
};


const routes = PROTECTED_ROUTES

test.describe('Admin Login Page - Functional Not Authenticated', () => {
  test.describe.configure({ mode: 'parallel' });
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {    
    await loginPage.goto();
  });
 
  test('should not log in with random credentials', async ({ loginPage }) => {
    await loginPage.login(faker.internet.username(), faker.internet.password());
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/Incorrect username or password/i);
  });

  test('should log in with valid credentials and redirect to dashboard', async ({ loginPage }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
  });
  
  routes.forEach((route) => {
    test(`should redirect ${route.name} to login when not authenticated`, async ({ loginPage }) => {
      const path = route.path.replace(/:\w+/g, faker.string.uuid());  
      await loginPage.page.goto(path);
      await expect(loginPage.page).toHaveURL(/\/admin\/login/);
    });
  });
});

test.describe('Admin Login Page - Functional Authenticated', () => {
  test.describe.configure({ mode: 'parallel' });  
  test.beforeEach(async ({ loginPage }) => {    
    await loginPage.goto();
  });

  test('should make the first access when authenticated on the dashboard page', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
  });
  
});
