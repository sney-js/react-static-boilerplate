import React, { useState } from "react";
import OnVisible, { setDefaultProps } from "react-on-visible";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-static";

setDefaultProps({
    bounce: false,
    visibleClassName: "fadeup-visible",
    percent: 5,
});

export const FadeOnScroll = ({ uniqueKey, animate, children, ...transitionProps }) => {
    if (!animate) return <>{children}</>;
    const route = useLocation();
    const [isVisible, setvisible] = useState(false);
    const uniqKey = route && route.pathname + (uniqueKey || "-no-key");
    return (
        <OnVisible onChange={val => setvisible(val)}>
            <CSSTransition
                in={isVisible}
                appear={true}
                classNames="fadeup"
                key={uniqKey}
                timeout={{ appear: 100 }}
                {...transitionProps}
            >
                {children}
            </CSSTransition>
        </OnVisible>
    );
};
