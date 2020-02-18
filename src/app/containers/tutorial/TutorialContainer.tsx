import React from "react";
import { RespImage } from "../../utils/RespImage";
import { ITutorialFields } from "../../../contentful/@types/contentful";
import TutorialComponent from "../../components/tutorial-component/TutorialComponent";
import TextCardContainer from "../textCard/textCard";
import { Theme } from "../../models/Theme";

function getItems(items) {
    if (!items) return null;

    if (items.length === 1) {
        const card = TextCardContainer({ item: items[0] });
        return [
            React.cloneElement(card, {
                ...card.props,
                padded: false,
            }),
        ];
    }

    return items.map(item => {
        const card = TextCardContainer({ item: item });
        return React.cloneElement(card, {
            ...card.props,
            padded: false,
            splitColumns: "desktop",
        });
    });
}

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const { title, caption, image, items, theme } = item.fields as ITutorialFields;

    const transformedData: TutorialComponent["props"] = {
        caption,
        title,
        image: image && RespImage({ image: image }),
        items: getItems(items),
        theme: (theme && Theme[theme.toUpperCase()]) || Theme.PURPLE,
    };

    return <TutorialComponent {...rest} {...transformedData} />;
};
