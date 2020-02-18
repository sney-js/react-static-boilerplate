import React from "react";
import Link from "../link/link";
import { IFooterFields } from "../../../contentful/@types/contentful";
import FooterConnected, { Footer } from "../../components/footer/Footer";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        title,
        iconLink,
        links,
        loginLabel,
        logoutLabel,
        additionalLinks,
        copyright,
    } = item.fields as IFooterFields;

    const transformedData: Footer["props"] = {
        title,
        iconLink: iconLink && Link({ item: iconLink }),
        links: links && links.map((link, index) => Link({ item: link, index: index })),
        additionalLinks: additionalLinks && additionalLinks.map((link, index) => Link({ item: link, index: index })),
        loginLabel,
        logoutLabel,
        copyright,
    };

    return <FooterConnected {...transformedData} />;
};
