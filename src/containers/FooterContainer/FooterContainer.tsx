import React, { FC } from "react";
import Footer from "components/Footer";

type FooterContainerProps = {
    /**
     * Description above title
     */
    title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The `FooterContainer` component example.
 * @param props
 * @constructor
 */
const FooterContainer: FC<FooterContainerProps> = (
    props: FooterContainerProps,
) => {
    // const { locale } = useContext(GlobalContext);
    // const footer = getSiteDataForLocale(locale).footer;
    // if (!footer) return null;
    const siteLinks = [
        { title: "Home", to: "/" },
        { title: "Contact Us", to: "/" },
        { title: "Cookies Policy", to: "/" },
        { title: "Privacy Policy", to: "/privacy" },
        { title: "Terms & Condition", to: "/" },
    ];
    const socialLinks = [
        { title: "facebook", to: "http://facebook.com" },
        { title: "twitter", to: "http://twitter.com" },
        { title: "youtube", to: "http://youtube.com" },
    ];
    return <Footer socialLinks={socialLinks} siteLinks={siteLinks} theme={"dark"}
                   copyright={"All Ltd. Copyright@ 2020"}/>;
};

export default FooterContainer;
