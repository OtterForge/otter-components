import { forwardRef, type InputHTMLAttributes } from 'react';
import '../Checkbox/Checkbox.css';
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, ...props }, ref) => (
  <label className="otter-choice">
    <input ref={ref} type="radio" {...props} />
    <span>{label}</span>
  </label>
));
Radio.displayName = 'Radio';
