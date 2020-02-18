import Link from "../link/link";
import FlexibleCard, { FlexibleCardProps } from "../../components/flexible-card/FlexibleCard";
import React from "react";
import { RespImage } from "../../utils/RespImage";
import { ICarouselCardFields } from "../../../contentful/@types/contentful";
import { Theme } from "../../models/Theme";
import CarouselCard from "../../components/carousel-card/CarouselCard";
import { getByPath } from "../../utils/helpers";
import { toDashCase } from "../helpers";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        type,
        caption,
        title,
        description,
        notice,
        button,
        secondaryButton,
        image,
        logo,
    } = item.fields as ICarouselCardFields;

    const transformedData: CarouselCard["props"] = {
        type: toDashCase(type) || "default",
        caption,
        title,
        description,
        notice,
        button: button && Link({ item: button }),
        secondaryButton: secondaryButton && Link({ item: secondaryButton }),
        image: image && RespImage({ image: image }),
        logo: logo && <img src={getByPath(logo, "fields.file.url")} alt="logo" />,
    };

    return <CarouselCard {...transformedData} />;
};
