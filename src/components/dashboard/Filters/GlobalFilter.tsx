import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../react-date-picker.css";
import { useEffect, useRef, useState } from "react";
import type { FiltersState } from "../../../types/FilterTypes";
import { forwardRef } from "react";

export type FilterType = "all" | "month" | "custom";

const HiddenInput = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <input
      ref={ref}
      tabIndex={-1}
      style={{
        width: 0,
        height: 0,
        padding: 0,
        margin: 0,
        border: 0,
        opacity: 0,
        position: "absolute",
      }}
    />
  );
});

export function Filter() {
  const today = new Date();
  const [openDate, setOpenDate] = useState(false);
  const globalFilterRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FiltersState>({
    type: "all",
    dateRange: {
      start: null,
      end: null,
    },
    accounts: [],
    clients: null,
    employees: null,
    isCheckBoxVisible: false,
    checkOptions: [],
  });

  const handleTypeChange = (type: FilterType) => {
    let dateRange: FiltersState["dateRange"];

    switch (type) {
      case "all":
        dateRange = { start: null, end: null };
        break;

      case "month": {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        dateRange = { start, end };
        break;
      }

      case "custom":
        dateRange = { start: null, end: null };
        setOpenDate(true);
        break;
    }

    setFilter({
      ...filter,
      type,
      dateRange,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        globalFilterRef.current &&
        !globalFilterRef.current.contains(event.target as Node)
      ) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="flex justify-end lg:justify-between gap-4 sm:flex-row sm:items-center cursor-pointer mt-2"
        onClick={() => setOpenDate(true)}
      >
        {filter.type === "custom" &&
          filter.dateRange.start &&
          filter.dateRange.end && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                         bg-gray-200 text-gray-700
                         dark:bg-gray-700 dark:text-gray-100
                         text-xs md:text-sm font-semibold shadow-sm"
            >
              <span>
                {filter.dateRange.start.toLocaleDateString()} –{" "}
                {filter.dateRange.end.toLocaleDateString()}
              </span>

              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setFilter({
                    ...filter,
                    dateRange: { start: null, end: null },
                  });
                }}
                className="w-4 h-4 flex items-center justify-center
                           rounded-full hover:bg-white/20
                           cursor-pointer transition-colors"
                aria-label="Clear date range"
              >
                ✕
              </button>
            </div>
          )}
        <div className="flex bg-gray-100 border-gray-300 dark:border-gray-600 border dark:bg-gray-700 p-1 rounded-lg xl:rounded-2xl">
          {(["all", "month", "custom"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-2 py-1 lg:py-2 lg:px-4 rounded-lg xl:rounded-2xl text-xs md:text-sm font-bold capitalize transition-colors cursor-pointer relative ${
                filter.type === type
                  ? "bg-white dark:bg-dark-blue shadow-sm text-primary-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {filter.type === "custom" && (
        <div
          className="absolute top-15 lg:top-18 right-2 lg:right-3.5"
          ref={globalFilterRef}
        >
          <DatePicker
            open={openDate}
            selectsRange
            startDate={filter.dateRange?.start ?? null}
            endDate={filter.dateRange?.end ?? null}
            onChange={(dates) => {
              if (!dates) return;

              const [start, end] = dates;

              setFilter({
                ...filter,
                dateRange: { start, end },
              });

              if (start && end) {
                setOpenDate(false);
              }
            }}
            placeholderText="Select date range"
            showPopperArrow={false}
            dateFormat="dd/MMM/yyyy"
            className="px-3 py-2.5 text-sm border-radius-2xl  border border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-50
               placeholder:font-medium text bg-text-500 dark:bg-dark-blue w-64 focus:outline-none caret-transparent bg-white"
            preventOpenOnFocus
            onKeyDown={(e) => e.preventDefault()}
            customInput={<HiddenInput />}
            onClickOutside={() => setOpenDate(false)}
          />
        </div>
      )}
    </>
  );
}
