'use strict';

const fs = require('fs-extra');

module.exports = function(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.outputFile(fileName, data, 'utf8', (err) => {
            if (err) throw new Error(err);

            resolve(fileName);
        });
    });
};

