export type Order = 'asc' | 'desc';

export type HeadCell<T extends { [name: string]: number | string }> = {
  id: keyof T;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
};
