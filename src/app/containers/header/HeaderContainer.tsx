import React, { useContext } from "react";
import { Header } from "../../components/header/Header";
import { RespImage } from "../../utils/RespImage";
import { GlobalContext } from "../../components/layout/Layout";
import { getSiteDataForKey } from "../helpers";
import { useSiteData } from "react-static";

export default function HeaderContainer() {
    const { locale } = useContext(GlobalContext);
    const { localeData } = useSiteData();
    const header = getSiteDataForKey("header", locale);

    if (!header) return null;
    return (
        <Header
            key={`Header-${locale}`}
            currentLocale={locale}
            title={header.name}
            links={header.links}
            themeToggle={true}
            localeData={localeData.hasMultipleLocales && localeData}
            logo={<RespImage image={header.logo} widthMax={100} />}
            logoLink={header.logoLink}
        />
    );
}
