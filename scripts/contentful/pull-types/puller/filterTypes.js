'use strict';

const chalk = require('chalk')

module.exports = function(config) {
    let include = config.include;
    let exclude = config.exclude;
    let all = config.include[0] === 'all';

    if (all) {
        // Accept every type
        console.log('Pulling all models from Contentful to your local working directory');
        return () => true;
    } else if (include.length > 0) {
        // Accept specified types
        console.log('Pulling ' + include + ' models from Contentful to your local working directory');
        return (id) => include.indexOf(id) > -1;
    }

    if (exclude.length > 0) {
        // Accept all types except specified
        console.log('Pulling all excluding ' + include + ' models from Contentful to your local working directory');
        return (id) => exclude.indexOf(id) === -1;
    }

    // Do Nothing
    console.log(chalk.red('NO MODELS TO PULL: Specify an --include={name} or include=all or --exclude={globpattern} flag.'))
    return false;
};
