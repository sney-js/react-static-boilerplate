import React, { useContext } from 'react';
import Footer from '../../components/footer/Footer';
import { GlobalContext } from '../../components/layout/Layout';
import { getSiteDataForLocale } from '../utils/ReactStaticHelpers';
import { LinkData } from '../../models/LinkData';

const FooterContainer = (props) => {
  const { locale } = useContext(GlobalContext);
  const footer = getSiteDataForLocale(locale).footer;
  if (!footer) return null;
  return (
    <Footer links={footer.links as LinkData[]} content={footer.copyright} />
  );
};
export default FooterContainer;
