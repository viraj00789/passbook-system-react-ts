import {
  EndofMonth,
  isInRange,
  isSameDay,
  StarteOfMonth,
} from "../../../utils/filterDate";

interface MonthCalendarProps {
  month: Date;
  start: Date | null;
  end: Date | null;
  onSelect: (date: Date) => void;
  hoverDate: Date | null;
  setHoverDate: (date: Date | null) => void;
}
export default function MonthCalendar({
  month,
  start,
  end,
  onSelect,
  hoverDate,
  setHoverDate,
}: MonthCalendarProps) {
  const first = StarteOfMonth(month);
  const last = EndofMonth(month);

  const blanks = (first.getDay() + 6) % 7;
  const days: (Date | null)[] = [];

  for (let i = 0; i < blanks; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), d));
  }

  const previewEnd = end ?? hoverDate;

  const rangeStart =
    start && previewEnd && start < previewEnd ? start : previewEnd;

  const rangeEnd =
    start && previewEnd && start < previewEnd ? previewEnd : start;

  return (
    <div className="w-64">
      <div className="text-center font-semibold mb-2">
        {month.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) =>
          date ? (
            <button
              key={i}
              onClick={() => onSelect(date)}
              onMouseEnter={() => setHoverDate(date)}
              onMouseLeave={() => setHoverDate(null)}
              className={`h-8 rounded-md text-sm transition-all duration-200
    ${
      isSameDay(date, start) || isSameDay(date, end)
        ? "bg-primary text-black"
        : start &&
            previewEnd &&
            rangeStart &&
            rangeEnd &&
            isInRange(date, rangeStart, rangeEnd)
          ? "bg-primary/30 text-black"
          : "hover:bg-black/5 dark:hover:bg-white/5"
    }`}
            >
              {date.getDate()}
            </button>
          ) : (
            <div key={i} />
          ),
        )}
      </div>
    </div>
  );
}
