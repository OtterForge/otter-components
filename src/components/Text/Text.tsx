import { type HTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Text.css';

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode;
  as?: 'p' | 'span' | 'div';
  variant?: 'bodyLarge' | 'body' | 'meta' | 'caption' | 'micro';
  muted?: boolean;
  mono?: boolean;
}

export const Text = ({
  as: Component = 'p',
  variant = 'body',
  muted = false,
  mono = false,
  className,
  ...props
}: TextProps) => (
  <Component
    className={mergeClassNames(
      'otter-text-role',
      `otter-text-role--${variant}`,
      muted && 'is-muted',
      mono && 'is-mono',
      className,
    )}
    {...props}
  />
);
