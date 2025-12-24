"use client";

import { BiWallet } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { GiRadialBalance } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";

export const statsData = [
  {
    title: "Total In (Selected period)",
    value: "₹1,20,000",
    change: "+8.2%",
    changePositive: true,
    icon: <BiWallet className="text-2xl text-green-500" />,
    color: "#22c55e",
    chartData: [20, 35, 25, 40, 30, 45, 50],
    chartVisible: true,
  },
  {
    title: "Total Out (Selected period)",
    value: "₹80,000",
    change: "-3.1%",
    changePositive: false,
    icon: <SlCalender className="text-2xl text-red-500" />,
    color: "#ef4444",
    chartData: [40, 30, 35, 25, 20, 30, 28],
    chartVisible: true,
  },
  {
    title: "Net Balance",
    value: "₹40,000",
    change: "+5.4%",
    changePositive: true,
    icon: <GiRadialBalance className="text-2xl text-blue-500" />,
    color: "#3b82f6",
    chartData: [10, 20, 15, 25, 20, 30, 35],
    chartVisible: true,
  },
  {
    title: "Pending Invoices",
    value: "₹15,000",
    icon: <FiClock className="text-2xl text-yellow-500" />,
    color: "#eab308",
    chartData: [5, 10, 8, 12, 9, 15, 10],
    chartVisible: true,
  },
];
