import React from "react";
import { Header } from "../../components/header/Header";
import { useSiteData } from "react-static";

export default function HeaderContainer(props) {
    const { header } = useSiteData();
    if (!header) return null;
    console.log(header);
    return <Header title={header.name} links={header.links} logo={header.logo} />;
}
