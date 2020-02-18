'use strict';

const path = require('path')
const assert = require('assert')

/*
 * Returns a config for the whole application.
 */
module.exports = (cfg) => {
    let workingDir = cfg.workingDir;
    assert.ok(workingDir, 'The src directory must be specified in your csg-config.json');
    console.log('Working directory set to: ' + workingDir)

    let conToken = cfg.CON_TOKEN;
    let conSpaceId = cfg.CON_SPACE_ID;
    let conEnvironmentId = cfg.CON_ENVIRONMENT_ID || 'master';
    console.log('Access management token set to: ' + conToken);
    console.log('Space id set to: ' + conSpaceId);
    console.log('Environment id set to: ' + conEnvironmentId);

    assert.ok(conToken, 'The management API token must be specified.\nmanagementKey=<token> npm run csg-pull-types');
    assert.ok(conSpaceId, 'The space id must be specified');

    let typesBase = workingDir + '/contentTypes/models';
    let typesAppearanceBase = workingDir + '/contentTypes/appearance';
    let include = cfg.include || [];
    let exclude = cfg.exclude || [];

    let config = {
        typesBase,
        typesAppearanceBase,
        conToken,
        conSpaceId,
        conEnvironmentId,
        include,
        exclude,
    };

    return config;
};

