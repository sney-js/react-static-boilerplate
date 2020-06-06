import { ContentfulApi } from "./api";
import { resolve, resolveLinkInfo } from "../app/utils/Resolver";
import { CleanupConfig, cleanupData } from "./cleaner";
import { IArticleFields, IPage } from "./@types/contentful";
import * as Flatted from "flatted";
import RouteConfig from "./RouteConfig";
import { Sys } from "contentful";

type ReactStaticRoute = {
    path: string;
    template: string;
    getData: () => { page: string; extraData: string; locale: String };
    children?: Array<ReactStaticRoute>;
    redirect?: string;
};

type ContentfulEntry = {
    sys: Sys;
    fields: any;
};

export type RouteGeneratorConfig = {
    pageList: string[];
    cleanupConfig?: CleanupConfig;
    pages?: Array<{ contentType: string; parentField?: string }>;
};

export type PageRouteData = {
    page: ContentfulEntry;
    name: string;
    path: string;
    locale: string;
};

export type RouteDataType = {
    contentType: string;
    pages: Array<PageRouteData>;
};

class RouteGenerator {
    client;
    config: RouteGeneratorConfig;
    defaultLocale: string;
    locales: string[];

    constructor(client: ContentfulApi) {
        this.client = client;
        this.config = RouteConfig;
    }

    private async routeDataResolver(): Promise<Array<RouteDataType[]>> {
        this.defaultLocale = await this.client.getLocale();
        this.locales = await this.client.getLocales();

        const pageList = this.config.pages.map(p => p.contentType);

        return Promise.all(
            // for each locale
            this.locales.map(lang =>
                Promise.all(
                    // for each page
                    pageList.map(contentName =>
                        // make contentful calls to retrieve each page for each locale
                        this.client
                            .setLocale(lang)
                            .getPages(contentName)
                            .then(query => ({
                                contentType: contentName,
                                pages: query.items.map(page => this.generatePageData(page, lang)),
                            })),
                    ),
                ),
            ),
        );
    }

    private generatePageData(page: IPage, lang: string): PageRouteData {
        cleanupData(page, this.config.cleanupConfig);
        return {
            page,
            name: page?.fields?.name,
            path: resolve(page, this.defaultLocale),
            locale: lang,
        };
    }

    async getRoutes(): Promise<Array<ReactStaticRoute>> {
        const localisedRoutes = await this.routeDataResolver();

        const pathsArray = localisedRoutes.map(routes => {
            const allArticles = routes.find(i => i.contentType === "article").pages;
            const groupedCategories = groupByArray(
                allArticles,
                x => x.page.fields.category.fields.name,
            );

            return routes.map(({ contentType, pages }) => {
                return pages.map(info => {
                    let extraData = {};
                    if (contentType === "category") {
                        extraData = groupedCategories
                            .find(e => e.key === info.name)
                            .values.map(ar => ar.page);
                    }
                    if (contentType === "article") {
                        extraData = groupedCategories
                            .find(
                                e =>
                                    e.key ===
                                    (info.page.fields as IArticleFields).category?.fields.name,
                            )
                            ?.values.map(ar => resolveLinkInfo(ar.page));
                    }
                    return {
                        path: info.path,
                        template: `src/app/containers/page/Page_${contentType}`,
                        getData: (): { extraData: string; page: string; locale: String } => ({
                            page: Flatted.stringify(info.page),
                            extraData: Flatted.stringify(extraData),
                            locale: info.locale,
                        }),
                    };
                });
            });
        });

        const pageCollection = flatten(flatten(pathsArray));
        //TODO print failed pages. before / after
        console.log("::::::::::Rendering pages:::::::::::");
        pageCollection.map(i => console.log(i.path));
        console.log("::::::::::::::::::::::::::::::::::::");
        return pageCollection;
    }
}

const flatten = arr => {
    return [].concat.apply([], arr);
};

const groupByArray = (xs, key) => {
    return xs.reduce(function(rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find(r => r && r.key === v);
        if (el) {
            el.values.push(x);
        } else {
            rv.push({ key: v, values: [x] });
        }
        return rv;
    }, []);
};

export default RouteGenerator;
