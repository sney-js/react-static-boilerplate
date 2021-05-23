import { withTests } from "@storybook/addon-jest";
import { customViewports, StorySorter } from "./PluginsConfig";
import { addDecorator } from "@storybook/react";
import "./styles/main.scss";
import React from "react";

let testResults;
try {
    testResults = require("../build/tests/generated/jest-test-results.json");
} catch (e) {
    console.warn(e);
}

addDecorator(
    withTests({
        results: testResults,
        filesExt: "((\\.specs?)|(\\.tests?))?(\\.ts)?$",
    }),
);

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true, hideNoControlsWarning: true },
    themes: [
        { name: "Light", class: "data-theme-light", color: "#e7e7e7" },
        { name: "Dark", class: "data-theme-dark", color: "#222222" },
        {
            name: "Theme 1",
            class: ["data-theme-example1"],
            color: "#dd0c47",
        },
        {
            name: "Theme 2",
            class: ["data-theme-example2"],
            color: "#0078c8",
        },
    ],
    backgrounds: {
        disable: true,
        grid: {
            disable: true,
        },
    },
    viewport: {
        viewports: customViewports,
    },
    options: {
        storySort: StorySorter,
    },
};
