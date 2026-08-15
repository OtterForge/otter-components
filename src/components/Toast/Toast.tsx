import { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';
import { createId } from '../../utils/createId';
import type { ToastInput, ToastRecord } from './types';
import { ToastItem } from './ToastItem/ToastItem';
import './Toast.css';
interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
}
const ToastContext = createContext<ToastContextValue | null>(null);
export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastRecord[]>([]),
    dismiss = (id: string) => setToasts((items) => items.filter((item) => item.id !== id)),
    value = useMemo(
      () => ({
        toast: (input: ToastInput) => {
          const id = createId('toast');
          setToasts((items) => [...items, { variant: 'info', ...input, id }]);
          return id;
        },
        dismiss,
      }),
      [],
    );
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="otter-toast-region" aria-live="polite" aria-atomic="true">
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onClose={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast must be used inside ToastProvider');
  return value;
};
