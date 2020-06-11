import { WINDOW } from './Helpers';
import { useEffect, useState } from 'react';

type BreakpointType = {
  mobile: number;
  tablet: number;
  desktop: number;
  widescreen?: number;
  hd?: number;
};
export const defaultBreakpoints: BreakpointType = {
  mobile: 500,
  tablet: 902,
  desktop: 1024,
  widescreen: 1440,
  hd: 1920
};

/**
 * Device Factory helper methods
 */
export class Devices {
  static breakpoints = defaultBreakpoints;

  static withSizes(breakpoints: BreakpointType): Devices {
    this.breakpoints = Object.assign(this.breakpoints, breakpoints);
    return this;
  }

  /**
   * is width mobile and below
   */
  static isMobile(): boolean {
    const width = WINDOW?.innerWidth;
    return width <= this.breakpoints.mobile;
  }

  /**
   * is width above mobile and below desktop
   */
  static isTablet(): boolean {
    const width = WINDOW?.innerWidth;
    return width <= this.breakpoints.tablet && width > this.breakpoints.mobile;
  }

  /**
   * is width less than tablet?
   */
  static isTabletBelow(): boolean {
    if (!WINDOW) return false;
    const width = window.innerWidth;
    return width <= this.breakpoints.tablet;
  }

  /**
   * is width greater than tablet?
   */
  static isDesktop(): boolean {
    const width = WINDOW?.innerWidth;
    return width > this.breakpoints.tablet;
  }

  /**
   * Rerenders functional component at 3 defaultBreakpoints.
   * Breakpoints can be overwridden by calling withSizes() first.
   * @returns 1|2|3 - depending on the current active breakpoint in
   * mobile, tablet and desktop respectively
   */
  static useMedia(): unknown {
    const values = [1, 2, 3];
    const defaultValue = 0;
    // Array containing a media query list for each query
    const queries = [
      `(max-width: ${this.breakpoints.mobile}px)`,
      `(max-width: ${this.breakpoints.tablet}px)`,
      `(min-width: ${this.breakpoints.desktop + 1}px)`
    ];

    const mediaQueryLists = queries.map((q) => WINDOW.matchMedia(q));

    // Function that gets value based on matching media query
    const getValue = () => {
      // Get index of first media query that matches
      const index = mediaQueryLists.findIndex((mql) => mql.matches);

      if (!values) return defaultValue;
      // Return related value or defaultValue if none
      return typeof values[index] !== 'undefined'
        ? values[index]
        : defaultValue;
    };

    // State and setter for matched value
    const [value, setValue] = useState(getValue);

    useEffect(
      () => {
        // Event listener callback
        // Note: By defining getValue outside of useEffect we ensure that it has ...
        // ... current values of hook args (as this hook callback is created once on mount).
        const handler = () => setValue(getValue);
        // Set a listener for each media query with above handler as callback.
        mediaQueryLists.forEach((mql) => mql.addListener(handler));
        // Remove listeners on cleanup
        return () =>
          mediaQueryLists.forEach((mql) => mql.removeListener(handler));
      },
      [] // Empty array ensures effect is only run on mount and unmount
    );

    return value;
  }
}
