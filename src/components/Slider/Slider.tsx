import { forwardRef, type InputHTMLAttributes, useId } from 'react';
import './Slider.css';
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  showValue?: boolean;
}
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = true, id: givenId, value, defaultValue, ...props }, ref) => {
    const autoId = useId(),
      id = givenId ?? autoId;
    return (
      <label className="otter-slider" htmlFor={id}>
        <span>
          {label}
          {showValue ? <output htmlFor={id}>{value ?? defaultValue}</output> : null}
        </span>
        <input
          ref={ref}
          id={id}
          type="range"
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      </label>
    );
  },
);
Slider.displayName = 'Slider';
