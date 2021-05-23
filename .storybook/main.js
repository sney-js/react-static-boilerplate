const path = require("path");

const prodFilesGlob = [
    "../src/**/!(development)/*.stories.(js|ts|tsx|jsx|mdx)",
    "./**/!(development)/*.stories.(js|ts|tsx|jsx|mdx)",
];

const devFilesGlob = [
    "../src/**/*.stories.(js|ts|tsx|jsx|mdx)",
    "./**/*.stories.(js|ts|tsx|jsx|mdx)",
];

module.exports = {
    stories: process.env.NODE_ENV === "prod" ? prodFilesGlob : devFilesGlob,
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: (config) => {
        config.resolve.modules.push(process.cwd() + "/node_modules");

        // this is needed for working w/ linked folders
        config.resolve.symlinks = false;
        config.module.rules.push({
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
            include: path.resolve(__dirname, "../"),
        });
        return config;
    },
};
