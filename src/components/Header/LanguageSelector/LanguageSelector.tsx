import React, { useState } from 'react';
import { cleanPath, makeClass } from 'utils/Helpers';
import './LanguageSelector.scss';

export type LanguageType = { code: string; icon: any; name: string };

export type LanguageSelectorProps = {
  /**
   * Array of `{ code: string; icon: any; name: string }`
   */
  languages: Array<LanguageType>;
  /**
   * `{ code: string; icon: any; name: string }`
   */
  activeLanguage: LanguageType;
  /**
   * Prefix name for the url. When a lang is selected, this url will be appended
   * with lang code. e.g. `/` for `/fr/` when french is selected.
   */
  languageChangeUrlPrefix?: string;
};

const LanguageSelect = (props: LanguageSelectorProps) => {
  const { languages, activeLanguage } = props;
  const [isClosed, setClosed] = useState(true);

  return (
    <div className={'d-LanguageSelector'} defaultValue={activeLanguage.code}>
      <img
        src={activeLanguage.icon}
        onClick={() => setClosed(!isClosed)}
        alt={activeLanguage.name}
      />
      <ul className={makeClass(['languagepicker', isClosed && 'hidden'])}>
        {languages
          .filter((e) => e.name)
          .map((lang) => (
            <li key={lang.code}>
              <a
                href={cleanPath(
                  (props.languageChangeUrlPrefix || '/') + lang.code
                )}
              >
                <img src={lang.icon} alt={lang.name} title={lang.name} />
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export const generateLang = (code: string): LanguageType | undefined => {
  const aPath = '/assets/images/languages/';
  switch (code) {
    case 'en':
      return {
        code: 'en',
        icon: aPath + 'united-kingdom.png',
        name: 'English'
      };
    case 'en-US':
      return {
        code: 'en-US',
        icon: aPath + 'united-states.png',
        name: 'English (US)'
      };
    case 'en-GB':
      return {
        code: 'en-GB',
        icon: aPath + 'united-kingdom.png',
        name: 'English (GB)'
      };
    case 'fr':
      return { code: 'fr', icon: aPath + 'france.png', name: 'Français' };
    case 'de':
      return { code: 'de', icon: aPath + 'germany.png', name: 'German' };
    case 'es':
      return { code: 'es', icon: aPath + 'spain.png', name: 'Español' };
    default:
      return undefined;
  }
};

export const DEFAULT_LANGS = ['en', 'fr', 'de', 'es'];

export default LanguageSelect;
