import { forwardRef, type InputHTMLAttributes } from 'react';
import './Checkbox.css';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...props }, ref) => (
  <label className="otter-choice">
    <input ref={ref} type="checkbox" {...props} />
    <span>{label}</span>
  </label>
));
Checkbox.displayName = 'Checkbox';
