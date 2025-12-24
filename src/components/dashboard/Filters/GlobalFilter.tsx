import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../react-date-picker.css"


export type FilterType = "all" | "month" | "custom";
export interface FilterState {
  type: FilterType;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  }
}
interface FilterProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

export function Filter({ filter, onFilterChange }: FilterProps) {
  const today = new Date();

  const handleTypeChange = (type: FilterType) => {
    let dateRange: FilterState["dateRange"];

    switch (type) {
      case "all":
        dateRange = undefined;
        break;

      case "month": {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        dateRange = { start, end };
        break;
      }

      case "custom":
        dateRange = { start: null, end: null };
        break;
    }

    onFilterChange({ type, dateRange });
  };


  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex bg-gray-100 border-gray-300 dark:border-gray-600 border dark:bg-gray-700 p-1 rounded-3xl">
        {(["all", "month", "custom"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-2 lg:px-4 py-2 rounded-3xl text-sm font-bold capitalize transition-colors cursor-pointer ${filter.type === type
              ? "bg-white dark:bg-dark-blue shadow-sm text-primary-600"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {filter.type === "custom" && (
        <DatePicker
          selectsRange
          startDate={filter.dateRange?.start ?? null}
          endDate={filter.dateRange?.end ?? null}
          onChange={(dates) => {
            if (!dates) return;

            const [start, end] = dates;
            onFilterChange({
              ...filter,
              dateRange: { start, end },
            });
          }}
          isClearable
          placeholderText="Select date range"
          className="px-3 py-2.5 text-sm border border-primary rounded-3xl w-64
               placeholder:text-gray-500 dark:placeholder:text-gray-50
               placeholder:font-medium text"

        />
      )}
    </div>
  );
}
