import React, { FC, HTMLAttributes } from 'react';

type TypeDymmyImage = {
  size?: 'xs' | 's' | 'm' | 'l';
  color?: string;
  text?: string;
  asImage?: boolean;
};
export const DummyImage = ({
  size = 's',
  color = '6e6e6e',
  text = '',
  asImage = false
}: TypeDymmyImage): React.ReactElement => {
  const ratio = {
    xs: '100x100',
    s: '320x240',
    m: '600x400',
    l: '1024x768'
  };
  const sizeSplit = ratio[size].split('x');
  const myDiv = (
    <div
      className='story-dummy-box'
      style={{ width: sizeSplit[0] + 'px', height: sizeSplit[1] + 'px' }}
    >
      <span>{text}</span>
    </div>
  );

  const image = (
    <div>
      <img src={`https://dummyimage.com/${ratio[size]}/${color}/fff`} alt='' />
    </div>
  );

  if (asImage) return image;
  return myDiv;
};

export const StoryDivideContainer: FC<HTMLAttributes<HTMLElement>> = (
  props
) => {
  return <div {...props} className={'story-grid ' + props.className} />;
};

type StoryVarDisplayType = {
  index?: number;
  varName: string;
  value: string;
  valueText?: string;
};

export const StoryColorBox = (props: {
  colorVar: string;
  value: string;
}): JSX.Element => {
  return (
    <div className='story-colors'>
      <div
        style={{
          backgroundColor: props.value
        }}
      />
      <small>
        <code>{props.colorVar}</code>
      </small>
    </div>
  );
};
export const StorySpacingBox = (props: StoryVarDisplayType): JSX.Element => {
  return (
    <tr className='story-spaces'>
      <td>{props.index}</td>
      <td>{props.varName}</td>
      <td>{props.valueText}</td>
      <td
        className='story-box'
        style={{
          padding: props.value
        }}
      >
        <i />
      </td>
    </tr>
  );
};

type StoryTableProps = {
  title: string;
  description?: string;
  children: React.ReactElement;
};

export const StoryTableBox = (props: {
  children:
    | React.ReactElement<StoryTableProps>
    | React.ReactElement<StoryTableProps>[];
}): JSX.Element => {
  return (
    <table className='story-table'>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export const StoryTableItem = (props: StoryTableProps): JSX.Element => {
  return (
    <tr>
      <td>
        <h5>{props.title}</h5>
        <small>{props.description}</small>
      </td>
      <td>{props.children}</td>
    </tr>
  );
};
