// components/ExpensePie.tsx
import Chart from "react-apexcharts";

export default function ExpensePie() {
  const options: ApexCharts.ApexOptions = {
    chart: { type: "pie", width: "200" },
    labels: ["Rent", "Food", "Transport", "Shopping", "Others"],
    colors: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#a3a3a3"],
    legend: { position: "bottom", labels: { colors: "text" } },
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

    dataLabels: {
      enabled: false, // ⬅ removes text from bars
    },
  };

  const series = [40, 20, 15, 15, 10];

  return <Chart options={options} series={series} type="pie" height={300} />;
}
