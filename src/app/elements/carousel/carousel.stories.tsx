import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Carousel } from "./Carousel";
import Container from "../../components/container/Container";

const items = [
    <img src="https://dummyimage.com/600x400/000/fff.jpg" />,
    <img src="https://dummyimage.com/1000x500/d435d4/fff.jpg" />,
    <img src="https://dummyimage.com/1600x400/000/fff.jpg" />,
];

storiesOf("Carousel", module).add("default carousel", () => (
    <Container pad="Vertical">
        <h2>Default Carousel</h2>
        <Carousel items={items} />
    </Container>
));
