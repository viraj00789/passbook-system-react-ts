import { memo, useMemo, useState, type ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSidebar } from "../../providers/SideBarContext";
import { IoAddCircle, IoFilter } from "react-icons/io5";
import FiltersPanel from "../dashboard/Filters/TableFilters";
import FilterPopUp from "./FilterPopup";
import { RxCross2 } from "react-icons/rx";
import type { Column } from "../../types/TableTypes";
import { getPaginationRange } from "../../utils/getPaginationBadge";
import PaginationControls from "../PaginationButton";
import { useWindowSize } from "../../utils/useWindowSize";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

export type SortDirection = "asc" | "desc";

interface DataTableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  filterable?: boolean;
  filterNode?: ReactNode;
  paginationAtHeader?: boolean;
  paginationAtFooter?: boolean;
  addTitle?: string;
  addOnClickable?: () => void;
  pageSizeByDefault?: number;
}

function DataTable<T extends object>({
  title,
  columns,
  data,
  searchable = true,
  filterable = true,
  paginationAtHeader = false,
  paginationAtFooter = false,
  addTitle = "",
  addOnClickable,
  pageSizeByDefault = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const { open } = useSidebar();
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pageSizeByDefault;
  const width = useWindowSize();
  const isMobile = width < 768;
  const sortableColumns = columns.filter(
    (col) => col.sortable && col.key !== "actions"
  );

  const getCellValue = (row: T, col: Column<T>, idx: number) => {
    if (col.render) return col.render(row, idx);
    if (col.key === "serial") return (currentPage - 1) * pageSize + idx + 1;
    if (col.key === "actions") return null;
    return String(row[col.key as keyof T]);
  };

  const extractSearchText = (value: unknown): string => {
    if (value == null) return "";

    if (typeof value === "object") {
      return Object.values(value).map(extractSearchText).join(" ");
    }

    return String(value);
  };

  /* 🔍 Search */
  const filteredData = useMemo(() => {
    if (!search) return data;

    const searchLower = search.toLowerCase();

    return data.filter((row) =>
      Object.values(row).some((value) =>
        extractSearchText(value).toLowerCase().includes(searchLower)
      )
    );
  }, [data, search]);

  /* 🔃 Sort */
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const column = columns.find((c) => c.key === sortKey);

    return [...filteredData].sort((a, b) => {
      const aVal = column?.sortValue ? column.sortValue(a) : a[sortKey];
      const bVal = column?.sortValue ? column.sortValue(b) : b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDirection, columns]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginationRange = useMemo(
    () => getPaginationRange(safePage, totalPages),
    [safePage, totalPages]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setCurrentPage(1);

      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full border border-radius-2xl border-gray-300 dark:border-gray-800 h-full">
      {/* Header */}
      <div className="flex justify-end sm:justify-between items-center rounded-t-xl xl:rounded-t-2xl p-2 lg:p-4 bg-white dark:bg-gray-800">
        <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white hidden sm:flex">
          {title}
        </h1>

        <div className="flex items-center gap-2">
          {/* Pagination at header  */}
          <div>
            {paginationAtHeader && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
          {/* Search */}
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setCurrentPage(1);
                setSearch(e.target.value);
              }}
              className="w-full max-w-62.5 px-4 py-2 rounded-xl
              bg-background text-foreground border
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-gray-200  dark:bg-dark-blue"
            />
          )}

          {/* Filter */}
          {filterable &&
            (openModal ? (
              <RxCross2
                size={36}
                className="text border border-gray-300 dark:border-gray-700 rounded-lg px-1.5 w-13 h-9.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(false);
                }}
              />
            ) : (
              <IoFilter
                size={36}
                className="text border border-gray-300 dark:border-gray-700 rounded-lg px-1.5 w-13 h-9.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
              />
            ))}

          <div>
            {openModal && (
              <FilterPopUp
                openModal={openModal}
                setOpenModal={setOpenModal}
                popupTitle="Filter"
                makeNode={<FiltersPanel />}
              />
            )}
          </div>

          {/* Add Button */}
          {addTitle && (
            <div
              className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl gap-2 p-2 text-gray-700 cursor-pointer bg-primary"
              onClick={addOnClickable}
            >
              <IoAddCircle size={22} className="font-bold" />
              <p className="font-bold whitespace-nowrap">{addTitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Table Wrapper */}
      {isMobile ? (
        <div className="p-2 space-y-4">
          <div className="flex gap-2 text">
            <select
              value={sortKey ? String(sortKey) : ""}
              onChange={(e) => {
                setSortKey(e.target.value as keyof T);
                setSortDirection("asc");
                setCurrentPage(1);
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
               bg-white dark:bg-dark-blue text-sm"
            >
              <option value="">Sort by</option>
              {sortableColumns.map((col) => (
                <option key={String(col.key)} value={String(col.key)}>
                  {col.label}
                </option>
              ))}
            </select>

            <button
              disabled={!sortKey}
              onClick={() =>
                setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
               text-sm disabled:opacity-50"
            >
              {sortDirection === "asc" ? (
                <FaArrowUpLong size={20} />
              ) : (
                <FaArrowDownLong size={20} />
              )}
            </button>
          </div>
          {paginatedData.length ? (
            paginatedData.map((row, idx) => (
              <div
                key={idx}
                className="border border-gray-300 dark:border-gray-800 rounded-xl p-4 bg-gray-50 dark:bg-gray-800 space-y-2 "
              >
                {columns.map((col) => (
                  <div key={col.label} className="py-1 flex items-center gap-5">
                    <div className="font-bold text-md lg:text-xl text whitespace-nowrap">
                      {col.label}:
                    </div>
                    <div className="font-semibold text:sm lg:text-lg text-gray-700 dark:text-gray-300 whitespace-nowrap truncate">
                      {getCellValue(row, col, idx)}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No data found</div>
          )}
        </div>
      ) : (
        <div
          className={`overflow-x-auto w-full max-w-[calc(100vw-11px)] h-full max-h-[calc(100vh-231px)] ${
            open
              ? "lg:max-w-[calc(100vw-250px)]"
              : "lg:max-w-[calc(100vw-90px)]"
          }`}
        >
          <table className="min-w-max w-full text-sm h-full">
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
                    className={`p-4 text-left text-md font-bold text-gray-700 dark:text-gray-400 sticky top-0 bg-gray-100 dark:bg-gray-900
                    ${
                      col.sortable
                        ? "cursor-pointer select-none hover:text-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}

                      {/* Sort Icons */}
                      {col.sortable && col.key !== "actions" && (
                        <span className="flex flex-col ">
                          <FaChevronUp
                            className={`transition ${
                              sortKey === col.key && sortDirection === "asc"
                                ? "text-primary"
                                : "text-gray-400"
                            }`}
                            size={8}
                          />
                          <FaChevronDown
                            className={`transition ${
                              sortKey === col.key && sortDirection === "desc"
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
                paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.label}
                        className="p-4 text-gray-700 dark:text-gray-300 h-5"
                      >
                        {col.key === "serial"
                          ? (currentPage - 1) * pageSize + idx + 1
                          : col.render
                          ? col.render(row, idx)
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
      )}

      {/* Pagination */}
      {paginationAtFooter && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 text bg-white dark:bg-gray-800 rounded-b-2xl">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <div>
            {paginationRange.map((item, idx) =>
              item === "..." ? (
                <span key={idx} className="px-2 text-gray-500">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item)}
                  className={`px-3 py-1 rounded-full text-sm transition cursor-pointer
          ${
            item === safePage
              ? "bg-primary text-gray-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default memo(DataTable) as typeof DataTable;
