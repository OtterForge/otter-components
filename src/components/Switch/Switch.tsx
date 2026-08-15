import { forwardRef, type InputHTMLAttributes } from 'react';
import './Switch.css';
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  label: string;
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ label, ...props }, ref) => (
  <label className="otter-switch-label">
    <input ref={ref} className="otter-switch" type="checkbox" role="switch" {...props} />
    <span>{label}</span>
  </label>
));
Switch.displayName = 'Switch';
