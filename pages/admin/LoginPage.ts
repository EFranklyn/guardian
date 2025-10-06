import type { Locator, Page } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator;
	readonly signInButton: Locator;
	readonly passwordInput: Locator;
	readonly errorMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.signInButton = page.getByRole('button', {
			name: /sign in/i,
		});
		this.usernameInput = this.page.getByRole('textbox', {
			name: 'Username',
		});
		this.passwordInput = this.page.getByRole('textbox', {
			name: 'Password',
		});
		this.errorMessage = page.getByText('Incorrect username or password');
	}

	async goto() {
		await this.page.goto('login');
		await this.page.waitForURL('**/admin/login');
	}

	async login(username: string, password: string) {
		await this.usernameInput.click();
		await this.usernameInput.fill(username);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.signInButton.click();
	}
}
