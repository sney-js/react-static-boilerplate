import * as path from "path";
import { ContentfulApi } from "./src/contentful/api";
import * as Flatted from "flatted";
import { routeDataResolver } from "./src/app/containers/helpers";
import { resolveLinkInfo, resolvePageInfo } from "./src/app/utils/Resolver";

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

        const mainNav = await client.fetchEntry({
            content_type: "header",
            include: 3,
            field: "slug",
            value: "main-header",
        });
        const navSiteData = mainNav.fields;
        navSiteData.links = navSiteData.links.map(resolveLinkInfo);
        // -------------------------------Footer---------------------------

        const footer = await client.fetchEntry({
            content_type: "footer",
            field: "slug",
            value: "main-footer",
        });
        const footerSiteData = footer.fields;
        footerSiteData.links = footerSiteData.links.map(resolveLinkInfo);
        // -------------------------------site data---------------------------

        return {
            data: {},
            header: navSiteData,
            footer: footerSiteData,
        };
    },
    getRoutes: async () => {
        const pageList = ["page", "article", "category"];
        const routes = await routeDataResolver(client, pageList);
        const pageRoutes = routes.map(({ type, items }) => {
            return items.map(info => ({
                path: info.path,
                template: `src/app/containers/page/Page_${type}`,
                getData: () => ({
                    page: Flatted.stringify(info.page),
                    locale: info.locale,
                }),
            }));
        });

        const pageCollection = [].concat(...pageRoutes);

        //TODO print failed pages. before / after
        pageCollection.map(i => console.log(i.path));
        return pageCollection;
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
