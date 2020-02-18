'use strict';

const fs = require('fs')

module.exports = (config, type) => {
    return new Promise((resolve, reject) => {
        let path = `${config.typesAppearanceGlobBase}/${type}.json`;

        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data));
        });
    });
};
