import Chart from "react-apexcharts";
import { useTheme } from "../../../providers/ThemesProvider";

export default function MonthlyInOut() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      foreColor: isDark ? "#e5e7eb" : "#334155",
      background: "transparent",

      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    theme: {
      mode: theme,
    },

    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          colors: isDark ? "#cbd5f5" : "#475569",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#cbd5f5" : "#475569",
        },
      },
    },

    grid: {
      borderColor: isDark ? "#334155" : "#e5e7eb",
    },

    colors: ["#22c55e", "#ef4444"],

    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "75%",
      },
    },

    legend: {
      position: "bottom",
      labels: {
        colors: isDark ? "#e5e7eb" : "#334155",
      },
    },

    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: "100%",
            },
          },
          xaxis: {
            labels: {
              rotate: -60,
              style: {
                fontSize: "10px",
              },
            },
          },
          legend: {
            fontSize: "12px",
          },
        },
      },
    ],
  };

  const series = [
    { name: "Income", data: [4000, 4200, 3800, 4600, 4800, 5000] },
    { name: "Expense", data: [2800, 3000, 2600, 3100, 3300, 3500] },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
}
