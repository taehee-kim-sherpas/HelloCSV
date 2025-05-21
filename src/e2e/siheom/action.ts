import { waitFor } from '@testing-library/preact';
import { userEvent } from '@testing-library/user-event';
import { ActionStepDefinitionDict, Locator } from './types';
import { getElement, locatorLog } from './query';
import { expect } from 'vitest';

export const defaultActions = {
  click: async (target: Locator) =>
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      await userEvent.click(element);
    }),
  dblclick: async (target: Locator) =>
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      await userEvent.dblClick(element);
    }),
  fill: async (target: Locator, text: string) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      await userEvent.click(element);
      await userEvent.clear(element);
      await userEvent.type(element, text);
    });
  },
  type: async (target: Locator, text: string) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      await userEvent.click(element);
      await userEvent.type(element, text);
    });
  },
  tab: async (target: Locator) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toHaveFocus();

      await userEvent.tab();

      await new Promise((resolve) => setTimeout(resolve, 300));
    });
  },
  upload: async (target: Locator, file: File) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      await userEvent.upload(element, file);
    });
  },
} satisfies ActionStepDefinitionDict;

export const actions = {
  click: function (target: Locator) {
    return {
      action: 'click',
      target,
      log: `click!      : ${locatorLog(target)}`,
    } as const;
  },
  dblclick: function (target: Locator) {
    return {
      action: 'dblclick',
      target,
      log: `dblclick!   : ${locatorLog(target)}`,
    } as const;
  },
  fill: function (target: Locator, text: string) {
    return {
      action: 'fill',
      target,
      args: [text],
      log: `fill!       : ${locatorLog(target)} with "${text}"`,
    } as const;
  },
  type: function (target: Locator, text: string) {
    return {
      action: 'type',
      target,
      args: [text],
      log: `type!       : ${locatorLog(target)} with "${text}"`,
    } as const;
  },
  tab: function (target: Locator) {
    return {
      action: 'tab',
      target,
      log: `tab!        : ${locatorLog(target)}`,
    } as const;
  },
  upload: function (target: Locator, file: File) {
    return {
      action: 'upload',
      target,
      args: [file],
      log: `upload!     : ${locatorLog(target)} with "${file.name}"`,
    } as const;
  },
};
