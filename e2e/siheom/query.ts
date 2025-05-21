import { screen } from '@testing-library/preact';
import { Locator } from './types';

export const getElement = <T extends boolean>(
  locator: Locator,
  isVisible: T
): T extends true ? HTMLElement : HTMLElement | null => {
  if (locator.role === 'label') {
    if (isVisible) {
      return screen.getByLabelText(locator.name);
    } else {
      return screen.queryByLabelText(locator.name) as HTMLElement;
    }
  }

  if (isVisible) {
    return screen.getByRole(locator.role, { name: locator.name });
  } else {
    return screen.queryByRole(locator.role, {
      name: locator.name,
    }) as HTMLElement;
  }
};

export const getElements = <T extends boolean>(
  locator: Locator,
  isVisible: T
): T extends true ? HTMLElement[] : HTMLElement[] | null => {
  if (locator.role === 'label') {
    if (isVisible) {
      return screen.getAllByLabelText(locator.name);
    } else {
      return screen.queryAllByLabelText(locator.name);
    }
  } else {
    if (isVisible) {
      return screen.getAllByRole(locator.role, {
        name: locator.name,
      });
    } else {
      return screen.queryAllByRole(locator.role, {
        name: locator.name,
      });
    }
  }
};

export function locatorLog(target: Locator) {
  if (typeof target.name === 'string') {
    return `${target.role} "${target.name}"`;
  } else {
    return `${target.role} ${target.name}`;
  }
}

export const query = Object.fromEntries(
  [
    'article',
    'cell',
    'columnheader',
    'definition',
    'directory',
    'document',
    'figure',
    'group',
    'heading',
    'img',
    'list',
    'listitem',
    'meter',
    'row',
    'rowgroup',
    'rowheader',
    'separator',
    'table',
    'term',
    'blockquote',
    'caption',
    'code',
    'deletion',
    'emphasis',
    'insertion',
    'paragraph',
    'strong',
    'subscript',
    'superscript',
    'time',

    'scrollbar',
    'searchbox',
    'separator',
    'slider',
    'spinbutton',
    'switch',
    'tab',
    'tabpanel',
    'treeitem',

    'button',
    'checkbox',
    'gridcell',
    'link',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'progressbar',
    'radio',
    'textbox',

    'combobox',
    'menu',
    'menubar',
    'tablist',
    'tree',
    'treegrid',

    'banner',
    'complementary',
    'contentinfo',
    'form',
    'main',
    'navigation',
    'region',
    'search',

    'alert',
    'log',
    'marquee',
    'status',
    'timer',

    'alertdialog',
    'dialog',
  ]
    .concat(['label', 'text'])
    .map((role) => [role, (name: string | RegExp) => ({ role, name })])
) satisfies Record<string, (...args: any[]) => Locator>;
