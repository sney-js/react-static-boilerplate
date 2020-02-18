'use strict';

const glob = require('glob')
const fs = require('fs')
const assert = require('assert')
const globPattern = require('./glob-pattern')
const loadAppearance = require('./loadAppearance')

let extractTypeFromData = (data) => data.sys.id;

/*
 * Executes cb(err, types) with an array of content types read from files according to the config.
 */
module.exports = (config, cb) => {
    let typeSelection = globPattern(config);

    if (typeSelection){

        let source = typeSelection.source;
        let ignore = typeSelection.ignore;

        // Validate inputs
        assert.ok(typeof source === 'string', 'A glob source must be a string');
        assert.ok(Array.isArray(ignore), 'An ignore variable must be an arary.');

        console.log('Include pattern: ' + source);
        console.log('Exclude pattern: ' + (ignore.length > 0 ? ignore : '[]'));

        glob(source, { ignore }, (err, matches) => {
            let filesRead = matches.map(path => new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    let parsedData = JSON.parse(data);
                    let type = extractTypeFromData(parsedData);

                    // Resolve the file only
                    // when the data is updated with the appearance prop,
                    // given it has a corresponding value.
                    loadAppearance(config, type)
                    .then(appearance =>
                        resolve(Object.assign(parsedData, {
                            appearance,
                        }))
                    , _ =>
                        resolve(Object.assign(parsedData, {
                            appearance: null,
                        })
                    ));
                });
            }));

            Promise.all(filesRead)
            .catch(err => cb(err, undefined))
            .then(types => cb(null, types.map(type => ({
                id: extractTypeFromData(type),
                data: {
                    name: type.name,
                    description: type.description,
                    displayField: type.displayField,
                    fields: type.fields,
                },
                appearance: type.appearance,
            }))));
        });
    }

};
