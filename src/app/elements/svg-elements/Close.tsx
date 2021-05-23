import * as React from 'react';

const SvgClose = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 32 32' fill='currentColor' {...props}>
    <path d='M10.3 8.6l13.1 13.1c.5.5.5 1.3 0 1.7-.5.5-1.3.5-1.7 0L8.6 10.3c-.5-.5-.5-1.3 0-1.7.5-.5 1.3-.5 1.7 0z' />
    <path d='M8.6 21.7L21.7 8.6c.5-.5 1.3-.5 1.7 0 .5.5.5 1.3 0 1.7L10.3 23.4c-.5.5-1.3.5-1.7 0-.5-.5-.5-1.3 0-1.7z' />
  </svg>
);

export default SvgClose;
