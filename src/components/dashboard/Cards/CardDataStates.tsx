import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { getMiniBarChartOptions } from "../../../utils/graphconfig";
import React, { Suspense } from "react";
import BarChartSkeleton from "../../skeleton/dashboard/BarChartSkeleton";
import { useTheme } from "../../../hooks/useTheme";

interface CardDataStatesProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  chartData?: number[];
  color?: string;
  chartVisible?: boolean;
  textColor?: string;
}

export default function CardDataStates({
  title,
  value,
  change,
  icon,
  chartData = [],
  color = "",
  changePositive,
  chartVisible = false,
  textColor = "",
}: CardDataStatesProps) {
  const { theme } = useTheme();
  const LazyChart = React.lazy(() => import("react-apexcharts"));

  return (
    <div className="my-0 xl:my-0 p-4 space-y-4 border-radius-3xl  border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between">
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>

        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 flex-wrap">
          <p className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <div className="flex gap-3">
            {changePositive && change ? (
              <FaArrowTrendUp className={`${textColor}`} />
            ) : (
              <FaArrowTrendDown className={`${textColor}`} />
            )}
            {change && (
              <span className={`text-sm font-medium ${textColor}`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      {chartVisible && (
        <div className="min-h-12.5">
          <Suspense fallback={<BarChartSkeleton />}>
            <LazyChart
              options={getMiniBarChartOptions(theme, color)}
              series={[{ data: chartData }]}
              type="bar"
              height={48}
              width="100%"
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
