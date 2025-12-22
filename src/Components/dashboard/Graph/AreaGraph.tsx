"use client";

import { useMemo, useState } from "react";
import { useTheme } from "../../../Providers/ThemesProvider";
import { areaChartData } from "../../../../Data/areaGraphData";
import { getAreaChartOptions } from "../../../utils/graphconfig";
import Chart from "react-apexcharts"


type FilterType = "day" | "month" | "year";

export default function AreaGraph() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<FilterType>("day");

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
    <div className="my-2 lg:my-0 w-full max-w-full lg:max-w-[65%] space-y-4 rounded-2xl lg:rounded-3xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          Cash Flow
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 text">
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
                className={`px-3 py-1 text-sm rounded-md capitalize transition font-bold ${filter === type
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
      <Chart
        options={getAreaChartOptions(theme)}
        series={series}
        type="area"
        height={320}
      />
    </div>
  );
}
