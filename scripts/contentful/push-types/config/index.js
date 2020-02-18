'use strict';

const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const assert = require('assert')
const argv = require('minimist')(process.argv.slice(2))

let getOption = null
let config = {}

/*
 * Returns a config for the push script.
 */
module.exports = () => {

    const csgConfig = {};

    Object.assign(config, csgConfig, {
        include: argv["include"] && [].concat(argv["include"]),
        exclude: argv["exclude"] && [].concat(argv["exclude"]),
        // excludePatterns: getOption('exclude-glob'),
        managementKey: process.env.CONTENTFUL_MANTOKEN,
        spaceId: process.env.CONTENTFUL_SPACE,
        environmentId: process.env.CONTENTFUL_ENV,
        workingDir: process.env.CONTENTFUL_DIR,
        tempFolder: process.env.CONTENTFUL_DIR
    });

    assert.ok(config.workingDir, 'The src directory must be specified in your csg-config.json');
    console.log('Working directory set to: ' + config.workingDir);

    console.log('Use the console.logs management token: ' + config.managementKey.substring(0,30) + "****************************************");
    console.log('Use the space id: ' + config.spaceId);
    console.log('Use the environment id: ' + config.environmentId);

    assert.ok(config.managementKey, 'The management API token must be specified\nmanagementKey=<token> npm run csg-pull-types');
    assert.ok(config.spaceId, 'The space id must be specified');
    assert.ok(config.environmentId, 'The environment id must be specified');

    let typesGlobBase = config.tempFolder + '/contentTypes/models';
    let typesAppearanceGlobBase = config.tempFolder + '/contentTypes/appearance';
    let typesGlob = typesGlobBase + '/*.json';
    let excludePatterns = config.excludePatterns || [];

    Object.assign(config, {
        typesGlobBase,
        typesAppearanceGlobBase,
        conToken: config.managementKey,
        typesGlob,
        excludePatterns
    });

    return config;
};
