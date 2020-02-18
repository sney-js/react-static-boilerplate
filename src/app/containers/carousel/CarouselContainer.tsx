import Link from "../link/link";
import FlexibleCard, { FlexibleCardProps } from "../../components/flexible-card/FlexibleCard";
import React from "react";
import { RespImage } from "../../utils/RespImage";
import { ICarouselFields, IFlexibleCardFields } from "../../../contentful/@types/contentful";
import { Theme } from "../../models/Theme";
import CarouselCardContainer from "./CarouselCardContainer";
import { Carousel } from "../../elements/carousel/Carousel";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const { items } = item.fields as ICarouselFields;

    const transformedData: Carousel["props"] = {
        items: items.map(item => CarouselCardContainer({ item })),
    };

    return <Carousel {...rest} {...transformedData} animateIn />;
};
