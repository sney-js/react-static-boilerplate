import React from "react";
import { Header } from "../../components/header/Header";
import { useSiteData } from "react-static";
import Footer from "../../components/footer/Footer";

export default function FooterContainer(props) {
    const { footer } = useSiteData();
    if (!footer) return null;
    return <Footer links={footer.links} content={footer.copyright} />;
}
