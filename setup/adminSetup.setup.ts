import dotenv from 'dotenv';
import { test as setup } from '@playwright/test';
import fs from 'fs';

dotenv.config();

setup('Admin login storage state', async ({ page }) => {
	const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_URL } = process.env;

	if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_URL) {
		throw new Error('ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_URL must be set in .env file');
	}

	await page.goto(`login`);

	await page.fill('input[aria-label="Username"]', ADMIN_USERNAME);
	await page.fill('input[aria-label="Password"]', ADMIN_PASSWORD);
	await page
		.getByRole('button', {
			name: /sign in/i,
		})
		.click();
	await page.waitForURL('**/dashboard');

	fs.mkdirSync('storage', {
		recursive: true,
	});
	await page.context().storageState({
		path: 'storage/admin-auth.json',
	});
});
