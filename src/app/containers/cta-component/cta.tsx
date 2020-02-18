import React from "react";
import CTA, { BannerSizes } from "../../components/cta-component/cta";
import { RespImage } from "../../utils/RespImage";
import Link from "../link/link";
import { ICtaComponentFields } from "../../../contentful/@types/contentful";

export default ({ item, ...rest }) => {
    if (!item) return null;

    const { caption, title, image, button } = item.fields as ICtaComponentFields;

    const transformedData: CTA["props"] = {
        caption,
        title,
        button: Link({ item: button }),
        image: RespImage({ image: image }),
        bannerSize: BannerSizes.fullWidth,
    };

    return <CTA {...rest} {...transformedData} animateIn />;
};

// Add all new contentful containers here.
// export default class CtaContainer extends Component<CTAModel> {
//     render() {
//         let { item, extra = {} } = this.props;
//         const bannerSize = extra.style || BannerSizes.fullWidth;
//         const button = item.fields.button;
//         return (
//             <Container animateIn padded={extra.padded !== undefined ? extra.padded : true} maxWidth>
//                 <CTA
//                     bannerSize={bannerSize}
//                     title={item.fields.title}
//                     caption={item.fields.caption}
//                     button={
//                         <Button
//                             text={button && button.fields.title}
//                             link={<Link item={button} />}
//                         />
//                     }
//                     image={<RespImage className={"image"} image={item.fields.image} />}
//                 />
//             </Container>
//         );
//     }
// }
