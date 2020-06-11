import React from 'react';
import { StorySpacingBox } from './Dummies';
import { getAllCSSVariableNames, getElementCSSVariables } from '../utils';

/**
 * This is great
 * @constructor
 */
const Spacing = () => {
  const allCSSVariables = getAllCSSVariableNames();
  const allNumbers = allCSSVariables.filter(
    (e: string) => e.indexOf('--spacing-') !== -1
  );
  const allKeyValue = getElementCSSVariables(allNumbers);
  return (
    <table>
      <thead>
        <th>#</th>
        <th>Variable Name</th>
        <th>Value</th>
        <th>Visual</th>
      </thead>
      {Object.keys(allKeyValue).map((k, i) => (
        <StorySpacingBox
          key={i}
          index={i + 1}
          valueText={allKeyValue[k]}
          varName={k.replace('--spacing-', '')}
          value={`var(${k})`}
        />
      ))}
    </table>
  );
};

export default Spacing;
