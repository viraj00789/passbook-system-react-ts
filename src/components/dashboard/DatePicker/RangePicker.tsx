import { useEffect, useState } from "react";
import type { DateRange } from "../../../types/FilterTypes";
import MonthCalendar from "./MonthCalendar";
import { AddMonths } from "../../../utils/filterDate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface RangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

export const RangePicker = ({ range, onChange }: RangePickerProps) => {
  const [baseMonth, setBaseMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleSelect = (date: Date) => {
    if (!range.start || range.end) {
      onChange({ start: date, end: null });
    } else if (date < range.start) {
      onChange({ start: date, end: range.start });
    } else {
      onChange({ start: range.start, end: date });
    }
  };

  useEffect(() => {
    if (range.start) {
      setBaseMonth(
        new Date(range.start.getFullYear(), range.start.getMonth(), 1),
      );
    }
  }, [range.start]);

  return (
    <>
      {/* TOP RANGE DISPLAY */}

      <div className="flex justify-between mb-3">
        <FaAngleLeft
          className="cursor-pointer"
          onClick={() => setBaseMonth(AddMonths(baseMonth, -1))}
        />
        <FaAngleRight
          className="cursor-pointer"
          onClick={() => setBaseMonth(AddMonths(baseMonth, 1))}
        />
      </div>

      <div className="flex gap-6">
        <MonthCalendar
          month={baseMonth}
          start={range.start}
          end={range.end}
          onSelect={handleSelect}
          setHoverDate={setHoverDate}
          hoverDate={hoverDate}
        />
        <MonthCalendar
          month={AddMonths(baseMonth, 1)}
          start={range.start}
          end={range.end}
          onSelect={handleSelect}
          setHoverDate={setHoverDate}
          hoverDate={hoverDate}
        />
      </div>
    </>
  );
};
