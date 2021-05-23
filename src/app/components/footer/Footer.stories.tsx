import * as React from "react";
import Footer, { FooterProps } from "./Footer";
import Header from "../header/Header";
import { Meta } from "@storybook/react/types-6-0";

export default {
    title: "Components/Footer",
    component: Header,
} as Meta;

export const basic = (args: FooterProps): React.ReactElement => {
    return <Footer {...args} />;
};

basic.args = {
    content: "All rights reserved",
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
