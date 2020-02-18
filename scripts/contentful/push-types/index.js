'use strict';


const makePushConfig = require('./config')
const typesLoader = require('./types-loader')
const sync = require('./sync-content-types')
const chalk = require('chalk')

/*
 * Track Promise exceptions
 */
process.on('unhandledRejection', (reason, p) => {
    throw new Error('Unhandled rejection: ' + reason.stack)
});

const synchronise = function(config) {
    let pushConfig = makePushConfig(config);

    return new Promise(async (resolve, reject) => {

        typesLoader(pushConfig, async (err, files) => {
            if (err) {
                throw new Error(err);
                return;
            }

            try {
                await sync(pushConfig, files);
                console.log(chalk.green("All models pushed!\n"));
            } catch (e) {
                console.log(chalk.red("Error"));
                reject(e);
            }

            resolve();
        });
    });
};
module.exports = (config = {}) => {
    synchronise(config);
};
// ((config = {}) => {
//     synchronise(config);
// })();
