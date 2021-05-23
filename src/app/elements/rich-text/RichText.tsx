import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ImageElement from '../image/Image';
import LinkElement from '../link/LinkElement';
import './rich-text.scss';
import Markdown from 'react-markdown';

const GLOBAL_OPTIONS = {
  renderText: (text) =>
    text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return <ImageElement content={node.data.target} />;
    },
    [INLINES.ENTRY_HYPERLINK]: (node) => {
      return (
        <LinkElement {...node.data.target.fields}>
          {node.content[0] && node.content[0].value}
        </LinkElement>
      );
    },
    // text hyperlinks are always external.
    [INLINES.HYPERLINK]: (node) => {
      return (
        <a href={node.data.uri} target='_blank' rel='noreferrer'>
          {node.content[0].value}
        </a>
      );
    }
  }
};

export type RichTextType = {
  markdown?: string;
  document?: any;
};

export default (props: RichTextType) => {
  if (props.document) {
    const data = documentToReactComponents(
      props.document,
      GLOBAL_OPTIONS
    ) as Array<any>;
    if (data.length && !data[data.length - 1].props.children[0]) {
      data.pop();
    }
    return <section className='d-rich-text'>{data}</section>;
  } else if (props.markdown) {
    return (
      <section className='d-rich-text'>
        <Markdown>{props.markdown}</Markdown>
      </section>
    );
  } else {
    return null;
  }
};
