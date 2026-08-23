export interface ToastInput {
  title: string;
  description?: string;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'danger';
  duration?: number;
}
export interface ToastRecord extends ToastInput {
  id: string;
  variant: 'default' | 'info' | 'success' | 'warning' | 'error' | 'danger';
}
