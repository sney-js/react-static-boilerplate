export class Mocks {
    private static instance: Mocks;
    mockConfigs: Array<any> = [];
    interceptorUnreg$: any = null;
    originalFetch = null;

    constructor(config?: Array<any>) {
        if (config) this.mockConfigs = config;
    }

    static getInstance(config) {
        if (!Mocks.instance) {
            Mocks.instance = new Mocks(config);
        }
        return Mocks.instance;
    }

    activate() {
        if (this.originalFetch) this.deactivate();
        if (typeof window === "undefined") return;
        this.originalFetch = window && window.fetch;
        if (!this.originalFetch) return;
        const fetch = this.originalFetch;
        let mockConfigs = this.mockConfigs;
        window.fetch = function (url, config) {
            mockConfigs = [...mockConfigs];
            if (!mockConfigs) return fetch.apply(this, arguments);

            const filteredConfigs = mockConfigs.filter((mockConfig) => {
                return mockConfig.method == ((config && config.method) || "GET");
            });

            const mockConfig: any = filteredConfigs.find((mockConfig) => {
                return (<string>url).match(mockConfig.url);
            });

            if (!mockConfig || mockConfig.passthrough) {
                return fetch.apply(this, arguments);
            }

            return fetch.apply(this, [mockConfig.responseData]);
        };
    }

    deactivate() {
        if (this.originalFetch) window.fetch = this.originalFetch;
    }
}
