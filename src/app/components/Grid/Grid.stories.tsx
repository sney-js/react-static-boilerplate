import React from 'react';
import Grid, { GridProps } from './Grid';

export default {
  title: 'Containers/Grid',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: Grid
};

export const basic = (args: GridProps): JSX.Element => {
  return (
    <Grid {...args}>
      {[...Array(9)].map((_p, i) => (
        <div key={i} className='story-box'>
          <div>
            Quis aute iure reprehenderit in voluptate velit esse. Sed haec quis
            possit intrepidus aestimare tellus. Nihil hic munitissimus habendi
            senatus locus, nihil horum?
          </div>
        </div>
      ))}
    </Grid>
  );
};

basic.args = {
  template: '1fr 1fr 1fr',
  templateTablet: '1fr 1fr',
  templateMobile: '1fr',
  gap: '30px'
};
