import React from "react";
import Container from "../../components/container/Container";
import { renderContentContainer } from "../utils/renderer";
import { IWrapperComponentFields } from "../../../contentful/@types/contentful";

export default ({ item, ...rest }) => {
    if (!item) return null;

    const { backgroundStyle, backgroundPosition } = item.fields as IWrapperComponentFields;

    const transformedData: Container["props"] = {
        background: backgroundStyle && backgroundStyle.toLowerCase(),
        backgroundPosition: (backgroundPosition && backgroundPosition.toLowerCase()) as "fill" | "top" | "bottom",
    };

    return (
        <Container {...transformedData} {...rest}>
            {item.fields.content &&
            item.fields.content.map((item, index) =>
                renderContentContainer({ item, key: index }),
            )}
        </Container>
    );
};

// export default class extends Component<{
//     item: any;
//     extra?: {};
// }> {
//     render() {
//         let { item, extra = {} } = this.props;
//         const backgroundStyle = item.fields.backgroundStyle.toLowerCase();
//
//         //TODO implement when required.
//         const backgroundPosition =
//             item.fields.backgroundPosition && item.fields.backgroundPosition.toLowerCase();
//         return (
//             <Container
//                 className={"wrapper"}
//                 background={backgroundStyle}
//                 backgroundPosition={backgroundPosition}
//             ></Container>
//         );
//     }
// }
