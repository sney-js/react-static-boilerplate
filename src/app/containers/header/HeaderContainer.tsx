import React, { useContext } from "react";
import { Header } from "../../components/header/Header";
import { RespImage } from "../../utils/RespImage";
import { GlobalContext } from "../../components/layout/Layout";
import { getSiteDataForLocale } from "../utils/ReactStaticHelpers";
import { useSiteData } from "react-static";
import { LinkData } from "../../models/LinkData";

const HeaderContainer = () => {
    const { locale } = useContext(GlobalContext);
    const { localeData } = useSiteData();
    const header = getSiteDataForLocale(locale).header;

    if (!header) return null;
    console.log(header);
    return (
        <Header
            key={`Header-${locale}`}
            currentLocale={locale}
            title={header.name}
            links={header.links as LinkData[]}
            themeToggle={true}
            localeData={localeData.hasMultipleLocales && localeData}
            logo={<RespImage image={header.logo} widthMax={100} />}
            logoLink={header.logoLink as LinkData}
        />
    );
};
export default HeaderContainer;
