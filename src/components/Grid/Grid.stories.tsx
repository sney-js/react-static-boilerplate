import * as React from 'react';
import { CSSProperties } from 'react';
import Grid from './Grid';

export default {
  title: 'Components/Container/Grid',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: Grid
};

export const SimpleGrid = () => {
  const GridItem = ({ style = {} }: { style: CSSProperties }) => (
    <div
      style={{
        backgroundColor: 'var(--color-primary-translucent-1)',
        ...style
      }}
    >
      <small>
        Ambitioni dedisse scripsisse iudicaretur. Phasellus laoreet lorem vel
        dolor tempus vehicula. A communi observantia non est recedendum. Qui
        ipsorum lingua Celtae, nostra Galli appellantur. At nos hinc posthac,
        sitientis piros Afros.
      </small>
    </div>
  );
  const gridItemRow = {
    3: { gridRow: '2 / span 2' },
    5: { gridColumn: '1 / span 2' }
  };
  return (
    <div>
      <div>
        <Grid
          template='2fr 1fr 1fr'
          templateTablet='2fr 1fr'
          templateMobile='1fr 1fr'
          gap='var(--spacing-gap-m)'
          gridStyles={{ alignItems: 'stretch' }}
        >
          {[...Array(9)].map((_p, i) => (
            <GridItem key={i} style={gridItemRow[i] || {}} />
          ))}
        </Grid>
      </div>
    </div>
  );
};
