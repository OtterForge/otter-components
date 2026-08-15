import { type HTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Heading.css';

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'display' | 'h1' | 'h2';
}

export const Heading = ({
  as: Component = 'h2',
  variant = 'h2',
  className,
  ...props
}: HeadingProps) => (
  <Component
    className={mergeClassNames('otter-heading', `otter-heading--${variant}`, className)}
    {...props}
  />
);
