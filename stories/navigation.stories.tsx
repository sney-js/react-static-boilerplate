import { storiesOf } from "@storybook/react";
import * as React from "react";
import Header from "../src/app/components/header/Header";
import { RespImage } from "../src/app/utils/RespImage";

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
storiesOf("Navigation", module).add("default nav", () => (
    <React.Fragment>
        <Header
            links={ctfTest.links}
            logo={<RespImage imageUrl={"https://cdn.worldvectorlogo.com/logos/react.svg"} />}
            themeToggle={true}
        />
    </React.Fragment>
));
