import { HAS_WINDOW, WINDOW } from "./helpers";
import { useEffect, useState } from "react";

export const size = {
    mobile: 600,
    tablet: 902,
    laptop: 1024,
    desktop: 1440,
    hd: 1920,
};

// export const device = {
//   mobile: `only screen and (max-width: ${size.mobile}px)`,
//   mobile_up: `only screen and (min-width: ${size.mobile + 1}px)`,
//   tablet: `only screen and (max-width: ${size.tablet}px)`,
//   tablet_up: `only screen and (min-width: ${size.tablet + 1}px)`,
//   laptop: `only screen and (max-width: ${size.laptop}px)`,
//   desktop_up: `only screen and (min-width: ${size.laptop + 1}px)`,
//   desktop: `only screen and (max-width: ${size.desktop}px)`,
//   hd: `only screen and (max-width: ${size.hd}px)`
// };

export const isMobile = () => {
    const width = WINDOW?.innerWidth;
    return width <= size.mobile;
};

export const isTablet = () => {
    const width = WINDOW?.innerWidth;
    return width <= size.tablet && width > size.mobile;
};

export const isTabletOrMobile = () => {
    const width = WINDOW?.innerWidth;
    return width <= size.tablet;
};

export const isDesktop = () => {
    const width = WINDOW?.innerWidth;
    return width > size.tablet;
};

export const vwHeight = () => {
    return WINDOW?.innerHeight || 0;
};

export const vwWidth = () => {
    return WINDOW?.innerWidth || 0;
};


/**
 * Refreshed dom on mediaQueries. Returns values as per array.
 * Uses 3 Media Queries
 * @param values [mobile, tablet + mobile, desktop]
 * @param defaultValue
 */
export const useMedia = (values?: [any, any, any], defaultValue?: any) => {

    if (!HAS_WINDOW) return defaultValue;

    if (!values || values.length !== 3) {
        values = [1, 2, 3];
        defaultValue = 0;
    }
    // Array containing a media query list for each query
    const queries = [
        `(max-width: ${size.mobile}px)`,
        `(max-width: ${size.tablet}px)`,
        `(min-width: ${size.desktop + 1}px)`,
    ];

    const mediaQueryLists = queries.map(q => WINDOW.matchMedia(q));

    // Function that gets value based on matching media query
    const getValue = () => {
        // Get index of first media query that matches
        const index = mediaQueryLists.findIndex(mql => mql.matches);
        // Return related value or defaultValue if none
        return typeof values[index] !== "undefined" ? values[index] : defaultValue;
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
            mediaQueryLists.forEach(mql => mql.addListener(handler));
            // Remove listeners on cleanup
            return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
        },
        [], // Empty array ensures effect is only run on mount and unmount
    );

    return value;
};
