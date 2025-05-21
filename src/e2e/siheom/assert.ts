import { waitFor } from '@testing-library/preact';
import { AssertionStepDefinitionDict, Locator } from './types';
import { getElement, getElements, locatorLog } from './query';
import { expect } from 'vitest';
import { getA11ySnapshot } from './getA11ySnapshot';
import { tableToMarkdown } from './tableToMarkdown';

export const defaultAssertions = {
  visible: async (target: Locator, expected: boolean) => {
    await waitFor(async () => {
      const element = getElement(target, expected);

      if (expected) {
        expect(element).toBeInTheDocument();
        expect(element).not.toHaveAttribute('aria-hidden', 'true');
      } else {
        expect(element).not.toBeInTheDocument();
        expect(element).not.toHaveAttribute('aria-hidden', 'false');
      }
    });
  },
  checked: async (target: Locator, expected: boolean) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      if (element instanceof HTMLInputElement && element.type === 'checkbox') {
        if (expected) {
          expect(element).toHaveAttribute('checked', 'true');
        } else {
          expect(element).not.toHaveAttribute('checked', 'true');
        }
      } else {
        if (expected) {
          expect(element).toHaveAttribute('aria-checked', 'true');
        } else {
          expect(element).not.toHaveAttribute('aria-checked', 'true');
        }
      }
    });
  },
  expanded: async (target: Locator, expected: boolean) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      expect(element).toHaveAttribute(
        'aria-expanded',
        expected ? 'true' : 'false'
      );
    });
  },
  selected: async (target: Locator, expected: boolean) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      expect(element).toHaveAttribute(
        'aria-selected',
        expected ? 'true' : 'false'
      );
    });
  },
  disabled: async (target: Locator, expected: boolean) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      if (element.hasAttribute('disabled')) {
        expect(element).toHaveAttribute(
          'disabled',
          expected ? 'disabled' : null
        );
      } else {
        expect(element).toHaveAttribute(
          'aria-disabled',
          expected ? 'true' : 'false'
        );
      }
    });
  },
  current: async (
    target: Locator,
    expected: 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time',
    flag: boolean = true
  ) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      if (flag) {
        expect(element).toHaveAttribute('aria-current', expected);
      } else {
        expect(element).not.toHaveAttribute('aria-current', expected);
      }
    });
  },
  count: async (target: Locator, expected: number, flag: boolean = true) => {
    await waitFor(async () => {
      const elements = getElements(target, true);

      if (flag) {
        expect(elements).toHaveLength(expected);
      } else {
        expect(elements).not.toHaveLength(expected);
      }
    });
  },
  value: async (target: Locator, expected: string, flag: boolean = true) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      if (flag) {
        expect(element).toHaveValue(expected);
      } else {
        expect(element).not.toHaveValue(expected);
      }
    });
  },
  errormessage: async (
    target: Locator,
    expected: string,
    flag: boolean = true
  ) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();

      if (flag) {
        expect(element).toHaveAccessibleErrorMessage(expected);
      } else {
        expect(element).not.toHaveAccessibleErrorMessage(expected);
      }
    });
  },
  a11ySnapshot: async (target: Locator, path: string) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();
    });

    await expect(getA11ySnapshot(getElement(target, true))).toMatchFileSnapshot(
      '__snapshots__/' + path
    );
  },
  tableSnapshot: async (target: Locator, path: string) => {
    await waitFor(async () => {
      const element = getElement(target, true);

      expect(element).toBeInTheDocument();
      expect(element).toBeInstanceOf(HTMLTableElement);
    });

    await expect(
      tableToMarkdown(getElement(target, true) as HTMLTableElement)
    ).toMatchFileSnapshot('__snapshots__/' + path);
  },
} satisfies AssertionStepDefinitionDict;

export const assertions = {
  visible: function (target: Locator) {
    return {
      assert: 'visible',
      target,
      args: [true],
      log: `visible     : ${target.role} "${target.name}"`,
    } as const;
  },
  checked: function (target: Locator) {
    return {
      assert: 'checked',
      target,
      args: [true],
    } as const;
  },
  expanded: function (target: Locator) {
    return {
      assert: 'expanded',
      target,
      args: [true],
    } as const;
  },
  selected: function (target: Locator) {
    return {
      assert: 'selected',
      target,
      args: [true],
    } as const;
  },
  disabled: function (target: Locator) {
    return {
      assert: 'disabled',
      target,
      args: [true],
    } as const;
  },
  current: function (
    target: Locator,
    expected: 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time'
  ) {
    return {
      assert: 'current',
      target,
      args: [expected, true],
    } as const;
  },
  count: function (target: Locator, expected: number) {
    return {
      assert: 'count',
      target,
      args: [expected, true],
    } as const;
  },
  value: function (target: Locator, expected: string) {
    return {
      assert: 'value',
      target,
      args: [expected, true],
    } as const;
  },
  errorMessage: function (target: Locator, expected: string) {
    return {
      assert: 'errorMessage',
      target,
      args: [expected, true],
    } as const;
  },
  not: {
    visible: function (target: Locator) {
      return {
        assert: 'visible',
        target,
        args: [false],
        log: `not visible: ${target.role} "${target.name}"`,
      } as const;
    },
    checked: function (target: Locator) {
      return {
        assert: 'checked',
        target,
        args: [false],
      } as const;
    },
    expanded: function (target: Locator) {
      return {
        assert: 'expanded',
        target,
        args: [false],
      } as const;
    },
    selected: function (target: Locator) {
      return {
        assert: 'selected',
        target,
        args: [false],
      } as const;
    },
    disabled: function (target: Locator) {
      return {
        assert: 'disabled',
        target,
        args: [false],
      } as const;
    },
    current: function (
      target: Locator,
      expected:
        | 'true'
        | 'false'
        | 'page'
        | 'step'
        | 'location'
        | 'date'
        | 'time'
    ) {
      return {
        assert: 'current',
        target,
        args: [expected, false],
      } as const;
    },
    count: function (target: Locator, expected: number) {
      return {
        assert: 'count',
        target,
        args: [expected, false],
      } as const;
    },
    value: function (target: Locator, expected: string) {
      return {
        assert: 'value',
        target,
        args: [expected, false],
      } as const;
    },
    errorMessage: function (target: Locator, expected: string) {
      return {
        assert: 'errorMessage',
        target,
        args: [expected, false],
      } as const;
    },
  },
  a11ySnapshot: function (target: Locator, path: string) {
    return {
      assert: 'a11ySnapshot',
      target,
      args: [path],
      log: `a11ySnapshot!: ${locatorLog(target)}`,
    } as const;
  },
  tableSnapshot: function (target: Locator, path: string) {
    return {
      assert: 'tableSnapshot',
      target,
      args: [path],
      log: `tableSnapshot!: ${locatorLog(target)}`,
    } as const;
  },
};
