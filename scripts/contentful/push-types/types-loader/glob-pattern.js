'use strict';

module.exports = function(config) {
    let base = config.typesGlobBase;
    let defaultGlob = config.typesGlob;
    let include = config.include;
    let exclude = config.exclude;
    let excludeGlob = config.excludePatterns;

    // When excludeGlob is specified,
    // use it only as an ignore pattern.
    if (excludeGlob.length > 0) {
        return {
            source: defaultGlob,
            ignore: excludeGlob,
        };
    }

    // Include ALL
    if (include.length > 0 && include[0] === 'all') {
        return {
            source: defaultGlob,
            ignore: [],
        };
    }

    // When include is specified,
    // sync only the files in include.
    if (include.length > 0) {

        // attach extensions
        let includeJson = include.map(inc => inc + '.json');
        let includeSet = includeJson.length > 1 ?
            '{' + includeJson.join(',') + '}' :
            includeJson.join(',');
        let source = base + '/' + includeSet;
        // source results into something like
        // c_types/{column.json,carousel.json}
        return {
            source,
            ignore: [],
        };
    }

    // When exclude is specified,
    // sync all apart from the files in exclude.
    if (exclude.length > 0) {
        // attach extensions
        let excludeJson = exclude.map(excl => excl + '.json');
        let excludeSet = excludeJson.length > 1 ?
            '{' + excludeJson.join(',') + '}' :
            excludeJson.join(',');
        let ignore = [base + '/' + excludeSet];
        // ignore results into something like
        // c_types/{column.json,carousel.json}
        return {
            source: defaultGlob,
            ignore,
        };
    }

    // Sync None
    console.log('NO TYPES TO PUSH: Specify an --include={types} or --exclude={types} flag. To push all use ---include=all');
    return false;
};
