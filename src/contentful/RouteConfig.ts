import linkHandler from "../app/containers/link/dataHandler";
import { RouteGeneratorConfig } from "./RouteGenerator";

const config: RouteGeneratorConfig = {
    pageList: ["page"],
    pages: [
        { contentType: "page", parentField: "parentPage" },
        { contentType: "article", parentField: "category" },
        { contentType: "category" },
    ],
    cleanupConfig: {
        handlers: {
            link: linkHandler,
        },
        ignoreProps: ["sys"],
        ignoreTypes: [],
    },
};
export default config;
