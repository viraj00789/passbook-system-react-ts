import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { FiltersState, SelectOption } from "../../../types/FilterTypes";
import FilterSelect from "../../ui/Select";
import {
  ACCOUNT_OPTIONS,
  CLIENT_OPTIONS,
  EMPLOYEE_OPTIONS,
} from "../../../../data/filterOptionsData";

// interface FiltersPanelProps {
//     onApply?: (filters: FiltersState) => void;
// }

const checkOptionsTypes = ["IN", "OUT"];

export default function FiltersPanel() {
  const [filters, setFilters] = useState<FiltersState>({
    dateRange: {
      start: null,
      end: null,
    },
    accounts: [],
    clients: null,
    employees: null,
    isCheckBoxVisible: true,
    checkOptions: [],
  });

  const handleCheckOptionChange = (option: string) => {
    setFilters(
      filters.checkOptions.includes(option)
        ? {
            ...filters,
            checkOptions: filters.checkOptions.filter((o) => o !== option),
          }
        : {
            ...filters,
            checkOptions: [...filters.checkOptions, option],
          }
    );
  };


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

      {filters.isCheckBoxVisible && (
        <>
          <label className="block font-semibold text">Transaction Type</label>

          <div className="flex items-center gap-2">
            {checkOptionsTypes.map((option) => {
              const isChecked = filters.checkOptions.includes(option);

              return (
                <>
                  <label
                    key={option}
                    className="relative flex items-center cursor-pointer gap-2"
                  >
                    <input
                      type="checkbox"
                      className="
                peer
                h-5 w-5
                appearance-none
                rounded-full
                border
                border-gray-300
                bg-gray-200
                transition-all
                cursor-pointer

                checked:bg-primary
                checked:border-primary

                dark:bg-dark-blue
                dark:border-gray-600
                dark:checked:bg-primary

                hover:shadow-md
                focus:ring-2
                focus:ring-primary/40
              "
                      checked={isChecked}
                      onChange={() => handleCheckOptionChange(option)}
                    />

                    {/* Check Icon (UNCHANGED) */}
                    <span
                      className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-center
                text-foreground
                opacity-0
                transition-opacity
                peer-checked:opacity-100
              "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-dark-blue dark:text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </label>
                  <span
                    className="font-semibold text-gray-700 dark:text-gray-200 cursor-pointer"
                    onClick={() => handleCheckOptionChange(option)}
                  >
                    {option}
                  </span>
                </>
              );
            })}
          </div>
        </>
      )}

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
    </div>
  );
}
