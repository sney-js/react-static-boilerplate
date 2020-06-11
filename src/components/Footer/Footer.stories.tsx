import React from 'react';
import Footer from './Footer';
import { radios, text, withKnobs } from '@storybook/addon-knobs';
import Container from 'components/Container';

export default {
  title: 'Components/Footer',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: Footer,
  decorators: [withKnobs]
};

export const basic = () => {
  // Define Footer component required Data

  // Define site links
  const siteLinks = [
    { title: 'Home', to: '/' },
    { title: 'Earn', to: '/' },
    { title: 'Redeem', to: '/' },
    { title: 'Donate', to: '/' },
    { title: 'Help & Faq', to: '/' },
    { title: 'Contact Us', to: '/' },
    { title: 'Cookies Policy', to: '/' },
    { title: 'Privacy Policy', to: '/' },
    { title: 'Terms & Condition', to: '/' }
  ];

  // Define Social links data
  const socialLinks = [
    { title: 'facebook', to: 'http://facebook.com' },
    { title: 'twitter', to: 'http://twitter.com' },
    { title: 'youtube', to: 'http://youtube.com' }
  ];

  // Define Knobs
  const theme = radios('Theme', { Dark: 'dark', Light: 'light' }, 'dark');
  const socialTitle = text('Social Title', 'Follow us');
  const copyright = text('Copyright', 'BP Oil Ltd. Copyright@ 2019');
  return (
    <Container>
      <Footer
        socialLinks={socialLinks}
        siteLinks={siteLinks}
        copyright={copyright}
        theme={theme}
      />
    </Container>
  );
};
