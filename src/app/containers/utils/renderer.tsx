import React from "react";
import TextCard from "../textCard/textCard";
import CtaComponent from "../cta-component/cta";
import Form from "../form/form";
import WrapperComponent from "../wrapperComponent/wrapperComponent";
import FlexibleCardContainer from "../flexible-card/FlexibleCardContainer";
import PartnersCardContainer from "../partners-card/PartnersCardContainer";
import SprintSparenContainer from "../sprint-sparen/SprintSparenContainer";
import ListContainer from "../list/ListContainer";
import AccordionContainer from "../accordion/AccordionContainer";
import CarouselContainer from "../carousel/CarouselContainer";
import TutorialContainer from "../tutorial/TutorialContainer";
import OffersContainer from "../offers/OffersContainer";
import TransactionHistoryContainer from "../transaction-history/TransactionHistoryContainer";
import HeroContainer from "../hero/HeroContainer";

// Add all new contentful containers here.
export const renderContentContainer = ({ item, ...rest }) => {
    switch (item.type) {
        case "textCard":
            return TextCard({ item: item, ...rest });
        case "ctaComponent":
            return CtaComponent({ item: item, ...rest });
        case "hero":
            return HeroContainer({ item: item, ...rest });
        case "wrapperComponent":
            return WrapperComponent({ item: item, ...rest });
        case "flexibleCard":
            return FlexibleCardContainer({ item: item, ...rest });
        case "partnersCard":
            return PartnersCardContainer({ item: item, ...rest });
        case "sprintSparen":
            return SprintSparenContainer({ item: item, ...rest });
        case "list":
            return ListContainer({ item: item, ...rest });
        case "accordion":
            return AccordionContainer({ item: item, ...rest });
        case "carousel":
            return CarouselContainer({ item: item, ...rest });
        case "tutorial":
            return TutorialContainer({ item: item, ...rest });
        case "offers":
            return OffersContainer({ item: item, ...rest });
        case "transactionHistory":
            return TransactionHistoryContainer({ item: item, ...rest });
        case "formAccountAddress":
        case "formAccountDetails":
        case "formAccountPassword":
        case "formAccountPreferences":
        case "formCookieSettings":
        case "formForgotPassword":
        case "login":
        case "registrationFormPhysical":
        case "registrationFormVirtual":
        case "formResetPassword":
            return <Form key={rest.key} item={item} {...rest} />;
        default:
            return null;
    }
};
