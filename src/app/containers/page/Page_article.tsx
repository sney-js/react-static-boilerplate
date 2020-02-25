import React from "react";
import { useRouteData } from "react-static";
import "./page.scss";
import Layout, { MetaData } from "../../components/layout/Layout";
import { renderContentContainer } from "../utils/renderer";
import Flatted from "flatted";

type PageProps = {
    changeTheme?: Function;
    changeLocale?: Function;
    path?: string;
    routeData?: any;
};

const Page_page = (props: PageProps) => {
    let page, locale;

    if (props.routeData) {
        page = props.routeData.page;
        locale = props.routeData.locale;
    } else {
        const routeData = useRouteData();
        page = routeData.page;
        page = Flatted.parse(page);
        locale = routeData.locale;
    }
    let metaData = page.fields.metaData ? page.fields.metaData.fields : "";
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
