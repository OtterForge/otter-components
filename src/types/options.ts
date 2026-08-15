export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}
