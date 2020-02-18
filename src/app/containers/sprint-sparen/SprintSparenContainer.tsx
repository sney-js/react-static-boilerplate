import link from "../link/link";
import React from "react";
import { RespImage } from "../../utils/RespImage";
import { ISprintSparenFields } from "../../../contentful/@types/contentful";
import SprintSparen, { SprintSparenConnected } from "../../components/sprint-sparen/SprintSparen";
import RichText from "../../elements/rich-text/RichText";
import Container from "../../components/container/Container";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        image,
        caption,
        title,
        description,
        notice,
        showMoreButtonLabel,
        currentMultiplierLabel,
        nextMultiplierLabel,
        button,
        forActiveUser,
        tableData,
    } = item.fields as ISprintSparenFields;

    const transformedData: SprintSparen["props"] = {
        image: RespImage({ image: image }),
        caption,
        title,
        description,
        notice: RichText({ html: notice }),
        showMoreButtonLabel,
        currentMultiplierLabel,
        nextMultiplierLabel,
        button: link({ item: button }),
        forActiveUser,
        tableData: tableData as Array<any>,
    };

    return <SprintSparenConnected {...rest} {...transformedData} animateIn />;
};
