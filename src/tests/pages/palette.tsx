import React from "react";
import { Theme } from "../../app/models/Theme";
import Layout from "../../app/components/layout/Layout";

const styles = require("./palette.module.scss");

const values = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "A100",
    "A200",
    "A400",
    "A700",
    "50-contrast",
    "100-contrast",
    "200-contrast",
    "300-contrast",
    "400-contrast",
    "500-contrast",
    "600-contrast",
    "700-contrast",
    "800-contrast",
    "900-contrast",
    "A100-contrast",
    "A200-contrast",
    "A400-contrast",
    "A700-contrast",
    "default",
    "lighter",
    "darker",
    "text",
    "default-contrast",
    "lighter-contrast",
    "darker-contrast",
];

const palettes = Object.keys(Theme).map(name => name.toLowerCase());

export default () => {
    return (
        <Layout metaData={{ title: "Palette" }}>
            <div className={styles.content}>
                <h1>Color Palette</h1>
                <table>
                    <thead>
                    <tr>
                        <td className={styles.name}>Index</td>
                        {
                            palettes.map(palette => {
                                return <td className={styles.name} key={palette}>
                                    {palette}
                                </td>;
                            })
                        }
                    </tr>

                    </thead>
                    <tbody>
                    {
                        values.map(value => {
                            return <tr>
                                <td className={styles.name}>
                                    {value}
                                </td>

                                {
                                    palettes.map(palette => {
                                        return <td key={palette} className={styles[ palette ]}>
                                            <div className={`${styles.value} ${styles[ value ]} ${styles.primary}`}>
                                            </div>
                                            <div className={`${styles.value} ${styles[ value ]} ${styles.accent}`}>
                                            </div>
                                        </td>;
                                    })
                                }

                            </tr>;
                        })
                    }
                    </tbody>
                </table>

            </div>
        </Layout>
    );
};
