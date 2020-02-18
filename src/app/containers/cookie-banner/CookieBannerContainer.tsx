import React from "react";
import CookieBanner from "../../components/cookie-banner/CookieBanner";
import RichText from "../../elements/rich-text/RichText";

// Add all new contentful containers here.
export default () => {
    // if (!item) return null;
    //
    // const { caption, content, setAnalyticsCookie, setTrackingCookie } = item.fields as ICookieBannerFields;
    //
    // const transformedData: CookieBanner["props"] = {
    //     caption,
    //     content: RichText({ html: content }),
    //     setAnalyticsCookie,
    //     setTrackingCookie,
    // };

    return <CookieBanner/>;
};
