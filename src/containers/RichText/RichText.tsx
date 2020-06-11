import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import LinkElement from 'elements/Link';
import Markdown from 'react-markdown/with-html';
import RespImage from 'containers/RespImage';

const GLOBAL_OPTIONS = {
  renderText: (text) =>
    text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <figure className={'d-image'}>
          <RespImage image={node.data.target} />
        </figure>
      );
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
    return <section className={'d-rich-text'}>{data}</section>;
  } else if (props.markdown) {
    return (
      <section className={'d-rich-text'}>
        <Markdown source={props.markdown} escapeHtml />
      </section>
    );
  } else {
    return null;
  }
};
