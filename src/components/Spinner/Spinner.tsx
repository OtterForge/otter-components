import './Spinner.css';
export interface SpinnerProps {
  label?: string;
  size?: number | string;
}
export const Spinner = ({ label = 'Wird geladen', size }: SpinnerProps) => {
  return (
    <span
      className="otter-spinner"
      role="status"
      style={size === undefined ? undefined : { width: size, height: size }}
    >
      <span>{label}</span>
    </span>
  );
};
