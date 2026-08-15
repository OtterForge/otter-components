import { type HTMLAttributes } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Card.css';
export interface CardProps extends HTMLAttributes<HTMLElement> {
  interactive?: boolean;
}
export const Card = ({ interactive = false, className, ...props }: CardProps) => {
  return (
    <article
      className={mergeClassNames('otter-card', interactive && 'is-interactive', className)}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    />
  );
};
