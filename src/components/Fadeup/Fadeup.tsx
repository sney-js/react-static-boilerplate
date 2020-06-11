import React, { useState } from 'react';
import OnVisible, { setDefaultProps } from 'react-on-visible';
import { CSSTransition } from 'react-transition-group';

setDefaultProps({
  bounce: false,
  visibleClassName: 'fadeup-visible',
  percent: 5
});

type FadeOnScrollType = {
  uniqueKey?: string;
  animate?: boolean;
  children: React.ReactNode;
  enter?: boolean;
  onVisible?: (hasEntered: boolean) => void;
  transitionProps?: any;
  animationClass?: string;
};

const FadeOnScroll = (props: FadeOnScrollType) => {
  const [isVisible, setVisible] = useState(false);

  const uniqKey = props.uniqueKey || '-no-key';
  return (
    <OnVisible
      onChange={(val: boolean) => {
        setVisible(val);
        props.onVisible && props.onVisible(false);
      }}
    >
      <CSSTransition
        in={props.enter === undefined ? isVisible : isVisible && props.enter}
        appear
        classNames={props.animationClass || 'fadeup'}
        key={uniqKey}
        onEntered={() => {
          props.onVisible && props.onVisible(true);
        }}
        timeout={150}
        {...props.transitionProps}
      >
        {props.children}
      </CSSTransition>
    </OnVisible>
  );
};

FadeOnScroll.defaultProps = {
  animateClass: 'fadeup'
};

export default FadeOnScroll;
