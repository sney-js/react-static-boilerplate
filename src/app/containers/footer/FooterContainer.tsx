import React, { useContext } from "react";
import { useSiteData } from "react-static";
import Footer from "../../components/footer/Footer";
import { GlobalContext } from "../../components/layout/Layout";

export default function FooterContainer(props) {
    const globalContext = useContext(GlobalContext);
    const locale = globalContext.locale;
    const { siteData } = useSiteData();
    const footer = siteData[locale].footer;
    console.log("site", siteData);
    if (!footer) return null;
    return <Footer links={footer.links} content={footer.copyright}/>;
}
