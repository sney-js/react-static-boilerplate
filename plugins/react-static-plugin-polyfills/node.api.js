const polyfills = ["@babel/polyfill", "formdata-polyfill", "whatwg-fetch"];

export default (options = {}) => {
    return {
        webpack: (config, { stage }) => {
            console.log("adding polyfills");
            if (stage === "prod" || stage === "dev") {
                if (typeof config.entry === "string") {
                    config.entry = [...polyfills, config.entry];
                } else {
                    config.entry = [...polyfills, ...config.entry];
                }
            }
            return config;
        },
    };
};
