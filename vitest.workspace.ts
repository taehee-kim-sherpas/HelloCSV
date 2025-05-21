import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      setupFiles: './setupTests.ts',
      include: ['e2e/**/*.spec.{ts,tsx}'],
      name: 'browser',
      css: true,
      globals: true,
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [
          {
            browser: 'chromium',
          },
        ],
      },
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      include: ['src/**/*.test.{js,ts}'],
      name: 'unit',
      environment: 'node',
    },
  },
]);
