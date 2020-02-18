import React from "react";
import { Header } from "../../components/header/Header";

export default function HeaderContainer({ item, ...rest }) {
    if (!item) return null;

    return <Header />;
}
