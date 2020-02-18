import Link from "../link/link";
import React from "react";
import { RespImage } from "../../utils/RespImage";
import { IHeroFields } from "../../../contentful/@types/contentful";
import { getByPath } from "../../utils/helpers";
import HeroConnected, { Hero } from "../../components/hero-component/hero";
import RichText from "../../elements/rich-text/RichText";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        caption,
        title,
        description,
        notice,
        button,
        image,
        forLoggedIn,
        showBalance,
        balanceLabel,
        showBarcode,
    } = item.fields as IHeroFields;

    const transformedData: Hero["props"] = {
        caption,
        title,
        description,
        notice: RichText({html: notice}),
        button: Link({item: button}),
        image: RespImage({image: image}),
        forLoggedIn,
        showBalance,
        balanceLabel,
        showBarcode,
    };

    return <HeroConnected {...rest} {...transformedData} />;
};
