import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './IconButton.css';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
  variant?: 'default' | 'primary';
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, icon, variant = 'default', className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={mergeClassNames('otter-icon-button', `otter-icon-button--${variant}`, className)}
      {...props}
    >
      {icon}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
