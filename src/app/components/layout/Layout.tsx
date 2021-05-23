import React, { useEffect, useState } from 'react';
import { Head, useSiteData } from 'react-static';
import { getUrl } from '../../utils/RespImage';
import { makeClass, HAS_WINDOW, WINDOW } from '../../utils/helpers';
import GlobalLoader from '../global-loader/GlobalLoader';
import HeaderContainer from '../../modules/header/HeaderContainer';
import FooterContainer from '../../modules/footer/FooterContainer';
import { IMetaDataFields } from '../../../contentful/@types/contentful';
import CookieBannerContainer from '../../modules/cookie-banner/CookieBannerContainer';

const styles = require('./layout.module.scss');

type MetaDataStructure = {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
};

type LayoutProps = {
  locale?: string;
  globalLoader?: boolean;
  children?: any;
  theme?: 'dark' | 'light';
};

export const MetaData = (props: IMetaDataFields) => {
  return (
    <Head>
      <title>{props?.title}</title>
      {props?.description ? (
        <meta name='description' content={props.description} />
      ) : null}
      {props?.keywords ? (
        <meta name='keywords' content={props.keywords?.join(',')} />
      ) : null}
      {props?.image ? (
        <meta
          property='og:image'
          content={props.image && getUrl(props.image).replace('//', 'https://')}
        />
      ) : null}
    </Head>
  );
};

const globalInitialVals = {
  locale: 'en-US',
  onLocaleChange: (locale: string) => {}
};

export const GlobalContext = React.createContext(globalInitialVals);

function Layout(props: LayoutProps) {
  const { localeData } = useSiteData();

  useEffect(() => {
    if (!HAS_WINDOW) return;
    const bodyElement = document.body.dataset;
    WINDOW.theme = bodyElement && bodyElement.theme ? props.theme : 'light';
  }, [props.theme]);

  const [locale, setLocale] = useState(props.locale || localeData?.default);

  const globalState = {
    onLocaleChange: (locale) => {
      setLocale(locale);
    },
    locale: locale
  };

  return (
    <div className={makeClass([styles.layout])}>
      <GlobalContext.Provider value={globalState}>
        <Head>
          <html lang={props.locale} />

          <link rel='manifest' href='/manifest.json' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-title' content='BPL' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/assets/app-icons/icon.png'
            type='image/png'
          />
        </Head>

        <div className={styles.cookieBanner}>{CookieBannerContainer()}</div>

        <HeaderContainer />

        <div className={makeClass([styles.content])}>
          <main>{props.children}</main>
        </div>

        <FooterContainer />

        {props.globalLoader && <GlobalLoader />}
      </GlobalContext.Provider>
    </div>
  );
}

export default Layout;
