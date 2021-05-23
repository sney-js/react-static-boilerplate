import * as React from 'react';
import * as iconsList from './index';
import Grid from '../../components/Grid';

export default {
  title: 'Elements/Icons'
};

export const SVG = () => {
  const iconsListArray = [];
  for (const key in iconsList) {
    iconsListArray.push({ name: key, value: iconsList[key] });
  }
  return (
    <Grid template='repeat(auto-fill, minmax(100px, 1fr))'>
      {iconsListArray.map((e, i) => (
        <div key={i} className='story-dummy-icon'>
          <div>{e.value()}</div>
          <small>
            <code>{'<' + e.name + ' />'}</code>
          </small>
        </div>
      ))}
    </Grid>
  );
};
