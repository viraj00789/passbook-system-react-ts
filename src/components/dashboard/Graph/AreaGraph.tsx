import React, { Suspense, useMemo, useState } from "react";
import { useTheme } from "../../../providers/ThemesProvider";
import { areaChartData } from "../../../../data/areaGraphData";
import { getAreaChartOptions } from "../../../utils/graphconfig";
import LineChartSkeleton from "../../skeleton/dashboard/LineChartSkeleton";

type FilterType = "day" | "month" | "year";

export default function AreaGraph() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<FilterType>("day");
  const LazyLineChart = React.lazy(() => import("react-apexcharts"));

  const series = useMemo(
    () => [
      {
        name: "Income",
        data: areaChartData[filter].income,
      },
      {
        name: "Expense",
        data: areaChartData[filter].expense,
      },
    ],
    [filter]
  );

  return (
    <div className="w-full max-w-full 2xl:max-w-[65%] space-y-4 border-radius-3xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-0 md:p-3 xl:p-4">
      {/* Header */}
      <div className="flex justify-between items-center p-2 md:p-0">
        <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">
          Cash Flow
        </h2>

        <div className="flex items-center gap-2">
          <div className="items-center gap-3 text hidden md:flex">
            <div className="flex items-center gap-1 w-3 h-3 bg-green-500 rounded-full" />
            <p>Income</p>
            <div className="flex items-center gap-1 w-3 h-3 bg-red-500 rounded-full" />
            <p>Expense</p>
          </div>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 rounded-lg">
            {(["day", "month", "year"] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-2 py-1.5 lg:px-3 lg:py-1 text-xs sm:text-sm rounded-md capitalize transition font-bold ${
                  filter === type
                    ? "bg-white dark:bg-black text-primary-600 shadow"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}

      <div className="min-h-85">
        <Suspense fallback={<LineChartSkeleton />}>
          <LazyLineChart
            options={getAreaChartOptions(theme)}
            series={series}
            type="area"
            height={320}
          />
        </Suspense>
      </div>
    </div>
  );
}
