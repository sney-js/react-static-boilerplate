import Link from "../link/link";
import React from "react";
import { RespImage } from "../../utils/RespImage";
import PartnersCard, { PartnersCardProps } from "../../components/partners-card/PartnersCard";
import { IPartnersCardFields } from "../../../contentful/@types/contentful";
import { getByPath } from "../../utils/helpers";
import Container from "../../components/container/Container";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        title,
        description,
        button,
        image,
        logo,
        logosImage,
    } = item.fields as IPartnersCardFields;

    const transformedData: PartnersCardProps = {
        title,
        description,
        button: button && Link({ item: button }),
        image: image && RespImage({ image: image }),
        logo: logo && <img src={getByPath(logo, "fields.file.url")} alt="logo" />,
        logosImage: logosImage && RespImage({ image: logosImage }),
    };

    return <PartnersCard {...rest} {...transformedData} animateIn />;
};
