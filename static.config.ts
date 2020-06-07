import * as path from "path";
import { ContentfulApi } from "./src/contentful/api";
import { resolveLinkInfo } from "./src/app/utils/Resolver";
import RouteGenerator from "./src/contentful/RouteGenerator";

require("dotenv").config();
const client = new ContentfulApi({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENV,
});

export default {
    entry: path.resolve("./src/app/index.tsx"),
    getSiteData: async () => {
        // -------------------------------Navigation---------------------------
        const defaultLocale = await client.getLocale();
        const locales = await client.getLocales();
        const localeSiteData = await Promise.all(
            locales.map(async lang => {
                // -------------------------------Header---------------------------
                client.setLocale(lang);
                const mainNav = await client.fetchEntry({
                    content_type: "header",
                    include: 3,
                    field: "slug",
                    value: "main-header",
                });
                const navSiteData = mainNav.fields;
                navSiteData.links = navSiteData.links.map(resolveLinkInfo);
                navSiteData.logoLink = resolveLinkInfo(navSiteData.logoLink);
                // -------------------------------Footer---------------------------

                client.setLocale(lang);
                const footer = await client.fetchEntry({
                    content_type: "footer",
                    field: "slug",
                    value: "main-footer",
                });
                const footerSiteData = footer.fields;
                footerSiteData.links = footerSiteData.links.map(resolveLinkInfo);
                // -------------------------------site data---------------------------
                return {
                    locale: lang,
                    header: navSiteData,
                    footer: footerSiteData,
                };
            }),
        );

        return {
            data: {},
            localeData: {
                allLocales: locales,
                defaultLocale: defaultLocale,
                hasMultipleLocales: locales.length > 1,
            },
            siteData: localeSiteData.reduce((a, b) => {
                return Object.assign({ [a.locale.toString()]: a, [b.locale.toString()]: b });
            }),
        };
    },
    getRoutes: async () => {
        const routeGenerator = new RouteGenerator(client);
        return routeGenerator.getRoutes();
    },
    plugins: [
        "react-static-plugin-typescript",
        [
            require.resolve("react-static-plugin-source-filesystem"),
            {
                location: path.resolve("./src/tests/pages"),
            },
        ],
        require.resolve("react-static-plugin-reach-router"),
        require.resolve("react-static-plugin-sitemap"),
        [
            "react-static-plugin-sass",
            {
                includePaths: ["src/app/", "src/app/scss"], // always includes `src/`
                // other options for the sass-loader
            },
        ],
        "react-static-plugin-scss-modules-rw",
        "react-static-plugin-file-replace",
    ],
};
