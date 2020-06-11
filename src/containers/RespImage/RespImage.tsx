import React from 'react';

const createSrcSetEntry = (url, width, extraParams = '') =>
  `${url}?q=85&w=${width}${extraParams}`;

export const getUrl = (image, width = '1440', extraParams = undefined) =>
  `${createSrcSetEntry(image.fields.file.url, width, extraParams)}`;

type RespImageType = {
  /**
   * Contentful image object
   */
  image?: any;
  imageUrl?: string;
  /**
   * in pixels
   */
  widthMax?: number;
  widthVw?: number;
};

const RespImage = ({
  image = undefined,
  imageUrl = undefined,
  widthMax = 1440,
  widthVw = 100
}: RespImageType) => {
  if (!imageUrl && !image?.fields.file.url) return null;

  const url = imageUrl || image.fields.file.url;
  const srcsets = [400, 800, 1440, 1920].map((width) => {
    return createSrcSetEntry(url, width, ` ${width}w`);
  });
  return (
    <img
      className={'d-image'}
      src={url}
      srcSet={srcsets.join(', ')}
      sizes={`(max-width: ${widthMax}px) ${widthVw}vw, ${widthMax}px`}
      alt={
        (image && (image.fields.description || image.fields.title)) || imageUrl
      }
    />
  );
};

export default RespImage;
