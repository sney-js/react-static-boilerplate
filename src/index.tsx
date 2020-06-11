import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "./index.scss";
// Your top level component
import App from "./App";

// Render your app
if (typeof document !== "undefined") {
    const target = document.getElementById("root");

    const render = (Comp: Function) => {
        ReactDOM.render(
            <AppContainer>
                <Comp />
            </AppContainer>,
            target,
        );
    };

    // Render!
    render(App);

    // Hot Module Replacement
    if (module && module.hot) {
        module.hot.accept("./App", () => {
            render(App);
        });
    }

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
            navigator.serviceWorker.register("/sw.js").then(
                function(registration) {
                    // Registration was successful
                    console.log(
                        "ServiceWorker registration successful with scope: ",
                        registration.scope,
                    );
                },
                function(err) {
                    // registration failed :(
                    console.log("ServiceWorker registration failed: ", err);
                },
            );
        });
    }
}

// Export your top level component as JSX (for static rendering)
export default App;
