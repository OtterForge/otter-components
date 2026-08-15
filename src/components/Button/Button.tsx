import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Button.css';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 's' | 'm' | 'l';
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'm', loading = false, className, children, disabled, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={mergeClassNames(
        'otter-button',
        `otter-button--${variant}`,
        `otter-button--${size}`,
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="otter-button__spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
