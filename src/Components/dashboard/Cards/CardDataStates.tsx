import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { useTheme } from "../../../Providers/ThemesProvider";
import { getMiniBarChartOptions } from "../../../utils/graphconfig";


interface CardDataStatesProps {
    title: string;
    value: string;
    change?: string;
    changePositive?: boolean;
    icon?: React.ReactNode;
    chartData?: number[];
    color?: string;
    chartVisible?: boolean;
}

export default function CardDataStates({
    title,
    value,
    change,
    icon,
    chartData = [],
    color = "",
    changePositive,
    chartVisible = false
}: CardDataStatesProps) {
    const { theme } = useTheme();

    return (
        <div className="my-0 lg:my-4 p-4 space-y-4 rounded-2xl lg:rounded-4xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
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

                <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                    <div className="flex gap-3">

                        {changePositive && change ? (
                            <FaArrowTrendUp className="text-green-500" />
                        ) : <FaArrowTrendDown className="text-red-500" />}
                        {change && (
                            <span
                                className={`text-sm font-medium ${changePositive ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {change}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Chart */}
            {chartVisible && <Chart
                options={getMiniBarChartOptions(theme, color)}
                series={[{ data: chartData }]}
                type="bar"
                height={48}
                width="100%"
            />}
        </div>
    );
}
