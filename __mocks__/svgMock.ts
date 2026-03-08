import type { SVGProps } from 'react';
import { createElement } from 'react';

export default function SvgMock(props: SVGProps<SVGSVGElement>) {
  return createElement('svg', props);
}
