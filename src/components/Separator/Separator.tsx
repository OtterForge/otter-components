import './Separator.css';
export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
}
export const Separator = ({ orientation = 'horizontal' }: SeparatorProps) => {
  return (
    <span
      className={`otter-separator otter-separator--${orientation}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
