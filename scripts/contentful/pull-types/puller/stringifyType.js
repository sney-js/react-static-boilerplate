'use strict';

const omit = require('lodash.omit');

module.exports = function(_type) {
    let id = _type.sys.id;
    let type = omit(_type, 'sys');

    // leave the id
    type.sys = { id };

    return JSON.stringify(type, null, 4);
};
