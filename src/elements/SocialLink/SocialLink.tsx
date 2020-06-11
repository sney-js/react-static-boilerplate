import React, { FC } from 'react';
import { makeClass } from 'utils/Helpers';
import Link from 'elements/Link/';
import * as iconsLists from 'elements/SvgElements';

type SocialTypes = {
  /**
   * Determines the name of the social link
   */
  platform: string;
  /**
   * Determines the href of the social link
   */
  url: string;
} & React.HTMLAttributes<HTMLDivElement>;

type SocialProps = SocialTypes;
type SocialIconProps = {
  name: string;
};
const getIconsList = () => {
  const iconsListArray: { name: string; value: any }[] = [];
  for (const key in iconsLists) {
    iconsListArray.push({ name: key, value: iconsLists[key] });
  }
  return iconsListArray;
};
const SocialIcon = (props: SocialIconProps) => {
  const socialIconList = getIconsList();
  const socialName = props.name.replace(/(^|\s)[a-z]/g, (f: string) =>
    f.toUpperCase()
  );
  return (
    <React.Fragment>
      {socialIconList
        .filter((item) => item.name === 'Ic' + socialName)
        .map((e) => e.value())}
    </React.Fragment>
  );
};

const SocialLink: FC<SocialProps> = (props: SocialProps) => {
  const { platform, url, className } = props;
  const classes = makeClass(['d-social-link', className]);

  return (
    <span className={classes}>
      <Link
        to={url}
        newTab
        aria-label={platform}
      >
        <SocialIcon name={platform} />
      </Link>
    </span>
  );
};

SocialLink.displayName = 'SocialLink';
SocialLink.defaultProps = {};

export default SocialLink;
