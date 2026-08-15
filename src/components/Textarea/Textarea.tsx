import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';
import './Textarea.css';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id: givenId, ...props }, ref) => {
    const auto = useId(),
      id = givenId ?? auto;
    return (
      <label className="otter-textarea-field" htmlFor={id}>
        {label}
        <textarea
          ref={ref}
          id={id}
          className="otter-textarea"
          aria-invalid={Boolean(error) || undefined}
          {...props}
        />
        {error ? <span className="otter-field-error">{error}</span> : null}
      </label>
    );
  },
);
Textarea.displayName = 'Textarea';
