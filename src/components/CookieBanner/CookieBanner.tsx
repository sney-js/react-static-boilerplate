import React from 'react';
import Cookies from 'js-cookie';
import { Cookie } from 'models/Cookie';

import { makeClass, WINDOW } from 'utils/Helpers';
import Container from 'components/Container';
import Button from 'elements/Button';

export type CookieBannerProps = {
  caption?: string;
  description?: JSX.Element;
  buttonText?: string;
  setAnalyticsCookie?: boolean;
  setTrackingCookie?: boolean;
};

class CookieBanner extends React.Component<CookieBannerProps> {
  state = {
    visible: false
  };

  componentDidMount(): void {
    if (!Cookies.get(Cookie.FUNCTIONAL)) {
      this.setState({
        visible: true
      });
    }
  }

  componentDidUpdate(_prevProps: Readonly<CookieBannerProps>, prevState): void {
    if (prevState.visible !== this.state.visible) {
      WINDOW.dispatchEvent(new Event('resize'));
    }
  }

  setCookies() {
    Cookies.set(Cookie.FUNCTIONAL, 'true', { expires: 365 });
    this.props.setAnalyticsCookie &&
      Cookies.set(Cookie.ANALYTICS, 'true', { expires: 365 });
    this.setState({
      visible: false
    });
  }

  render() {
    if (!this.state.visible) return null;
    let { caption, buttonText, description } = this.props;
    return (
      <Container
        className={makeClass(['d-CookieBanner'])}
        layout={'maxWidth'}
      >
        <div className={'d-CookieBanner__container'}>
          <div className={'d-CookieBanner__caption'}>{caption}</div>
          <small>{description}</small>
          <Button appearance={"secondary"} onClick={() => this.setCookies()}>{buttonText}</Button>
        </div>
      </Container>
    );
  }
}

// @ts-ignore
CookieBanner.defaultProps = {
  caption: 'We use Cookies',
  buttonText: 'Got it!'
};

export default CookieBanner;
