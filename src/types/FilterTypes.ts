export interface SelectOption {
  label: string;
  value: string;
}
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface FiltersState {
  dateRange: DateRange;
  type: "today" | "month" | "custom";
  accounts: SelectOption[];
  clients: SelectOption | null;
  employees: SelectOption | null;
  isCheckBoxVisible: boolean;
  checkOptions: string[];
}

export type PresetType =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastMonth"
  | "lastYear"
  | "lastQuarter"
  | "custom";


