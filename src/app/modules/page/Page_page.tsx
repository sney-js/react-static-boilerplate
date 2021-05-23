import React from "react";
import { useRouteData } from "react-static";
import "./page.scss";
import Layout, { MetaData } from "../../components/layout/Layout";
import { renderContentContainer } from "../utils/renderer";
import { parse } from "flatted";

type PageProps = {
    changeTheme?: Function;
    changeLocale?: Function;
    path?: string;
    routeData?: any;
};

const Page_page = (props: PageProps) => {
    let page, locale;

    const routeData = useRouteData();
    page = routeData.page;
    page = parse(page);
    locale = routeData.locale;

    const metaData = page.fields.metaData ? page.fields.metaData.fields : "";
    return (
        <Layout locale={locale}>
            <MetaData {...metaData} />
            {page.fields.content &&
                page.fields.content.map((item, index) =>
                    renderContentContainer({ item, key: index }),
                )}
        </Layout>
    );
};

export default Page_page;
