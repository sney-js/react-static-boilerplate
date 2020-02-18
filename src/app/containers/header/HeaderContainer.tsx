import React from "react";
import { IHeaderFields } from "../../../contentful/@types/contentful";
import HeaderConnected, { Header } from "../../components/header/Header";
import Link from "../link/link";
import Form from "../form/form";

export default function HeaderContainer({ item, ...rest }) {
    if (!item) return null;

    const {
        loginLabel,
        loggedInUserIndicator,
        logoutLabel,
        navigation,
        additionalLinks,
        servicelineLink,
        servicelineTitle,
        servicelineDescription,
        loginForm,
        loggedInUserLink,
    } = item.fields as IHeaderFields;

    const transformedData: Header["props"] = {
        loginLabel,
        loggedInUserIndicator,
        logoutLabel,
        navigation: navigation && navigation.map((link, index) => Link({ item: link, index: index })),
        additionalLinks: navigation && additionalLinks.map((link, index) => Link({ item: link, index: index })),
        servicelineLink: servicelineLink && Link({ item: servicelineLink }),
        loggedInUserLink: loggedInUserLink && Link({ item: loggedInUserLink }),
        servicelineTitle,
        servicelineDescription,
        loginForm: <Form item={loginForm} />,
    };

    return <HeaderConnected {...transformedData} />;
}
