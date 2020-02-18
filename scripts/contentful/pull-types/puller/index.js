'use strict';

const contentful = require('contentful-management');
const _filterTypes = require('./filterTypes');
const stringifyType = require('./stringifyType');
const writeFilePromise = require('./writeFilePromise');

module.exports = async (config) => {
    let filterTypes = _filterTypes(config);

    let client = contentful.createClient({
        accessToken: config.conToken,
    });

    try {
        // If Any to Sync
        if (filterTypes) {
            let space = await client.getSpace(config.conSpaceId);
            let environment = await space.getEnvironment(config.conEnvironmentId);
            let contentTypes = await environment.getContentTypes();

            for (let [_,type] of contentTypes.items.entries())
            {
                let id = type.sys.id;

                if (filterTypes(id)) {
                    let fileName = config.typesBase + '/' + id + '.json';
                    let strType = stringifyType(type);

                    const path = await writeFilePromise(fileName, strType);
                    console.log(id + ' model saved: ' + path);

                    const appearance = await type.getEditorInterface();
                    let fileNameAppearance = config.typesAppearanceBase + '/' + id + '.json';
                    let strAppearance = stringifyType(appearance);
                    const pathAppearance = await writeFilePromise(fileNameAppearance, strAppearance);
                    console.log(id + ' model appearance saved: ' + path);
                }
            }
        }
    } catch(e) {
        console.log('Error:');
        console.log(e);
    }
};
