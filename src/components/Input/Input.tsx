import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Input.css';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  hint?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, hint, id: givenId, className, required, ...props }, ref) => {
    const auto = useId(),
      id = givenId ?? auto,
      descriptionId = error || hint ? `${id}-description` : undefined;
    return (
      <label className="otter-field" htmlFor={id}>
        {label ? (
          <span>
            {label}
            {required ? <span className="otter-required"> *</span> : null}
          </span>
        ) : null}
        <span className="otter-input-wrap">
          {prefix ? <span className="otter-input-affix otter-input-prefix">{prefix}</span> : null}
          <input
            ref={ref}
            id={id}
            required={required}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={descriptionId}
            className={mergeClassNames(
              'otter-input',
              Boolean(prefix) && 'has-prefix',
              Boolean(suffix) && 'has-suffix',
              className,
            )}
            {...props}
          />
          {suffix ? <span className="otter-input-affix otter-input-suffix">{suffix}</span> : null}
        </span>
        {error || hint ? (
          <span id={descriptionId} className={error ? 'otter-field-error' : 'otter-field-hint'}>
            {error ?? hint}
          </span>
        ) : null}
      </label>
    );
  },
);
Input.displayName = 'Input';
