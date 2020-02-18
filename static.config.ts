import * as path from "path";
import { ContentfulApi } from "./src/contentful/api";
import * as Flatted from "flatted";
import { routeDataResolver } from "./src/app/containers/helpers";

require("dotenv").config();
const client = new ContentfulApi({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENV,
});

export default {
    entry: path.resolve("./src/app/index.tsx"),
    getRoutes: async () => {
        const routes = await routeDataResolver(client);
        return routes
            .map(({ page, locale, path }) => {
                return {
                    path: path,
                    template: "src/app/containers/page/Page",
                    getData: () => ({
                        page: Flatted.stringify(page),
                        locale: locale,
                    }),
                };
            });
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
        "react-static-plugin-polyfills",
    ],
};
