"use client";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export type FilterType = "day" | "month" | "year" | "custom";
export interface FilterState {
  type: FilterType;
  dateRange?: {
    start: Date | null | undefined;
    end: Date | null | undefined;
  }
}
interface FilterProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}



export function Filter({ filter, onFilterChange }: FilterProps) {
  const today = new Date();

  const handleTypeChange = (type: FilterType) => {
    let dateRange: FilterState["dateRange"] | undefined;

    if (type === "day") {
      dateRange = { start: today, end: today };
    }

    if (type === "month") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      dateRange = { start, end };
    }

    if (type === "year") {
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      dateRange = { start, end };
    }

    if (type === "custom") {
      dateRange = { start: null, end: null };
    }

    onFilterChange({ type, dateRange });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Filter buttons */}
      <div className="flex bg-gray-100 border-gray-200 dark:border-gray-600 border dark:bg-gray-700 p-1 rounded-lg">
        {(["day", "month", "year", "custom"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-2 lg:px-4 py-2 rounded-md text-sm font-bold capitalize transition-colors cursor-pointer ${filter.type === type
              ? "bg-white dark:bg-dark-blue shadow-sm text-primary-600"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Custom range picker */}
      {filter.type === "custom" && (
        <DatePicker
          selectsRange
          startDate={filter.dateRange?.start}
          endDate={filter.dateRange?.end}
          onChange={(dates) => {
            const [start, end] = dates as [Date | null, Date | null];
            onFilterChange({
              ...filter,
              dateRange: { start, end },
            });
          }}
          isClearable
          placeholderText="Select date range"
          className="px-3 py-2 text-sm border rounded-md w-64 text"
        />
      )}
    </div>
  );
}
