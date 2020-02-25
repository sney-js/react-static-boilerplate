import React, { useContext } from "react";
import { Header } from "../../components/header/Header";
import { useSiteData } from "react-static";
import { RespImage } from "../../utils/RespImage";
import { GlobalContext } from "../../components/layout/Layout";

export default function HeaderContainer() {
    const { siteData, localeData } = useSiteData();
    const { locale } = useContext(GlobalContext);
    const header = siteData[locale].header;
    if (!header) return null;
    console.log(header);
    return (
        <Header
            key={`Header-${locale}`}
            currentLocale={locale}
            title={header.name}
            links={header.links}
            themeToggle={true}
            localeData={localeData}
            logo={<RespImage image={header.logo} width={"100px"}/>}
            logoLink={header.logoLink}
        />
    );
}
