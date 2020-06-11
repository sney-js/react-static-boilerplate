import React from "react";
import { addParameters } from '@storybook/react';
import '../src/styles/main.scss';
import '../src/styles/development/main.scss';
import { StorySorter } from './sorter';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';

addDecorator((story) => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  mobileLarge: {
    name: 'Large Mobile',
    styles: {
      width: '414px',
      height: '896px'
    }
  },
  Tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  TabletLarge: {
    name: 'Large Tablet',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1200px',
      height: '720px'
    }
  },
  Widescreen: {
    name: 'Widescreen',
    styles: {
      width: '1440px',
      height: '900px'
    }
  },
  HD: {
    name: 'HD',
    styles: {
      width: '1920px',
      height: '1080px'
    }
  }
};

addParameters({
  viewport: {
    viewports: {
      ...customViewports
    }
  }
});

addParameters({
  themes: [
    { name: 'Light', class: 'data-theme-light', color: '#e7e7e7' },
    { name: 'Dark', class: 'data-theme-dark', color: '#222222' }
  ]
});

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    // showRoots: true
  }
});

/**
 * Order described here is used to order the storybook.
 * @type {{level1: [string, string, string], level2: [string]}}
 */
const STORY_ORDER = {
  level1: ['intro', 'elements', 'components'],
  level2: ['getting started', 'contributing']
};

addParameters({
  options: {
    storySort: (a, b) => StorySorter(a, b, STORY_ORDER)
  }
});
