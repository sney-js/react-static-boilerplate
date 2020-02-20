const path = require("path");
const SRC_PATH = path.join(__dirname, "../src");
const STORIES_PATH = path.join(__dirname, "../stories");
const { getLocalIdent } = require("css-loader/dist/utils");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
//dont need stories path if you have your stories inside your //components folder
module.exports = ({ config, mode }) => {


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
            includePaths: [ path.resolve(__dirname, "../src"), path.resolve(__dirname, "../src/app/scss") ],
            javascriptEnabled: true,
        },
    };

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [ SRC_PATH, STORIES_PATH ],
        use: [
            {
                loader: require.resolve("awesome-typescript-loader"),
                options: {
                    configFileName: "./.storybook/tsconfig.json",
                },
            },
            { loader: require.resolve("react-docgen-typescript-loader") },
        ],
    });

    config.module.rules.push({
        test: /\.module.scss$/,
        use: [ styleLoader, cssLoader, postcssLoader, sassLoader ],
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


    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};

function extendOptions(loader, options) {
    return {
        ...loader,
        options: {
            ...loader.options,
            ...options,
        },
    };
}
