import React from "react";
import { ICookieBannerFields } from "../../../contentful/@types/contentful";
import CookieBanner from "../../components/cookie-banner/CookieBanner";
import RichText from "../../elements/rich-text/RichText";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const { caption, content, setAnalyticsCookie, setTrackingCookie } = item.fields as ICookieBannerFields;

    const transformedData: CookieBanner["props"] = {
        caption,
        content: RichText({ html: content }),
        setAnalyticsCookie,
        setTrackingCookie,
    };

    return <CookieBanner {...transformedData} />;
};
