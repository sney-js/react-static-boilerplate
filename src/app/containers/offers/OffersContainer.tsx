import React from "react";
import { RespImage } from "../../utils/RespImage";
import { IOffersFields } from "../../../contentful/@types/contentful";
import Offers, { OffersConnected } from "../../components/offers/Offers";
import FlexibleCardContainer from "../flexible-card/FlexibleCardContainer";
import CtaContainer from "../cta-component/cta";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        notLoggedInCard,
        placeholderImage,
        validInLabel,
        validForLabel,
        activeLabel,
        activateButtonLabel,
        backButtonLabel,
        flipCardButtonLabel,
        campaignNames,
    } = item.fields as IOffersFields;

    const transformedData: Offers["props"] = {
        notLoggedInCard: notLoggedInCard && getNotLoggedInPlaceholder(notLoggedInCard, rest),
        placeholderImage: placeholderImage && RespImage({ image: placeholderImage }),
        validInLabel,
        validForLabel,
        activeLabel,
        activateButtonLabel,
        backButtonLabel,
        flipCardButtonLabel,
        campaignNames,
    };

    return <OffersConnected {...rest} {...transformedData} />;
};

function getNotLoggedInPlaceholder(component, rest) {
    switch (component.type) {
        case "flexibleCard":
            return FlexibleCardContainer({ item: component, ...rest });
        case "ctaComponent":
            return CtaContainer({ item: component, ...rest });
        default:
            return null;
    }
}
