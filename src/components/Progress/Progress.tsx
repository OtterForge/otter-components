import './Progress.css';
export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}
export const Progress = ({
  value,
  max = 100,
  label = 'Fortschritt',
  showValue = true,
}: ProgressProps) => {
  const percent = Math.round((value / max) * 100);
  return (
    <div className="otter-progress-wrap">
      <span>
        {label}
        {showValue ? <strong>{percent}%</strong> : null}
      </span>
      <progress className="otter-progress" value={value} max={max}>
        {percent}%
      </progress>
    </div>
  );
};
