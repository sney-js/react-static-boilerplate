import React from "react";
import { useRouteData } from "react-static";
import "./page.scss";
import { changeLocale, changeTheme } from "../../actions";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import { renderContentContainer } from "../utils/renderer";
import Flatted from "flatted";
import AuthGuard from "../auth-guard/AuthGuard";
import FooterContainer from "../footer/FooterContainer";
import HeaderContainer from "../header/HeaderContainer";
import { IPage } from "../../../contentful/@types/contentful";
import CookieBannerContainer from "../cookie-banner/CookieBannerContainer";

function mapDispatchToProps(dispatch) {
    return {
        changeTheme: payload => dispatch(changeTheme(payload)),
        changeLocale: payload => dispatch(changeLocale(payload)),
    };
}

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

    props.changeTheme({ theme });
    props.changeLocale({ locale });

    let metaData = page.fields.metaData ? page.fields.metaData.fields : { title: title };
    return (
        <AuthGuard requireAuthorization={page.fields.requireAuthorization}>
            <Layout
                filledBackground={filledBackground}
                metaData={metaData}
                locale={locale}
                cookieBanner={CookieBannerContainer({ item: page.fields.cookieBanner })}
                header={HeaderContainer({ item: page.fields.header })}
                footer={FooterContainer({ item: page.fields.footer })}
            >
                {page.fields.content &&
                    page.fields.content.map((item, index) =>
                        renderContentContainer({ item, key: index }),
                    )}
            </Layout>
        </AuthGuard>
    );
};

export default connect(
    null,
    mapDispatchToProps,
)(Page);
