'use strict';

const contentful = require('contentful-management')
let updateAppearance = (type) => (created) => {
    // Returns the content type reference in both cases.
    // Appearance should be updated first if it is not null.
    if (type.appearance) {
        return created.getEditorInterface()
        .then(editorInterface => {
            editorInterface.controls = type.appearance.controls;
            return editorInterface.update()
        })
        .then(_ => created)
    }

    return created;
};

let createType = (space, type) => {
    console.log('Creating type model: ' + type.id);
    return space.createContentTypeWithId(type.id, type.data)
    .then(created => created.publish())
    .then(updateAppearance(type))
    .then(created => created.publish())
    .then(_ => console.log('Successfully created: ' + type.id))
};

let updateType = (type, typeLive) => {
    console.log('Updating type model: ' + type.id);
    Object.assign(typeLive, type.data);
    return typeLive.update()
    .then(updated => updated.publish())
    .then(updateAppearance(type))
    .then(updated => updated.publish())
    .then(_ => console.log('Successfully updated: ' + type.id))
};

module.exports = async (config, data) => {
    /*
     * 2. Iterate over a list of content types to sync
     * 3. For every content type get one from Contentful
     * 4. If it exists update it and publish
     * 5. If it is new, create and publish
     */
    let client = contentful.createClient({
        accessToken: config.managementKey,
    });

    let space = await client.getSpace(config.spaceId);
    let environment = await space.getEnvironment(config.environmentId);

    let promArray = [];
    for (let [_,type] of data.entries())
    {
        let contentType = null;
        try
        {
            contentType = await environment.getContentType(type.id);
        }
        catch(e)
        {
            console.log(`Content type does not exist: ${type.id}`);
        }

        if (contentType)
        {
          await updateType(type, contentType);
        }
        else
        {
          await createType(environment, type);
        }

        promArray.push(true);
    }

    return Promise.all(promArray)
}
