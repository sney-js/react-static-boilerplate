export const size = {
  mobile: 600,
  tablet: 902,
  laptop: 1024,
  desktop: 1440,
  hd: 1920
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
  const width = window?.innerWidth;
  return width <= size.mobile;
};

export const isTablet = () => {
  const width = window?.innerWidth;
  return width <= size.tablet && width > size.mobile;
};

export const isTabletOrMobile = () => {
  const width = window?.innerWidth;
  return width <= size.tablet;
};

export const isDesktop = () => {
  const width = window?.innerWidth;
  return width > size.tablet;
};

export const vwHeight = () => {
  return (window?.innerHeight) || 0;
};

export const vwWidth = () => {
  return (window?.innerWidth) || 0;
};
