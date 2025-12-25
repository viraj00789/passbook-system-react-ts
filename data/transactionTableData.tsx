import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import type { Column } from "../src/types/TableTypes";

interface Transaction {
  [key: string]: string | number | object;
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
  status: "Pending" | "Completed" | "Failed";
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
    label: "Client / Employee / Expense",
    sortable: true,
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
      return <span className="font-bold text-md text">$ {row.amount}</span>;
    },
  },
  { key: "description", label: "Description", sortable: true },
  { key: "type", label: "Type (IN/OUT)", sortable: true },

  {
    key: "actions",
    label: "Actions",
    render: (row) => (
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
    ),
  },
];
