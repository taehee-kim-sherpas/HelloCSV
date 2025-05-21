import { page } from '@vitest/browser/context';
import { render } from '@testing-library/preact';
import { ReactNode } from 'preact/compat';
import { GivenStep } from './types';

export const defaultGivens = {
  render: async (element: ReactNode) => {
    render(element);
  },
  viewport: async (width: number, height: number) => {
    await page.viewport(width, height);
  },
} satisfies Record<string, (...args: any[]) => Promise<void>>;

export const given = {
  render: function (element: ReactNode) {
    return {
      given: 'render',
      args: [element],
      log: `render element`,
    } as const;
  },
  viewport: function (width: number, height: number) {
    return {
      given: 'viewport',
      args: [width, height],
      log: `set viewport: ${width}x${height}`,
    } as const;
  },
} satisfies Record<string, (...args: any[]) => GivenStep>;
