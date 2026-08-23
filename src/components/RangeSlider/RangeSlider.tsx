import { useMemo } from 'react';
import './RangeSlider.css';
export interface RangeSliderProps {
  label: string;
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}
export const RangeSlider = ({
  label,
  min = 0,
  max = 100,
  value,
  onChange,
  formatValue = String,
}: RangeSliderProps) => {
  const left = ((value[0] - min) / (max - min)) * 100,
    right = ((value[1] - min) / (max - min)) * 100,
    background = useMemo(
      () =>
        `linear-gradient(90deg,var(--otter-control) 0 ${left}%,var(--otter-control-active) ${left}% ${right}%,var(--otter-control) ${right}%)`,
      [left, right],
    );
  return (
    <fieldset className="otter-range">
      <legend>{label}</legend>
      <div className="otter-range-values">
        <span>{formatValue(value[0])}</span>
        <span>{formatValue(value[1])}</span>
      </div>
      <div className="otter-range-track" style={{ background }}>
        <input
          aria-label={`${label} lower value`}
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([Math.min(+e.target.value, value[1]), value[1]])}
        />
        <input
          aria-label={`${label} upper value`}
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], Math.max(+e.target.value, value[0])])}
        />
      </div>
    </fieldset>
  );
};
