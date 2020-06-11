// could pass in an array of specific stylesheets for optimization
export const getAllCSSVariableNames = (styleSheets = document.styleSheets) => {
  const cssVars: string[] = [];
  // loop each stylesheet
  for (let i = 0; i < styleSheets.length; i++) {
    // loop stylesheet's cssRules
    try {
      // try/catch used because 'hasOwnProperty' doesn't work
      const sheet = styleSheets[i] as any;
      for (let j = 0; j < sheet.cssRules.length; j++) {
        try {
          // loop stylesheet's cssRules' style (property names)
          for (let k = 0; k < sheet.cssRules[j].style.length; k++) {
            const name: string = sheet.cssRules[j].style[k];
            // test name for css variable signiture and uniqueness
            if (name.startsWith('--') && cssVars.indexOf(name) === -1) {
              cssVars.push(name);
            }
          }
        } catch (error) {}
      }
    } catch (error) {}
  }
  return cssVars;
};

export const getElementCSSVariables = (
  allCSSVars: any,
  element = document.body,
  pseudo = undefined
) => {
  const elStyles = window.getComputedStyle(element, pseudo);
  const cssVars = {};
  for (let i = 0; i < allCSSVars.length; i++) {
    const key = allCSSVars[i];
    const value = elStyles.getPropertyValue(key);
    if (value) {
      cssVars[key] = value;
    }
  }
  return cssVars;
};
export const delay = (seconds = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), seconds));
/**
 * helper function to easily convert union props to array values
 * @param unionType e.g. `'dark' | 'light' | 'default' | 'none`
 */
export const getPropsUnionArray = (unionType: string) => {
  const unionStr = unionType.replace(/'/g, '');
  return unionStr
    .split('|')
    .map((e) => e.trim())
    .map((e) => (e === 'undefined' ? undefined : e));
};
