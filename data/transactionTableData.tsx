import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import type { Column } from "../src/types/TableTypes";

export type statusOptions = "Pending" | "Completed" | "Failed";

interface Transaction {
  id: number;
  date: string;
  description: string;
  clientDetail: {
    name: string;
    image: string;
    inv: string;
  };
  account: string;
  amount: number;
  type: "IN" | "OUT";
  status: statusOptions;
}

export const TransactionData: Transaction[] = [
  {
    id: 1,
    date: "2025-12-20",
    description: "Website Development",
    clientDetail: {
      name: "ACME Corp",
      image: "https://i.pravatar.cc/40?img=1",
      inv: "INV-1001",
    },
    account: "Bank A",
    amount: 1200,
    type: "IN",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-12-21",
    description: "Office Rent",
    clientDetail: {
      name: "Office Expense",
      image: "https://i.pravatar.cc/40?img=2",
      inv: "INV-1002",
    },
    account: "Bank B",
    amount: 500,
    type: "OUT",
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-12-22",
    description: "Consulting Fee",
    clientDetail: {
      name: "John Doe",
      image: "https://i.pravatar.cc/40?img=3",
      inv: "INV-1003",
    },
    account: "Bank A",
    amount: 800,
    type: "IN",
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-12-23",
    description: "Software License",
    clientDetail: {
      name: "IT Expense",
      image: "https://i.pravatar.cc/40?img=4",
      inv: "INV-1004",
    },
    account: "Bank C",
    amount: 300,
    type: "OUT",
    status: "Failed",
  },
  {
    id: 5,
    date: "2025-12-24",
    description: "Mobile App Design",
    clientDetail: {
      name: "Creative Studio",
      image: "https://i.pravatar.cc/40?img=5",
      inv: "INV-1005",
    },
    account: "Bank A",
    amount: 1500,
    type: "IN",
    status: "Completed",
  },
  {
    id: 6,
    date: "2025-12-25",
    description: "Marketing Campaign",
    clientDetail: {
      name: "Marketing Team",
      image: "https://i.pravatar.cc/40?img=6",
      inv: "INV-1006",
    },
    account: "Bank B",
    amount: 950,
    type: "OUT",
    status: "Pending",
  },
  {
    id: 7,
    date: "2025-12-26",
    description: "Cloud Hosting",
    clientDetail: {
      name: "AWS Services",
      image: "https://i.pravatar.cc/40?img=7",
      inv: "INV-1007",
    },
    account: "Bank C",
    amount: 420,
    type: "OUT",
    status: "Completed",
  },
  {
    id: 8,
    date: "2025-12-27",
    description: "SEO Optimization",
    clientDetail: {
      name: "SEO Agency",
      image: "https://i.pravatar.cc/40?img=8",
      inv: "INV-1008",
    },
    account: "Bank A",
    amount: 670,
    type: "IN",
    status: "Completed",
  },
  {
    id: 9,
    date: "2025-12-28",
    description: "Hardware Purchase",
    clientDetail: {
      name: "Tech Supplier",
      image: "https://i.pravatar.cc/40?img=9",
      inv: "INV-1009",
    },
    account: "Bank B",
    amount: 1100,
    type: "OUT",
    status: "Failed",
  },
  {
    id: 10,
    date: "2025-12-29",
    description: "Maintenance Support",
    clientDetail: {
      name: "Support Team",
      image: "https://i.pravatar.cc/40?img=10",
      inv: "INV-1010",
    },
    account: "Bank A",
    amount: 400,
    type: "IN",
    status: "Pending",
  },
  {
    id: 11,
    date: "2025-12-30",
    description: "UI/UX Audit",
    clientDetail: {
      name: "Design Review",
      image: "https://i.pravatar.cc/40?img=11",
      inv: "INV-1011",
    },
    account: "Bank A",
    amount: 600,
    type: "IN",
    status: "Completed",
  },
  {
    id: 12,
    date: "2025-12-31",
    description: "Yearly Subscription",
    clientDetail: {
      name: "SaaS Provider",
      image: "https://i.pravatar.cc/40?img=12",
      inv: "INV-1012",
    },
    account: "Bank C",
    amount: 720,
    type: "OUT",
    status: "Completed",
  },
  {
    id: 13,
    date: "2026-01-01",
    description: "New Client Onboarding",
    clientDetail: {
      name: "Startup Inc",
      image: "https://i.pravatar.cc/40?img=13",
      inv: "INV-1013",
    },
    account: "Bank A",
    amount: 1300,
    type: "IN",
    status: "Pending",
  },
  {
    id: 14,
    date: "2026-01-02",
    description: "Office Supplies",
    clientDetail: {
      name: "Stationery Store",
      image: "https://i.pravatar.cc/40?img=14",
      inv: "INV-1014",
    },
    account: "Bank B",
    amount: 250,
    type: "OUT",
    status: "Completed",
  },
  {
    id: 15,
    date: "2026-01-03",
    description: "Backend Optimization",
    clientDetail: {
      name: "Enterprise Client",
      image: "https://i.pravatar.cc/40?img=15",
      inv: "INV-1015",
    },
    account: "Bank A",
    amount: 1800,
    type: "IN",
    status: "Completed",
  },
  {
    id: 16,
    date: "2026-01-04",
    description: "Security Audit",
    clientDetail: {
      name: "CyberSafe",
      image: "https://i.pravatar.cc/40?img=16",
      inv: "INV-1016",
    },
    account: "Bank C",
    amount: 900,
    type: "OUT",
    status: "Pending",
  },
  {
    id: 17,
    date: "2026-01-05",
    description: "Content Writing",
    clientDetail: {
      name: "Content Agency",
      image: "https://i.pravatar.cc/40?img=17",
      inv: "INV-1017",
    },
    account: "Bank B",
    amount: 550,
    type: "OUT",
    status: "Completed",
  },
  {
    id: 18,
    date: "2026-01-06",
    description: "Performance Bonus",
    clientDetail: {
      name: "Internal Transfer",
      image: "https://i.pravatar.cc/40?img=18",
      inv: "INV-1018",
    },
    account: "Bank A",
    amount: 1000,
    type: "IN",
    status: "Completed",
  },
  {
    id: 19,
    date: "2026-01-07",
    description: "Domain Renewal",
    clientDetail: {
      name: "Domain Provider",
      image: "https://i.pravatar.cc/40?img=19",
      inv: "INV-1019",
    },
    account: "Bank C",
    amount: 120,
    type: "OUT",
    status: "Completed",
  },
  {
    id: 20,
    date: "2026-01-08",
    description: "Annual Maintenance",
    clientDetail: {
      name: "Maintenance Co",
      image: "https://i.pravatar.cc/40?img=20",
      inv: "INV-1020",
    },
    account: "Bank A",
    amount: 2000,
    type: "IN",
    status: "Pending",
  },
];

export const TransactionsColumns: Column<Transaction>[] = [
  {
    key: "serial",
    label: "Serial",
    sortable: false,
    render: (_: Transaction, index: number) => index + 1,
  },
  { key: "date", label: "Date", sortable: true },
  {
    key: "clientDetail",
    label: "Client",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.clientDetail.image}
          alt={row.clientDetail.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {row.clientDetail.name}
          </p>
          <p className="text-xs text-gray-500">{row.clientDetail.inv}</p>
        </div>
      </div>
    ),
  },
  { key: "account", label: "Account", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (row) => {
      // Colored badge based on status
      let bgAndtextColor = "";
      switch (row.status) {
        case "Completed":
          bgAndtextColor =
            "bg-green-status text-secondary dark:bg-dark-green-status";
          break;
        case "Pending":
          bgAndtextColor =
            "bg-orange-status text-font-orange-status dark:bg-dark-orange-status";
          break;
        case "Failed":
          bgAndtextColor =
            "bg-red-status text-font-red-status dark:bg-dark-red-status";
          break;
        default:
          bgAndtextColor = "bg-gray-400";
      }

      return (
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${bgAndtextColor}`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,

    render: (row) => {
      let bgAndtextColor = "";
      switch (row.status) {
        case "Completed":
          bgAndtextColor = "text-secondary";
          break;
        case "Pending":
          bgAndtextColor = "text-font-orange-status";
          break;
        case "Failed":
          bgAndtextColor = "text-font-red-status";
          break;
        default:
          bgAndtextColor = "bg-gray-400";
      }
      return (
        <span className={`font-bold text-md ${bgAndtextColor}`}>
          $ {row.amount}
        </span>
      );
    },
  },
  { key: "description", label: "Description", sortable: true },
  {
    key: "type",
    label: "Type (IN/OUT)",
    sortable: true,
    render: (row) => {
      let bgAndtextColor = "";
      switch (row.type) {
        case "IN":
          bgAndtextColor = "text-secondary";
          break;
        case "OUT":
          bgAndtextColor = "text-font-red-status";
          break;
        default:
          bgAndtextColor = "bg-gray-400";
      }
      return (
        <span className={`font-bold text-md ${bgAndtextColor}`}>
          {row.type}
        </span>
      );
    },
  },

  {
    key: "actions",
    label: "Actions",
    render: (row) => {
      return (
        <div className="flex gap-2">
          <FiEdit2
            onClick={() => alert(`Edit ${row.description}`)}
            className="text-gray-500 dark:text-gray cursor-pointer"
            size={20}
          />
          <LuTrash2
            onClick={() => alert(`Delete ${row.description}`)}
            className="text-gray-500 dark:text-gray cursor-pointer"
            size={21.5}
          />
        </div>
      );
    },
  },
];
