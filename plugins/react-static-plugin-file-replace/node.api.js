const resolve = require("path").resolve;

module.exports.default = () => {
    return {
        webpack(config, { stage }) {
            config.module.rules[0].oneOf.unshift({
                test: /environment\.ts$/,
                loader: "file-replace-loader",
                options: {
                    condition: "if-replacement-exists",
                    replacement: function () {
                        console.log(process.env.CLIENT_ENV || process.env.NODE_ENV);
                        console.log("inReplace");
                        return resolve(
                            "./src/app/environments/environment." + (process.env.CLIENT_ENV || process.env.NODE_ENV) + ".ts",
                        )
                    }(),
                    async: true,
                },
            });

            return config;
        },
    };
};
