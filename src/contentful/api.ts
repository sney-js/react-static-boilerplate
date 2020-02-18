import * as contentful from "contentful";

export class ContentfulApi {
    client = null;

    constructor({ space, accessToken, environment}, host?) {
        this.client = contentful.createClient({
            space: space,
            accessToken: accessToken,
            environment: environment,
            host: host,
        });
    }

    async getLocale() {
        const data = await this.client.getLocales();
        return data.items.find(item => item.default);
    }

    async getPages(filter?) {
        const data = await this.client
            .getEntries({
                content_type: "page",
                include: 10,
                ...filter,
            })
            .catch(e => {
                console.log(e);
                throw e;
            });
        if (filter) {
            return data.items.map(filter);
        }
        return data;
    }
}
