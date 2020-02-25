import React, { useContext } from "react";
import { useSiteData } from "react-static";
import Footer from "../../components/footer/Footer";
import { GlobalContext } from "../../components/layout/Layout";
import { getSiteDataForKey } from "../helpers";

export default function FooterContainer(props) {
    const { locale } = useContext(GlobalContext);
    const footer = getSiteDataForKey("footer", locale);
    if (!footer) return null;
    return <Footer links={footer.links} content={footer.copyright}/>;
}
