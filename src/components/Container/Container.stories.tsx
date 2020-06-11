import * as React from 'react';
import Container, { ContainerProps } from './Container';
import { DummyImage, StoryDivideContainer } from 'stories/components/Dummies';
import {
  IcAdd,
  IcArrowLeft,
  IcArrowRight,
  IcDanger,
  IcLock,
  IcMenu
} from '../../elements/SvgElements';
import { getPropsUnionArray } from '../../stories/utils';
import { withKnobs } from '@storybook/addon-knobs';

const Paragraph = () => (
  <div>
    <p>
      Ambitioni dedisse scripsisse iudicaretur. Phasellus laoreet lorem vel
      dolor tempus vehicula. A communi observantia non est recedendum. Qui
      ipsorum lingua Celtae, nostra Galli appellantur. At nos hinc posthac,
      sitientis piros Afros.
    </p>
  </div>
);

export default {
  title: 'Components/Container',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: Container,
  decorators: [withKnobs]
};

export const Simple = () => {
  return (
    <div>
      <Container layout='maxWidth' pad='All' animateIn>
        <h1>Simple Container</h1>
        <p>
          Ambitioni dedisse scripsisse iudicaretur. Phasellus laoreet lorem vel
          dolor tempus vehicula. A communi observantia non est recedendum. Qui
          ipsorum lingua Celtae, nostra Galli appellantur. At nos hinc posthac,
          sitientis piros Afros.
        </p>
      </Container>
      <Container layout='columns' background='Dark' theme='dark' animateIn>
        <Container pad='Horizontal'>
          <h3>Column 1</h3>
          <h4>Ambitioni dedisse</h4>
        </Container>
        <div className='container-image'>
          <DummyImage asImage />
        </div>
      </Container>
      <Container layout='maxWidthNarrow' pad='Vertical' animateIn>
        <p>
          Ambitioni dedisse scripsisse iudicaretur. Phasellus laoreet lorem vel
          dolor tempus vehicula. A communi observantia non est recedendum. Qui
          ipsorum lingua Celtae, nostra Galli appellantur. At nos hinc posthac,
          sitientis piros Afros.
        </p>
        <Container layout='columns' responsiveColumn={false}>
          <IcDanger />
          <IcLock />
          <IcAdd />
          <IcArrowLeft />
          <IcArrowRight />
          <IcMenu />
        </Container>
      </Container>
    </div>
  );
};

Simple.story = {
  parameters: {
    jest: ['Container.spec.tsx']
  }
};

export const Layouts = () => {
  const propsList = getPropsUnionArray(
    "'maxWidth' | 'columns' | 'centered' | 'maxWidthNarrow'"
  ) as Array<ContainerProps['layout']>;
  return (
    <div style={{ textAlign: 'center' }}>
      {propsList.map((p, i) => (
        <div key={i} style={{ textAlign: 'center' }} className='story-box'>
          <Container
            layout={p}
            style={p === 'centered' ? { height: '300px' } : {}}
          >
            <div>
              <h3>Layout: {p}</h3>
              <Paragraph />
            </div>
            {p === 'columns' && <DummyImage asImage size='m' />}
          </Container>
        </div>
      ))}
    </div>
  );
};

export const Padding = () => {
  const propsList = getPropsUnionArray(
    "'All' | 'Vertical' | 'Horizontal' | 'Bottom' | 'Top'"
  ) as Array<ContainerProps['pad']>;
  return (
    <div>
      <span>Paddings change automatically depending on device width</span>
      <br />
      {propsList.map((p, i) => (
        <span key={i} style={{ textAlign: 'center' }} className='story-box'>
          <Container pad={p}>
            <DummyImage size='xs' text={p} />
          </Container>
        </span>
      ))}
    </div>
  );
};

export const Breakpoints = () => {
  const propsList = getPropsUnionArray(
    "'All' | 'Desktop' | 'Non-Desktop' | 'Tablet' | 'Mobile'"
  ) as Array<ContainerProps['breakpoint']>;
  return (
    <div>
      <span>
        Container for given breakpoint only appear on that device width.
        {propsList.length} breakpoints are loaded: [{propsList.join(', ')}]
      </span>
      <br />
      <StoryDivideContainer className='story-grid-shaded'>
        {propsList.map((p, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <Container breakpoint={p}>
              <DummyImage size='xs' text={p} />
            </Container>
          </div>
        ))}
      </StoryDivideContainer>
    </div>
  );
};
