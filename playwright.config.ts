import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests/e2e',
  timeout: 150 * 1000,
  retries: 0,
  projects: [
    {
      name: 'foodinn-restaurant',
      use: {
        headless: false,
        screenshot: 'on',        
      },
    },
    {
      name: 'foodinn-app-admin',
      testDir: './tests/e2e/apps/admin',
      use: {
        headless: false,
        screenshot: 'on',        
      },
    },
  ],
  outputDir: 'test-results',
});
