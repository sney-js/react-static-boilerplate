import React, { useState } from "react";
import { getContentType } from "../../utils/Resolver";
import errorCodesDataHandler from "./errorCodesHandler";
import RegisterPhysical from "./registration/registrationPhysical";
import RegisterVirtual from "./registration/registrationVirtual";
import AccountDetails from "./account/details";
import AccountPreferences from "./account/preferences";
import AccountAddress from "./account/address";
import AccountPassword from "./account/password";
import Container from "../../components/container/Container";
import { getByPath } from "../../utils/helpers";
import { Redirect } from "@reach/router";
import Login from "./login/login";
import ForgotPassword from "./restorePassword/forgotPassword";
import ResetPassword from "./restorePassword/resetPassword";
import CookieSettings from "./cookieSettings/cookieSettings";

export default function Component({ item, ...rest }) {
    const [success, setSuccess] = useState(false);
    const formComponent = item;
    const errorCodes = errorCodesDataHandler(getByPath(item, "fields.errorCodes"));
    const formType = getContentType(formComponent);

    if (success) {
        const successPage = getByPath(item, "fields.onSuccess");
        if (successPage) {
            return <Redirect to={successPage.fields.path + "/"} noThrow/>;
        }
    }

    const formExtras = {
        extra: { errorCodes: errorCodes },
        key: rest.index,
        onSuccess: () => {
            setSuccess(true);
            if (rest.onSuccess) {
                rest.onSuccess();
            }
        },
    };

    let formElement;
    switch (formType) {
        case "registrationFormPhysical":
            formElement = <RegisterPhysical item={formComponent} {...formExtras} />;
            break;
        case "registrationFormVirtual":
            formElement = <RegisterVirtual item={formComponent} {...formExtras} />;
            break;
        case "formAccountDetails":
            formElement = <AccountDetails item={formComponent} {...formExtras} />;
            break;
        case "formAccountAddress":
            formElement = <AccountAddress item={formComponent} {...formExtras} />;
            break;
        case "formAccountPassword":
            formElement = <AccountPassword item={formComponent} {...formExtras} />;
            break;
        case "formAccountPreferences":
            formElement = <AccountPreferences item={formComponent} {...formExtras} />;
            break;
        case "login":
            formElement = <Login item={formComponent} {...formExtras} />;
            break;
        case "formForgotPassword":
            formElement = <ForgotPassword item={formComponent} {...formExtras} />;
            break;
        case "formResetPassword":
            formElement = <ResetPassword item={formComponent} {...formExtras} />;
            break;
        case "formCookieSettings":
            formElement = <CookieSettings item={formComponent} {...formExtras} />;
            break;
        default:
            formElement = <small>No form found!</small>;
            break;
    }

    return (
        <Container key={formType} animateIn>
            {formElement}
        </Container>
    );
}
