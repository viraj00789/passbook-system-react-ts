export interface SelectOption {
    label: string;
    value: string;
}

export interface FiltersState {
    dateRange: {
        start: Date | null;
        end: Date | null;
    };
    accounts: SelectOption[];
    clients: SelectOption | null;
    employees: SelectOption | null;
    transactionType: SelectOption | null;
}