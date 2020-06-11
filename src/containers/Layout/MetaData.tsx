import React from "react";
import { Helmet } from 'react-helmet';

type MetaDataStructure = {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
};

const MetaData = (props: MetaDataStructure) => {
  return (
    <Helmet>
      <title>{props?.title}</title>
      {props?.description ? (
        <meta name='description' content={props.description}/>
      ) : null}
      {props?.keywords ? (
        <meta name='keywords' content={props.keywords?.join(",")}/>
      ) : null}
      {props?.image ? <meta property='og:image' content={props.image}/> : null}
    </Helmet>
  );
};

export default MetaData;
