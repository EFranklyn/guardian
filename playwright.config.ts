import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // testDir: './tests/', analyze if we will need this later
  // timeout: 150 * 1000,
  // retries: 0,

  projects: [
    { name: 'adminSetup', 
      testMatch: /adminSetup\.setup\.ts$/,
      use:{
        baseURL: process.env.ADMIN_URL,

      }
    },
    {
      name: 'foodinn-restaurant',
      use: {
        headless: false,
        screenshot: 'on',        
      },
    },
    {
      name: 'foodinn-app-admin',
      testDir: './tests/apps/admin',
      use: {
        baseURL: process.env.ADMIN_URL,
        storageState: 'storage/admin-auth.json',
        headless: false,
        screenshot: 'on',
        video: 'on',
      },
      dependencies: ['adminSetup'],
      outputDir: 'test-results/apps/admin',
    },
  ],
  outputDir: 'test-results',
});
