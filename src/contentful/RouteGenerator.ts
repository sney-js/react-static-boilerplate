import { ContentfulApi } from "./api";
import { ContentfulEntry, resolve, resolveLinkInfo } from "../app/utils/Resolver";
import { CleanupConfig, cleanupData } from "./EntryCleaner";
import { IArticle, IFooterFields, IHeaderFields, IPage } from "./@types/contentful";
import { stringify } from "flatted";
import RouteConfig from "./RouteConfig";
import { Route } from "react-static";

export type SiteData = {
    footer: IFooterFields;
    header: IHeaderFields;
    locale: String;
};

export type ReactStaticRoute = Route & {
    redirect?: string;
    sharedData?: string;
};

export type PageRouteData = {
    page: ContentfulEntry;
    name: string;
    path: string;
    locale: string;
};

export type RouteDataType = {
    contentType: string;
    pageList: Array<PageRouteData>;
};

export type RouteGeneratorConfig = {
    cleanupConfig: CleanupConfig;
    pages: Array<{ contentType: string; parentField?: string; parentPath?: string }>;
    defaultLocale: string;
};

const TEMPLATES_FOLDER = `src/app/containers/page/Page_`;

class RouteGenerator {
    client;
    config: RouteGeneratorConfig;
    defaultLocale: string;
    locales: string[];

    constructor(client: ContentfulApi) {
        this.client = client;
        console.log(":::: Loading config from ./RouteConfig.ts ::::");
        this.config = RouteConfig;
    }

    async getRoutes(): Promise<Array<ReactStaticRoute>> {
        /**
         * [
         *  {[{contentType, pageList:[]}]}, //en
         *  {[{contentType, pageList:[]}]}, //fr
         * ]
         */
        const localisedRoutes = await this.routeDataResolver();

        const pathsArray = localisedRoutes.map((routes: RouteDataType[]) => {
            const articlesAll = routes.find((i) => i.contentType === "article").pageList;

            const categoriesGrouped = groupByArray(
                articlesAll,
                (x) => x.page.fields.category.fields.name,
            );

            return routes.map(({ contentType, pageList }) =>
                pageList.map((info: PageRouteData) => {
                    let extraData = {};

                    switch (contentType) {
                        case "category": {
                            extraData = categoriesGrouped
                                .find((e) => e.key === info.name)
                                .values.map((ar) => ar.page);
                            break;
                        }
                        case "article": {
                            const page = info.page as IArticle;
                            const articleCategory = page.fields.category?.fields.name;
                            extraData = categoriesGrouped
                                .find((e) => e.key === articleCategory)
                                ?.values.map((ar) => resolveLinkInfo(ar.page));
                            break;
                        }
                    }

                    const reactStaticRouteData: ReactStaticRoute = {
                        path: info.path,
                        template: `${TEMPLATES_FOLDER}${contentType}`,
                        getData: (): { extraData: string; page: string; locale: String } => ({
                            page: stringify(info.page),
                            extraData: stringify(extraData),
                            locale: info.locale,
                        }),
                    };
                    return reactStaticRouteData;
                }),
            );
        });

        const pageCollection = flatten(flatten(pathsArray));
        console.log("::::::::::Rendering pages:::::::::::");
        pageCollection.map((i) => console.log(i.path));
        console.log("::::::::::::::::::::::::::::::::::::");
        return pageCollection;
    }

    async getSiteData() {
        // -------------------------------Navigation---------------------------
        const defaultLocale = RouteConfig.defaultLocale;
        const locales = await this.client.getLocales();

        const localeSiteData: SiteData[] = await Promise.all(
            locales.map(async (lang) => {
                // -------------------------------Header---------------------------
                this.client.setLocale(lang);
                const mainNav = await this.client.fetchEntry({
                    content_type: "header",
                    include: 3,
                    field: "slug",
                    value: "main-header",
                });
                cleanupData(mainNav, lang);
                // -------------------------------Footer---------------------------

                this.client.setLocale(lang);
                const footer = await this.client.fetchEntry({
                    content_type: "footer",
                    field: "slug",
                    value: "main-footer",
                });
                cleanupData(footer, lang);
                // -------------------------------site data---------------------------
                return {
                    locale: lang,
                    header: mainNav.fields,
                    footer: footer.fields,
                };
            }),
        );

        return {
            localeData: {
                allLocales: locales,
                defaultLocale: defaultLocale,
                hasMultipleLocales: locales.length > 1,
            },
            siteData: localeSiteData.reduce((a, b) => {
                return Object.assign({
                    [a.locale.toString()]: a,
                    [b.locale.toString()]: b,
                });
            }),
        };
    }

    private async routeDataResolver(): Promise<RouteDataType[][]> {
        this.defaultLocale = await this.client.getLocale();
        this.locales = await this.client.getLocales();

        const pageList = this.config.pages.map((p) => p.contentType);

        return Promise.all(
            // for each locale
            this.locales.map((lang) =>
                Promise.all(
                    // for each page
                    pageList.map((contentName) =>
                        // make contentful calls to retrieve each page for each locale
                        this.client
                            .setLocale(lang)
                            .getPages(contentName)
                            .then(
                                (query): RouteDataType => ({
                                    contentType: contentName,
                                    pageList: query.items.map((page) =>
                                        this.generatePageData(page, lang),
                                    ),
                                }),
                            ),
                    ),
                ),
            ),
        );
    }

    private generatePageData(page: IPage, lang: string): PageRouteData {
        cleanupData(page, lang);
        return {
            page,
            name: page?.fields?.name,
            path: resolve(page),
            locale: lang,
        };
    }
}

const flatten = (arr) => {
    return [...arr];
};

const groupByArray = (xs, key) => {
    return xs.reduce(function (rv, x) {
        const v = key instanceof Function ? key(x) : x[key];
        const el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        } else {
            rv.push({ key: v, values: [x] });
        }
        return rv;
    }, []);
};

export default RouteGenerator;
