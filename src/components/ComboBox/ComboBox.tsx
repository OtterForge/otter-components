import { useId, useMemo, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import type { SelectOption } from '../../types/options';
import { ComboBoxOption } from './ComboBoxOption/ComboBoxOption';
import './ComboBox.css';
export interface ComboBoxProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
}
export const ComboBox = ({
  label,
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Suchen …',
  emptyText = 'Keine Ergebnisse',
}: ComboBoxProps) => {
  const id = useId(),
    rootRef = useRef<HTMLDivElement>(null),
    [internal, setInternal] = useState(defaultValue),
    [query, setQuery] = useState(
      () => options.find((o) => o.value === (value ?? defaultValue))?.label ?? '',
    ),
    [open, setOpen] = useState(false),
    [active, setActive] = useState(-1),
    selected = value ?? internal;
  useOutsideClick(rootRef, () => setOpen(false));
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [options, query],
  );
  const choose = (option: SelectOption) => {
    if (value === undefined) setInternal(option.value);
    setQuery(option.label);
    onChange?.(option.value);
    setOpen(false);
    setActive(-1);
  };
  const move = (delta: number) => {
    if (!open) setOpen(true);
    setActive((current) => Math.max(0, Math.min(filtered.length - 1, current + delta)));
  };
  return (
    <div className="otter-select-field">
      <label id={`${id}-label`} htmlFor={`${id}-input`}>
        {label}
      </label>
      <div className="otter-custom-select" data-open={open} ref={rootRef}>
        <span className="otter-combo-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          id={`${id}-input`}
          className="otter-combo-input"
          role="combobox"
          aria-labelledby={`${id}-label`}
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-option-${active}` : undefined}
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              move(1);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              move(-1);
            } else if (e.key === 'Enter' && active >= 0) {
              e.preventDefault();
              choose(filtered[active]);
            } else if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
            }
          }}
        />
        <span className="otter-select-chevron" aria-hidden="true">
          ⌄
        </span>
        <ul id={`${id}-list`} role="listbox" className="otter-select-popup">
          {filtered.length ? (
            filtered.map((option, index) => (
              <ComboBoxOption
                key={option.value}
                id={`${id}-option-${index}`}
                option={option}
                active={index === active}
                selected={option.value === selected}
                onChoose={() => choose(option)}
              />
            ))
          ) : (
            <li className="otter-select-empty">{emptyText}</li>
          )}
        </ul>
      </div>
    </div>
  );
};
