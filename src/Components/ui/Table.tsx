"use client";

import { useMemo, useState, type ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSidebar } from "../../Providers/SideBarContext";

export type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
}

export default function DataTable<T extends object>({
  title,
  columns,
  data,
  searchable = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const { open } = useSidebar();

  /* 🔍 Search */
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  /* 🔃 Sort */
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDirection]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full border rounded-2xl border-gray-300 dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center rounded-t-2xl p-4 bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>

        {searchable && (
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-62.5 px-4 py-2 rounded-xl
              bg-background text-foreground border
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}
      </div>

      {/* Table Wrapper */}
      <div
        className={`overflow-x-auto w-full ${open
          ? "max-w-[calc(100vw-284px)]"
          : "max-w-[calc(100vw-111px)]"
          }`}
      >
        <table className="min-w-max w-full text-sm">
          {/* Header */}
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.label}
                  onClick={() =>
                    col.sortable && col.key !== "actions"
                      ? handleSort(col.key as keyof T)
                      : undefined
                  }
                  className={`p-4 text-left text-lg font-bold text-gray-700 dark:text-gray-400
                    ${col.sortable
                      ? "cursor-pointer select-none hover:text-primary"
                      : ""
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {col.label}

                    {/* Sort Icons */}
                    {col.sortable && col.key !== "actions" && (
                      <span className="flex flex-col text-xs">
                        <FaChevronUp
                          className={`transition ${sortKey === col.key && sortDirection === "asc"
                            ? "text-primary"
                            : "text-gray-400"
                            }`}
                          size={8}
                        />
                        <FaChevronDown
                          className={`transition ${sortKey === col.key && sortDirection === "desc"
                            ? "text-primary"
                            : "text-gray-400"
                            }`}
                          size={8}

                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white dark:bg-gray-800">
            {sortedData.length ? (
              sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.label}
                      className="p-4 text-gray-700 dark:text-gray-300"
                    >
                      {col.render
                        ? col.render(row)
                        : col.key !== "actions"
                          ? String(row[col.key])
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
