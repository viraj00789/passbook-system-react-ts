// components/AccountDonut.tsx
import Chart from "react-apexcharts";

export default function AccountDonut() {
  const options: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: ["Savings", "Checking", "Credit Card", "Cash"],
    colors: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"],
    legend: {
      position: "bottom",
      labels: {
        colors: "text",
      },

    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    stroke: {
      width: 0,
      lineCap: "round",
    },
  };

  const series = [12000, 8000, 3000, 2000];

  return <Chart options={options} series={series} type="donut" height={300} />;
}
