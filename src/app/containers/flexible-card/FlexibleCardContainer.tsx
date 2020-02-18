import Link from "../link/link";
import FlexibleCard, { FlexibleCardProps } from "../../components/flexible-card/FlexibleCard";
import React from "react";
import { RespImage } from "../../utils/RespImage";
import { IFlexibleCardFields } from "../../../contentful/@types/contentful";
import { Theme } from "../../models/Theme";
import Container from "../../components/container/Container";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        caption,
        title,
        description,
        notice,
        button,
        secondaryButton,
        theme,
        image,
    } = (item.fields as IFlexibleCardFields);

    const transformedData: FlexibleCardProps = {
        caption,
        title,
        description,
        notice,
        button: button && Link({ item: button }),
        secondaryButton: secondaryButton && Link({ item: secondaryButton }),
        theme: Theme[theme && theme.toUpperCase() || Theme.YELLOW],
        image: image && RespImage({ image: image }),
    };

    return <FlexibleCard {...rest} {...transformedData}  animateIn/>;
};
