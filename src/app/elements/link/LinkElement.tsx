import * as React from 'react';
import { Link } from '@reach/router';
import { LinkData } from '../../models/LinkData';
import { makeClass } from '../../utils/helpers';
import Button from '../Button';

export interface LinkElementProps
  extends LinkData,
    React.HTMLAttributes<HTMLElement> {}

const LinkElement = (props: LinkElementProps) => {
  const generalProps = {
    onClick: props.onClick && ((e) => props.onClick(e)),
    className: makeClass(['link', props.className]),
    title: props.title
  };
  let childEl = props.children || props.title;
  if (props.appearance) {
    childEl = (
      <Button appearance={props.appearance} asDiv>
        {props.children || props.title}
      </Button>
    );
  }
  return (
    <React.Fragment>
      {props.isExternal ? (
        <a
          {...generalProps}
          {...(props.path && { href: props.path })}
          target={props.newTab ? '_blank' : '_self'}
        >
          {childEl}
        </a>
      ) : props.path ? (
        <Link
          {...generalProps}
          to={props.path}
          target={props.newTab ? '_blank' : '_self'}
          onClick={(event) => {
            if (!props.newTab) return;
            event.preventDefault();
            window.open(window.location.origin + props.path);
          }}
        >
          {childEl}
        </Link>
      ) : (
        <a {...generalProps}> {childEl}</a>
      )}
    </React.Fragment>
  );
};

export default LinkElement;
