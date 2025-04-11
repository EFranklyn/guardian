// pages/admin/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly form: Locator;
  readonly textSignIn: Locator;
  readonly usernameIcon: Locator;
  readonly passwordIcon: Locator;
  readonly visibilityIcon: Locator;
  readonly signInButton: Locator;
  readonly inputFields: Locator;
  readonly allButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form div').filter({ hasText: 'Sign In personUsernamelockPasswordvisibility' });
    this.textSignIn = this.form.locator('span');
    this.usernameIcon = page.locator('i.q-icon', { hasText: 'person' });
    this.passwordIcon = page.locator('i.q-icon', { hasText: 'lock' });
    this.visibilityIcon = page.locator('i.q-icon', { hasText: 'visibility' });
    this.signInButton = page.getByRole('button', { name: /sign in/i });
    this.inputFields = page.locator('input');
    this.allButtons = page.locator('button');
  }

  async goto() {
    await this.page.goto('/admin/login');
    await this.page.waitForURL('**/admin/login');
  }
}