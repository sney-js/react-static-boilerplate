const contentful = require("contentful-management");

require("dotenv").config();

module.exports = function() {
    const client = contentful.createClient({
        accessToken: process.env.CONTENTFUL_MANTOKEN,
    });

    return client
        .getSpace(process.env.CONTENTFUL_SPACE)
        .then(space => space.getEnvironment(process.env.CONTENTFUL_ENV));
};
