import React from 'react';
import LanguageSelector, {
  DEFAULT_LANGS,
  generateLang,
  LanguageSelectorProps
} from './LanguageSelector';

export default {
  title: 'components/Header/LanguageSelector',
  component: LanguageSelector
};

export const basic = (): any => {
  let languages = DEFAULT_LANGS.map(
    generateLang
  ) as LanguageSelectorProps['languages'];
  let activeLanguage = generateLang(
    DEFAULT_LANGS[0]
  ) as LanguageSelectorProps['activeLanguage'];
  return (
    <div style={{ width: '100px' }}>
      <LanguageSelector languages={languages} activeLanguage={activeLanguage} />
    </div>
  );
};
