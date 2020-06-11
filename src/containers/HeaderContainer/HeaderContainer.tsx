import React, { FC } from 'react';
import Header from '../../components/Header';
import {
  DEFAULT_LANGS,
  generateLang,
  LanguageSelectorProps
} from 'components/Header/LanguageSelector/LanguageSelector';

type HeaderContainerProps = {
  /**
   * Description above title
   */
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The `HeaderContainer` component example.
 * @param props
 * @constructor
 */
const HeaderContainer: FC<HeaderContainerProps> = (
  props: HeaderContainerProps
) => {
  const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'Project', to: '/project/' },
    { title: 'Donate', to: '/' },
    { title: 'Offer', to: '/' },
    { title: 'Help & Faq', to: '/' },
    { title: 'Contact Us', to: '/' }
  ];
  return (
    <Header
      siteLinks={navLinks}
      localeInfo={{
        languages: DEFAULT_LANGS.map(generateLang).filter(
          (e) => !!e
        ) as LanguageSelectorProps['languages'],
        activeLanguage: generateLang(
          DEFAULT_LANGS[0]
        ) as LanguageSelectorProps['activeLanguage']
      }}
    />
  );
};

export default HeaderContainer;
