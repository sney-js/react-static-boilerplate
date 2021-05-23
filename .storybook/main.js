const path = require("path");
const { getLocalIdent } = require("css-loader/dist/utils");

const prodFilesGlob = [
    "../src/**/!(development)/*.stories.(js|ts|tsx|jsx|mdx)",
    "./**/!(development)/*.stories.(js|ts|tsx|jsx|mdx)",
];

const devFilesGlob = [
    "../src/**/*.stories.(js|ts|tsx|jsx|mdx)",
    "./**/*.stories.(js|ts|tsx|jsx|mdx)",
];

const styleLoader = {
    loader: require.resolve("style-loader"),
    options: {
        hmr: false,
    },
};
const cssLoader = {
    loader: require.resolve("css-loader"),
    options: {
        modules: true,
        camelCase: true,
        importLoaders: 2,
        localIdentName: "[name]-[local]_[hash:base64:4]",
        getLocalIdent: (context, localIdentName, localName, options) =>
            context.resourcePath.includes("/node_modules/")
                ? localName
                : getLocalIdent(context, localIdentName, localName, options),
    },
};
const postcssLoader = {
    loader: require.resolve("postcss-loader"),
    options: {
        plugins: [
            require("postcss-flexbugs-fixes"),
            require("autoprefixer")({
                flexbox: "no-2009",
            }),
        ],
    },
};
const sassLoader = {
    loader: require.resolve("sass-loader"),
    options: {
        includePaths: [
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../src/app/scss"),
        ],
        javascriptEnabled: true,
    },
};

module.exports = {
    stories: process.env.NODE_ENV === "prod" ? prodFilesGlob : devFilesGlob,
    addons: [
        "@storybook/addon-links",
        {
            name: "@storybook/addon-docs",
            options: {
                configureJSX: true,
                transcludeMarkdown: true,
            },
        },
        "@storybook/addon-essentials",
        "storybook-addon-themes",
        "@storybook/addon-jest",
        "@storybook/addon-a11y",
    ],
    webpackFinal: (config) => {
        config.resolve.modules.push(process.cwd() + "/node_modules");

        // this is needed for working w/ linked folders
        config.resolve.symlinks = false;
        config.module.rules.push({
            test: /\.module.scss$/,
            use: [styleLoader, cssLoader, postcssLoader, sassLoader],
        });

        config.module.rules.push({
            test: /\.s(a|c)ss$/,
            exclude: /\.module.scss$/,
            include: path.resolve(__dirname, "../"),
            use: [
                // Creates `style` nodes from JS strings
                styleLoader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                sassLoader,
            ],
        });
        return config;
    },
};
