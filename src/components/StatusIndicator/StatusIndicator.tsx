import { type ReactNode } from 'react';
import './StatusIndicator.css';
export interface StatusIndicatorProps {
  children: ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info';
  pulse?: boolean;
}
export const StatusIndicator = ({
  children,
  status = 'success',
  pulse = false,
}: StatusIndicatorProps) => {
  return (
    <span className="otter-status">
      <span
        className={`otter-status-dot otter-status-dot--${status}`}
        data-pulse={pulse}
        aria-hidden="true"
      />
      {children}
    </span>
  );
};
