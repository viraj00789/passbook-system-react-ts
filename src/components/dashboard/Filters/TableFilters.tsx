import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { FiltersState, SelectOption } from "../../../types/FilterTypes";
import FilterSelect from "../../ui/Select";
import {
  ACCOUNT_OPTIONS,
  CLIENT_OPTIONS,
  EMPLOYEE_OPTIONS,
  TRANSACTION_OPTIONS,
} from "../../../../data/filterOptionsData";

// interface FiltersPanelProps {
//     onApply?: (filters: FiltersState) => void;
// }

export default function FiltersPanel() {
  const [filters, setFilters] = useState<FiltersState>({
    dateRange: {
      start: null,
      end: null,
    },
    accounts: [],
    clients: null,
    employees: null,
    transactionType: null,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Date Range */}
      <div className="w-full max-w-full">
        <label className="flex flex-col mb-2 font-semibold text">
          Date Range
        </label>
        <DatePicker
          selectsRange
          startDate={filters.dateRange?.start}
          endDate={filters.dateRange?.end}
          onChange={(dates) => {
            if (!dates) return;

            const [start, end] = dates;
            setFilters({
              ...filters,
              dateRange: { start, end },
            });
          }}
          isClearable
          placeholderText="Select date range"
          className="p-2 text-sm border border-gray-300 dark:border-gray-600 hover:border-gray-400 rounded-md w-full max-w-full block
               placeholder:text-gray-500 dark:placeholder:text-gray-400
               placeholder:font-medium text focus:border-gray-500 bg-gray-100 dark:bg-dark-blue"
        />
      </div>

      <FilterSelect
        label="Accounts"
        placeholder="Select an account"
        isMulti
        options={ACCOUNT_OPTIONS}
        value={filters?.accounts}
        onChange={(val) =>
          setFilters((prev) => ({
            ...prev,
            accounts: Array.isArray(val) ? val : [],
          }))
        }
      />

      <FilterSelect
        label="Clients"
        placeholder="Select an client"
        options={CLIENT_OPTIONS}
        value={filters.clients}
        onChange={(val) =>
          setFilters((prev) => ({
            ...prev,
            clients: val as SelectOption | null,
          }))
        }
      />

      <FilterSelect
        label="Employees"
        placeholder="Select an employee"
        options={EMPLOYEE_OPTIONS}
        value={filters.employees}
        onChange={(val) =>
          setFilters((prev) => ({
            ...prev,
            employees: val as SelectOption | null,
          }))
        }
      />

      <FilterSelect
        label="Transaction Type"
        placeholder="Select a transaction type"
        options={TRANSACTION_OPTIONS}
        value={filters.transactionType}
        onChange={(val) =>
          setFilters((prev) => ({
            ...prev,
            transactionType: val as SelectOption | null,
          }))
        }
      />
    </div>
  );
}
