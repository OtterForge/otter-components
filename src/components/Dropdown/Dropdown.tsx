import { useId, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import type { SelectOption } from '../../types/options';
import { DropdownOption } from './DropdownOption/DropdownOption';
import '../ComboBox/ComboBox.css';
export interface DropdownProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
export const Dropdown = ({ label, options, value, defaultValue, onChange }: DropdownProps) => {
  const id = useId(),
    rootRef = useRef<HTMLDivElement>(null),
    [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? ''),
    [open, setOpen] = useState(false),
    [active, setActive] = useState(-1),
    selected = value ?? internal,
    current = options.find((o) => o.value === selected);
  useOutsideClick(rootRef, () => setOpen(false));
  const choose = (option: SelectOption) => {
    if (value === undefined) setInternal(option.value);
    onChange?.(option.value);
    setOpen(false);
    setActive(-1);
  };
  return (
    <div className="otter-select-field">
      <span id={`${id}-label`}>{label}</span>
      <div className="otter-custom-select" data-open={open} ref={rootRef}>
        <button
          type="button"
          className="otter-select-control"
          aria-labelledby={`${id}-label ${id}-value`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={active >= 0 ? `${id}-option-${active}` : undefined}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              setActive((i) =>
                e.key === 'ArrowDown'
                  ? Math.min(options.length - 1, i + 1)
                  : i <= 0
                    ? options.length - 1
                    : i - 1,
              );
            } else if ((e.key === 'Enter' || e.key === ' ') && open && active >= 0) {
              e.preventDefault();
              choose(options[active]);
            } else if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
        >
          <span id={`${id}-value`}>{current?.label}</span>
          <span className="otter-select-chevron" aria-hidden="true">
            ⌄
          </span>
        </button>
        <ul id={`${id}-list`} role="listbox" className="otter-select-popup">
          {options.map((option, index) => (
            <DropdownOption
              key={option.value}
              id={`${id}-option-${index}`}
              option={option}
              active={active === index}
              selected={selected === option.value}
              onChoose={() => choose(option)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
