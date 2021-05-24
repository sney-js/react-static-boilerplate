import React from 'react';
import Container from '../container';
import LinkWrap from '../../modules/link/linkWrap';
import { LinkData } from '../../models/LinkData';
import Grid from '../Grid';

const styles = require('./footer.module.scss');

export type FooterProps = {
  links?: Array<LinkData>;
  content?: React.ReactText;
};

const Footer = ({ content, links }: FooterProps) => (
  <footer className={styles.footer}>
    <Container layout='maxWidth' pad='All' theme='dark'>
      <div className={styles.links}>
        <Grid template='1fr 1fr 1fr' templateMobile='1fr'>
          {links?.map((l, i) => (
            <LinkWrap key={`footer${i}`} {...l} />
          ))}
        </Grid>
      </div>
      <br />
      <small>{content}</small>
    </Container>
  </footer>
);
export default Footer;
