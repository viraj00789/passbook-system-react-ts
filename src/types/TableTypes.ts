import type { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | "actions" | "serial";
  label: string;
  sortable?: boolean;
  render?: (row: T, index: number) => ReactNode;
  sortValue?: (row: T) => string | number;
}
