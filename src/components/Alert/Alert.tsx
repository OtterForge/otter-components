import { type HTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Alert.css';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
}
const icons = {
  info: 'fas fa-circle-info',
  success: 'fas fa-circle-check',
  warning: 'fas fa-triangle-exclamation',
  danger: 'fas fa-circle-exclamation',
};
export const Alert = ({ variant = 'info', title, children, className, ...props }: AlertProps) => {
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={mergeClassNames('otter-alert', `otter-alert--${variant}`, className)}
      {...props}
    >
      <i className={icons[variant]} aria-hidden="true" />
      <span>
        {title ? <strong>{title}</strong> : null}
        {children}
      </span>
    </div>
  );
};
