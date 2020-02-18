"use strict";
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const argv = require("minimist")(process.argv.slice(2));
const makeConfig = require("./config");
const puller = require("./puller");

let config = makeConfig({
    include: argv["include"] && [].concat(argv["include"]),
    exclude: argv["exclude"] && [].concat(argv["exclude"]),
    CON_TOKEN: process.env.CONTENTFUL_MANTOKEN,
    CON_SPACE_ID: process.env.CONTENTFUL_SPACE,
    CON_ENVIRONMENT_ID: process.env.CONTENTFUL_ENV,
    workingDir: process.env.CONTENTFUL_DIR,
});

/*
 * Track Promise exceptions
 */
process.on("unhandledRejection", (reason, p) => {
    throw new Error("Unhandled rejection: " + reason.stack);
});

module.exports = () => {
    puller(config);
};
