module.exports = {
  overrides: [
    {
      files: ['tests/**/*.ts'],
      plugins: ['playwright'],
      extends: ['plugin:playwright/playwright-test'],
      rules: {
        'playwright/no-wait-for-timeout': 'error',
        'playwright/no-force-option': 'warn',
        'playwright/prefer-web-first-assertions': 'warn'
      }
    }
  ]
}