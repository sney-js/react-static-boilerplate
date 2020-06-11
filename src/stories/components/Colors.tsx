import React from 'react';
import { StoryColorBox, StoryDivideContainer } from './Dummies';
import { getAllCSSVariableNames } from '../utils';

/**
 * This is great
 * @constructor
 */
const Colors = () => {
  const allCSSVariables = getAllCSSVariableNames();
  const allColors = allCSSVariables.filter(
    (e: string) => e.indexOf('--color') !== -1
  );
  return (
    <StoryDivideContainer>
      {allColors.map((k: string, i) => (
        <StoryColorBox
          key={i}
          colorVar={k.replace('--color-', '')}
          value={`var(${k})`}
        />
      ))}
    </StoryDivideContainer>
  );
};

export default Colors;
