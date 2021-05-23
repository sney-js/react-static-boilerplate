import { useSiteData } from "react-static";
import { GlobalSiteData } from "../../models/SiteData";
import { SiteData } from "../../../contentful/RouteGenerator";

export const getSiteDataForLocale = (locale?: string): SiteData => {
    const { siteData, localeData } = useSiteData() as GlobalSiteData;
    return locale && localeData.hasMultipleLocales ? siteData[locale] : siteData;
};
