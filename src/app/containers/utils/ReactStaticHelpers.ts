import { useSiteData } from "react-static";

export const getSiteDataForKey = function(key: string, locale: string) {
    const { siteData, localeData } = useSiteData();
    return localeData.hasMultipleLocales ? siteData[locale][key] : siteData[key];
};
