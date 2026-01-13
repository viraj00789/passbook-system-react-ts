export interface SelectOption {
  label: string;
  value: string;
}

export interface FiltersState {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  type: "all" | "month" | "custom";
  accounts: SelectOption[];
  clients: SelectOption | null;
  employees: SelectOption | null;
  isCheckBoxVisible: boolean;
  checkOptions: string[];
}
