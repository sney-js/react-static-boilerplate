import React, { FC } from 'react';
import CookieBanner from '../../components/CookieBanner';

type CookieBannerContainerProps = {
  /**
   * Description above title
   */
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The `CookieBannerContainer` component example.
 * @param props
 * @constructor
 */
const CookieBannerContainer: FC<CookieBannerContainerProps> = (
  props: CookieBannerContainerProps
) => {
  return <CookieBanner />;
};

export default CookieBannerContainer;
