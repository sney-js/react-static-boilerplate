import React from "react";
import { getByPath } from "./helpers";

const createSrcSetEntry = (url, width, extraParams = "") => `${url}?q=85&w=${width}${extraParams}`;

export const getUrl = (image, width = "1440", extraParams = undefined) =>
    `${createSrcSetEntry(image.fields.file.url, width, extraParams)}`;

export const RespImage = ({
    image = undefined,
    imageUrl = undefined,
    width = "1440",
    widthVw = 100,
    ...rest
}) => {
    if (!imageUrl && !getByPath(image, "fields.file.url")) return null;

    const url = imageUrl || image.fields.file.url;
    const srcsets = [400, 800, 1440, 1920].map(width => {
        return createSrcSetEntry(url, width, ` ${width}w`);
    });
    return (
        <img
            {...rest}
            src={url}
            srcSet={srcsets.join(", ")}
            sizes={`(max-width: ${width}px) ${widthVw}vw, ${width}px`}
            alt={(image && (image.fields.description || image.fields.title)) || imageUrl}
        />
    );
};
