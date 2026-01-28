import { useEffect, useRef, useState } from "react";
import type { DateRange, PresetType } from "../../../types/FilterTypes";
import { FormatDate, getPresetRange } from "../../../utils/filterDate";
import { RangePicker } from "../DatePicker/RangePicker";
import "../../../react-date-picker.css";
import { BsArrowRight } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineDateRange } from "react-icons/md";
import { Button } from "../../ui/Button";

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
          range?.start && range?.end ? "w-fit" : "w-42"
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
          <p className="text-gray-800 dark:text-gray-100 text-sm ml-1">
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
          className="absolute -right-3 md:right-0 mt-3 z-50 md:flex rounded-x-2xl rounded-t-2xl md:rounded-b-2xl top-[calc(100vh-570px)] md:top-8
            bg-gray-100 dark:bg-dark-blue text border border-gray-500 text-dp-text shadow-xl w-screen md:w-fit min-h-119 md:h-fit md:min-h-0"
        >
          {/* PRESETS */}
          <div className="w-full md:w-45 md:border-r border-gray-500 p-2.5 space-y-0.5 font-medium flex flex-row md:flex-col whitespace-nowrap overflow-y-auto">
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
                className={`w-full text-left mx-1 md:mx-0 px-2 py-1.5 md:px-3 md:py-2 rounded-lg capitalize cursor-pointer transition-colors font-semibold ${
                  activePreset === p
                    ? "bg-primary text-black"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {p.replace(/([A-Z])/g, " $1")}
              </button>
            ))}
          </div>

          {/* CALENDAR */}
          <div className="p-4 w-full flex flex-col max-md:h-[calc(60vh-105px)]! max-md:justify-between">
            <div>
              <RangePicker
                range={range || { start: null, end: null }}
                onChange={(r) => {
                  setActivePreset(null);
                  setRange(r);
                }}
              />
            </div>

            <div className="flex justify-end gap-2 w-full">
              <Button
                onClick={() => {
                  setActivePreset(null);
                  setRange({ start: null, end: null });
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold w-full sm:w-fit border border-gray-400"
                title="Cancel"
                buttonType="button"
              />
              <Button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer
                  bg-primary text-black w-full sm:w-fit"
                title="Apply"
                buttonType="button"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
