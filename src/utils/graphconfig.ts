import { type ApexOptions } from "apexcharts";

export function getMiniBarChartOptions(
  theme: "light" | "dark",
  color: string
): ApexOptions {
  return {
    chart: {
      type: "bar",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 350,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2.5,
        columnWidth: "85%",
      },
    },
    colors: [color],
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
    },

    dataLabels: {
      enabled: false,
    },
  };
}

export function getAreaChartOptions(theme: "light" | "dark"): ApexOptions {
  return {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },

    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.35,
        opacityTo: 0.05,
      },
    },

    colors: ["#22c55e", "#ef4444"], // income / expense

    dataLabels: { enabled: false },
    markers: { size: 0 },

    grid: {
      strokeDashArray: 4,
      borderColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
    },

    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },

    yaxis: {
      labels: {
        formatter: (val) => `₹${val.toLocaleString()}`,
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },

    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },

    legend: {
      show: false,
      labels: {
        colors: theme === "dark" ? "#e5e7eb" : "#374151",
      },
    },
  };
}
