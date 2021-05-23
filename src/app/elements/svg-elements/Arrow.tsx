import * as React from 'react';

const SvgArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 32 32' fill='currentColor' {...props}>
    <path
      className='arrow_svg__st0'
      d='M18.2 10.1c-.9-.8.5-2.2 1.3-1.3l6.7 6.6c.4.4.4.9 0 1.3l-6.7 6.6c-.9.8-2.2-.5-1.3-1.4l5.1-4.9H6.4c-1.2 0-1.2-1.9 0-1.9h16.8l-5-5z'
    />
  </svg>
);

export default SvgArrow;
