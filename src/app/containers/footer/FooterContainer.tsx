import React from "react";
import Link from "../link/link";
import { IFooterFields } from "../../../contentful/@types/contentful";
import { Footer } from "../../components/footer/Footer";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;
    //
    // const {
    //     title,
    //     iconLink,
    //     links,
    //     loginLabel,
    //     logoutLabel,
    //     additionalLinks,
    //     copyright,
    // } = item.fields as IFooterFields;

    return <Footer />;
};
