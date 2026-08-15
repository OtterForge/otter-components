import { type HTMLAttributes } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Accordion.css';
export const Accordion = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={mergeClassNames('otter-accordion', className)} {...props} />;
};
