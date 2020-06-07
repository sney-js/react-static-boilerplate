import { SiteData } from "../../contentful/RouteGenerator";

export type GlobalSiteData = {
    localeData: {
        allLocales: string[];
        defaultLocale: string;
        hasMultipleLocales: boolean;
    };
    siteData: SiteData | { [locale: string]: SiteData };
};
