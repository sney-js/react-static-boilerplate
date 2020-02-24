import React, { useState } from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import { Mocks } from "./utils/mocks";
import { mocksConfig } from "./mock-configs";
import { ContentfulApi } from "../contentful/api";
import { routeDataResolver } from "./containers/helpers";
import Page from "./containers/page/Page_page";
import { environment } from "./environments/environment";
import GlobalLoader from "./components/global-loader/GlobalLoader";
import Layout from "./components/layout/Layout";

function App() {
    if (typeof document !== "undefined") {
        const mocksClient = Mocks.getInstance(mocksConfig);
        mocksClient.activate();
    }

    const [dynamicRoutes, setDynamicRoutes] = useState([]);

    let isLoading = false;

    if (environment.preview) {
        const client = new ContentfulApi(
            {
                space: environment.contentful.space,
                accessToken: environment.contentful.accessToken,
                environment: environment.contentful.environment,
            },
            "preview.contentful.com",
        );

        // if (!dynamicRoutes.length) {
        //     isLoading = true;
        //     routeDataResolver(client)
        //         .then(data => {
        //             console.log("data",data);
        //             const pages = data.map((routeData, index) => {
        //                 return <Page key={index} path={routeData.path} routeData={routeData} />;
        //             });
        //             setDynamicRoutes(pages);
        //             isLoading = false;
        //         })
        //         .catch(_ => {
        //             isLoading = false;
        //         });
        // }
    }

    if (isLoading) {
        return (
            <Root>
                <GlobalLoader />
            </Root>
        );
    }

    return (
        <Root>
            <React.Suspense fallback={<GlobalLoader />}>
                <Layout>
                    <Router>
                        {dynamicRoutes}
                        <Routes path="*" />
                    </Router>
                </Layout>
            </React.Suspense>
        </Root>
    );
}

export default App;
