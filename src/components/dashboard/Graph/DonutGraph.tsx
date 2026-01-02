import Chart from "react-apexcharts";
import { useTheme } from "../../../providers/ThemesProvider";

export default function AccountDonut() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
    },

    labels: ["Savings", "Checking", "Credit Card", "Cash"],

    colors: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"],

    dataLabels: {
      enabled: false,
    },

    legend: {
      position: "bottom",
      labels: {
        colors: isDark ? "#cbd5f5" : "#64748b",
      },
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },

    stroke: {
      width: 6,
      lineCap: "round",
      colors: [isDark ? "#1e293b" : "#ffffff"],
    },

    tooltip: {
      enabled: true,
      theme: isDark ? "dark" : "light",
    },
  };

  const series = [12000, 8000, 3000, 2000];

  return <Chart options={options} series={series} type="donut" height={300} />;
}
