import { useEffect, useRef, useState } from "react";
import type { DateRange, PresetType } from "../../../types/FilterTypes";
import { FormatDate, getPresetRange } from "../../../utils/filterDate";
import { RangePicker } from "../DatePicker/RangePicker";
import "../../../react-date-picker.css";
import { BsArrowRight } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineDateRange } from "react-icons/md";

export function Filter() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [activePreset, setActivePreset] = useState<PresetType | null>(null);
  const [range, setRange] = useState<DateRange | null>(() =>
    getPresetRange(null),
  );

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="relative">
      <div
        className={`flex justify-between items-center border p-1 border-gray-300 dark:border-gray-600 rounded-md ${
          range?.start && range?.end ? "w-fit" : "w-45"
        }`}
        onMouseDown={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <MdOutlineDateRange
          className={
            "w-6 h-6 rounded-xs cursor-pointer text-gray-800 dark:text-gray-100"
          }
        />
        {!range?.start && !range?.end && (
          <p className="text-gray-800 dark:text-gray-100 text-sm ml-3">
            Select Date Range
          </p>
        )}
        <div className="flex items-center">
          {range?.start && range?.end && (
            <>
              <span className="mx-1.5 text-sm text flex items-center gap-2">
                {FormatDate(range.start)}
                <BsArrowRight />
                {FormatDate(range.end)}
              </span>
              <RxCrossCircled
                className="rounded-xs cursor-pointer text-gray-800 dark:text-gray-100 font-bold"
                size={18}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setActivePreset(null);
                  setRange({ start: null, end: null });
                }}
              />
            </>
          )}
        </div>
      </div>

      {open && (
        <div
          ref={ref}
          className="absolute right-0 mt-3 z-50 flex rounded-2xl
            bg-gray-100 dark:bg-dark-blue text border border-gray-500 text-dp-text shadow-xl"
        >
          {/* PRESETS */}
          <div className="w-44 border-r border-gray-500 p-2.5 space-y-0.5 font-medium">
            {[
              "today",
              "yesterday",
              "lastWeek",
              "lastMonth",
              "lastQuarter",
              "lastYear",
              "custom",
            ].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setActivePreset(p as PresetType);
                  const r = getPresetRange(p as PresetType);
                  setRange(r);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg capitalize cursor-pointer transition-colors ${
                  activePreset === p
                    ? "bg-primary text-black font-semibold"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {p.replace(/([A-Z])/g, " $1")}
              </button>
            ))}
          </div>

          {/* CALENDAR */}
          <div className="p-4 w-140">
            <RangePicker
              range={range || { start: null, end: null }}
              onChange={(r) => {
                setActivePreset(null);
                setRange(r);
              }}
            />

            <div className="flex items-center justify-end pt-7">
              <button
                onClick={() => {
                  setActivePreset(null);
                  setRange({ start: null, end: null });
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer
                  bg-primary text-black"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
