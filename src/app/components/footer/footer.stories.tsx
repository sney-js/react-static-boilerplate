import { storiesOf } from "@storybook/react";
import * as React from "react";
import Footer from "./Footer";

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
        <Footer content="Copyright Trademark" links={ctfTest.links} />
    </React.Fragment>
));
