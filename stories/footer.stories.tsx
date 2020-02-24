import { storiesOf } from "@storybook/react";
import * as React from "react";
import Header from "../src/app/components/header/Header";
import { RespImage } from "../src/app/utils/RespImage";
import Footer from "../src/app/components/footer/Footer";

const ctfTest = {
    title: "Main Header",
    links: [
        {
            title: "Homepage",
            path: "/",
            isExternal: false,
        },
        {
            title: "News",
            path: "/news/",
            isExternal: false,
        },
    ],
};
storiesOf("Footer", module).add("default footer", () => (
    <React.Fragment>
        <Footer
            content={"Copyright Trademark"}
            links={ctfTest.links}
        />
    </React.Fragment>
));
