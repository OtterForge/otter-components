import type { SelectOption } from '../../../types/options';
export const ComboBoxOption = ({
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
      onPointerDown={(event) => event.preventDefault()}
      onClick={() => !option.disabled && onChoose()}
    >
      <span>
        {option.label}
        {option.description ? <small>{option.description}</small> : null}
      </span>
      {selected ? <span aria-hidden="true">✓</span> : null}
    </li>
  );
};
