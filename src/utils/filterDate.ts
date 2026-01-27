import type { DateRange, PresetType } from "../types/FilterTypes";

export const AddMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const StarteOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const EndofMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const isSameDay = (a?: Date | null, b?: Date | null) =>
  a && b && a.toDateString() === b.toDateString();

export const isInRange = (d: Date, s?: Date | null, e?: Date | null) =>
  s && e && d >= s && d <= e;

export const FormatDate = (d?: Date | null) =>
  d
    ? d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

export const getPresetRange = (preset: PresetType | null): DateRange => {
  const now = new Date();

  switch (preset) {
    case "today":
      return { start: now, end: now };
    case "yesterday": {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      return { start: y, end: y };
    }
    case "lastWeek": {
      const end = new Date(now);
      const start = new Date(now);
      start.setDate(end.getDate() - 6);
      return { start, end };
    }
    case "lastMonth":
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        end: new Date(now.getFullYear(), now.getMonth(), 0),
      };
    case "lastQuarter": {
      const q = Math.floor(now.getMonth() / 3);
      return {
        start: new Date(now.getFullYear(), q * 3 - 3, 1),
        end: new Date(now.getFullYear(), q * 3, 0),
      };
    }
    case "lastYear":
      return {
        start: new Date(now.getFullYear() - 1, 0, 1),
        end: new Date(now.getFullYear() - 1, 11, 31),
      };
    default:
      return { start: null, end: null };
  }
};
