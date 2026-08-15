import type { SelectOption } from '../../../types/options';
export const DropdownOption = ({
  option,
  active,
  selected,
  onChoose,
  id,
}: {
  option: SelectOption;
  active: boolean;
  selected: boolean;
  onChoose: () => void;
  id: string;
}) => {
  return (
    <li
      id={id}
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled || undefined}
      data-active={active}
      className="otter-select-option"
      onClick={() => !option.disabled && onChoose()}
    >
      {option.label}
      {selected ? <span aria-hidden="true">✓</span> : null}
    </li>
  );
};
