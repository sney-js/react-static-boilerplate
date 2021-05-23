import React from "react";
import Button, { ButtonProps } from "./Button";
import { Meta } from "@storybook/react/types-6-0";

export default {
    title: "Elements/Button",
    component: Button,
    parameters: {
        componentSubtitle: "Element",
    },
} as Meta;

export const basic = (args: ButtonProps): React.ReactElement => <Button {...args} />;
basic.args = {
    title: "Button",
};
