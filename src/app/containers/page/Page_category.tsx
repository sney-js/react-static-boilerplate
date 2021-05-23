import React from "react";
import { useRouteData } from "react-static";
import "./page.scss";
import Layout, { MetaData } from "../../components/layout/Layout";
import { parse } from "flatted";
import { CardList } from "../list/ListContainer";

type PageProps = {
    changeTheme?: Function;
    changeLocale?: Function;
    path?: string;
    routeData?: any;
};

const Page_category = (props: PageProps) => {
    let page, locale, extraData;

    if (props.routeData) {
        page = props.routeData.page;
        locale = props.routeData.locale;
    } else {
        const routeData = useRouteData();
        page = routeData.page;
        page = parse(page);
        extraData = routeData.extraData;
        extraData = parse(extraData);
        locale = routeData.locale;
    }

    const metaData = page.fields.metaData ? page.fields.metaData.fields : "";
    return (
        <Layout locale={locale}>
            <MetaData {...metaData} />
            <CardList title={page.fields.title} list={extraData} />
        </Layout>
    );
};

export default Page_category;
