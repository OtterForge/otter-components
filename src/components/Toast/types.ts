export interface ToastInput {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  duration?: number;
}
export interface ToastRecord extends ToastInput {
  id: string;
  variant: 'info' | 'success' | 'warning' | 'danger';
}
