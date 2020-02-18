import * as React from "react";
import { Component } from "react";

const styles = require("./global-loader.module.scss");

class GlobalLoader extends Component {
    render() {
        return (
            <div className={styles.loaderWrapper}>
                <div className={styles.overlay} />
                <div className={styles.loading} />
            </div>
        );
    }
}

export default GlobalLoader;
