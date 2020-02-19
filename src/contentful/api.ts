import * as contentful from "contentful";

export class ContentfulApi {
    client = null;

    constructor({ space, accessToken, environment }, host?) {
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

    async getPages(contentTypePageName = "page", filter?) {
        const data = await this.client
            .getEntries({
                content_type: contentTypePageName,
                include: 10,
                ...filter,
            })
            .then(res=>{
                console.log(res);
                return res;
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

    /**
     *
     * @param query = {content_type="page", field:"slug", value:"index", include: 3 }
     * @returns {Promise<Entry<any>>}
     */
    async fetchEntry({ content_type, field, value, ...rest }) {
        const entries = await this.client.getEntries({ content_type, ...rest });
        return entries.items.find(en => en.fields[field] === value);
    }

    async fetchQuery(query, filter) {
        const entries = await this.client.getEntries(query);

        if (filter) {
            return entries.items.map(filter);
        }
        return entries.items;
    }
}
