import { type HTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Alert.css';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
}
const icons = { info: 'ⓘ', success: '✓', warning: '⚠', danger: '!' };
export const Alert = ({ variant = 'info', title, children, className, ...props }: AlertProps) => {
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={mergeClassNames('otter-alert', `otter-alert--${variant}`, className)}
      {...props}
    >
      <span aria-hidden="true">{icons[variant]}</span>
      <span>
        {title ? <strong>{title}</strong> : null}
        {children}
      </span>
    </div>
  );
};
