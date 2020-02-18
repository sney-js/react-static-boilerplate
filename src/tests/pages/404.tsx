import React from "react";
import Layout from "../../app/components/layout/Layout";

export default () => {
    return (
        <Layout metaData={{ title: "404" }}>
            <div className="content">Not found</div>
        </Layout>
    );
};
