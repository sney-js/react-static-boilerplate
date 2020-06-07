import { ContentfulApi } from "./api";
import { ContentfulEntry, resolve, resolveLinkInfo } from "../app/utils/Resolver";
import { CleanupConfig, cleanupData } from "./cleaner";
import { IArticle, IPage } from "./@types/contentful";
import * as Flatted from "flatted";
import RouteConfig from "./RouteConfig";
import { Route } from "react-static";

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
    pages: Array<{ contentType: string; parentField?: string }>;
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

    private async routeDataResolver(): Promise<RouteDataType[][]> {
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
                            .then(
                                (query): RouteDataType => ({
                                    contentType: contentName,
                                    pageList: query.items.map(page =>
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
        cleanupData(page);
        return {
            page,
            name: page?.fields?.name,
            path: resolve(page),
            locale: lang,
        };
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
            const articlesAll = routes.find(i => i.contentType === "article").pageList;

            const categoriesGrouped = groupByArray(
                articlesAll,
                x => x.page.fields.category.fields.name,
            );

            return routes.map(({ contentType, pageList }) =>
                pageList.map((info: PageRouteData) => {

                    let extraData = {};

                    switch (contentType) {
                        case "category":
                            extraData = categoriesGrouped
                                .find(e => e.key === info.name)
                                .values.map(ar => ar.page);
                            break;
                        case "article":
                            const page = info.page as IArticle;
                            let articleCategory = page.fields.category?.fields.name;
                            extraData = categoriesGrouped
                                .find(e => e.key === articleCategory)
                                ?.values.map(ar => resolveLinkInfo(ar.page));
                            break;
                    }

                    const reactStaticRouteData: ReactStaticRoute = {
                        path: info.path,
                        template: `${TEMPLATES_FOLDER}${contentType}`,
                        getData: (): { extraData: string; page: string; locale: String } => ({
                            page: Flatted.stringify(info.page),
                            extraData: Flatted.stringify(extraData),
                            locale: info.locale,
                        }),
                    };
                    return reactStaticRouteData;
                }),
            );
        });

        const pageCollection = flatten(flatten(pathsArray));
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
