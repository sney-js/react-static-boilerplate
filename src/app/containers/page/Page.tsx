import React from "react";
import { useRouteData } from "react-static";
import "./page.scss";
import Layout from "../../components/layout/Layout";
import { renderContentContainer } from "../utils/renderer";
import Flatted from "flatted";
import FooterContainer from "../footer/FooterContainer";
import HeaderContainer from "../header/HeaderContainer";
import { IPage } from "../../../contentful/@types/contentful";
import CookieBannerContainer from "../cookie-banner/CookieBannerContainer";

type PageProps = {
    changeTheme?: Function;
    changeLocale?: Function;
    path?: string;
    routeData?: any;
};

const Page = (props: PageProps) => {
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

    const {
        fields: { title, theme, filledBackground },
    } = page as IPage;

    let metaData = page.fields.metaData ? page.fields.metaData.fields : { title: title };
    return (
        <Layout
            header={HeaderContainer({ item: page.fields.header })}
            footer={FooterContainer({ item: page.fields.footer })}
            cookieBanner={CookieBannerContainer({ item: page.fields.cookieBanner })}
            metaData={metaData}
            locale={locale}
        >
            {page.fields.content &&
                page.fields.content.map((item, index) =>
                    renderContentContainer({ item, key: index }),
                )}
        </Layout>
    );
};

export default Page;
