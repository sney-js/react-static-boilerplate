import React, { useState } from "react";

type LanguageType = { code: string; icon: any; name: string };

type LanguageSelectorProps = {
    languages: Array<LanguageType>;
    activeLanguage: LanguageType;
    setActiveLanguage?: (lang: LanguageType["code"]) => void;
    onLanguageChange?: (langTo: LanguageType["code"], langFrom: LanguageType["code"]) => void;
};

const LanguageSelect = (props: LanguageSelectorProps) => {
    const { languages, activeLanguage, setActiveLanguage, onLanguageChange } = props;
    if (!activeLanguage) {
        return null;
    }
    const [isClosed, setClosed] = useState(true);
    return (
        <div className={"language-selector"} defaultValue={activeLanguage.code}>
            <img src={activeLanguage.icon} onClick={() => setClosed(!isClosed)} />
            <ul
                id="language-picker"
                className={`languagepicker roundborders large ${isClosed ? "hidden" : ""}`}
            >
                {languages.map(lang => (
                    <li key={lang.code}>
                        <img
                            src={lang.icon}
                            alt={lang.name}
                            title={lang.name}
                            onClick={() => {
                                setClosed(true);
                                setActiveLanguage(lang.code);
                                onLanguageChange(lang.code, activeLanguage.code);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getLang = (code: String) => {
    const aPath = "/assets/images/languages/";
    switch (code) {
        case "en":
            return { code: "en", icon: aPath + "united-kingdom.png", name: "English" };
        case "fr":
            return { code: "fr", icon: aPath + "france.png", name: "Français" };
        case "de":
            return { code: "de", icon: aPath + "germany.png", name: "German" };
        case "es":
            return { code: "es", icon: aPath + "spain.png", name: "Español" };
        default:
            return undefined;
    }
};

export default LanguageSelect;
