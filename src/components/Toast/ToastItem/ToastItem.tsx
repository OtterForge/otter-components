import { useCallback, useEffect, useState } from 'react';
import type { ToastRecord } from '../types';
import './ToastItem.css';
export const ToastItem = ({
  toast,
  onClose,
}: {
  toast: ToastRecord;
  onClose: (id: string) => void;
}) => {
  const [leaving, setLeaving] = useState(false);
  const close = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onClose(toast.id), 260);
  }, [onClose, toast.id]);
  useEffect(() => {
    if (toast.duration === 0) return;
    const timer = setTimeout(close, toast.duration ?? 5000);
    return () => clearTimeout(timer);
  }, [close, toast.duration]);
  return (
    <div
      className="otter-toast"
      data-leaving={leaving}
      role={toast.variant === 'danger' ? 'alert' : 'status'}
    >
      <span className={`otter-toast-dot otter-toast-dot--${toast.variant}`} aria-hidden="true" />
      <span>
        <strong>{toast.title}</strong>
        {toast.description ? <small>{toast.description}</small> : null}
      </span>
      <button type="button" aria-label="Meldung schließen" onClick={close}>
        ×
      </button>
    </div>
  );
};
