import React from "react";
import Layout from "../../app/components/layout/Layout";
import { RespImage } from "../../app/utils/RespImage";
import LinkElement from "../../app/elements/link/LinkElement";
import { Carousel } from "../../app/elements/carousel/Carousel";
import CarouselCard from "../../app/components/carousel-card/CarouselCard";

const imageUrl =
    "//images.ctfassets.net/4h64vk8nggm5/5uQ70RqPyGahbisQMfTU9r/ccea82535e6b83ab7517f8641933c246/ben-kolde-FaPxZ88yZrw-unsplash.png";
const logoUrl =
    "//images.ctfassets.net/4h64vk8nggm5/1itEhij2dmJkEcuemqzZa5/fef9f16d19c9fbf3c434ae62dc9a6b63/fonQ_logo_oranje_RGB.png";
const cardData = {
    image: RespImage({ imageUrl }),
    logo: RespImage({ imageUrl: logoUrl }),
    caption: "Hello caption",
    title: "Hello title",
    description:
        "Some descriptions",
    notice: "Small notice on the bottom",
    // button: <LinkElement title={"primary button"} />,
    // secondaryButton: <LinkElement title={"secondary button"} />,
};

const items = [
    <CarouselCard {...cardData} type={"image-card"} logo={null} />,
    <CarouselCard {...cardData} />,
    <CarouselCard {...cardData} />,
    <CarouselCard {...cardData} type={"image-card"} logo={null}/>,
    <CarouselCard {...cardData} type={"image-card"} logo={null}/>,
    <CarouselCard {...cardData} />,
    <CarouselCard {...cardData} />,
];

export default () => {
    return (
        <Layout metaData={{ title: "Typography" }}>
            <div className="content">
                <Carousel items={items} />
            </div>
        </Layout>
    );
};
