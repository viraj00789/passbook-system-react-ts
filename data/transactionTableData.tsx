import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import type { Column } from "../src/types/TableTypes";

interface Transaction {
  [key: string]: string | number;
  id: number;
  date: string;
  description: string;
  client: string;
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
    client: "ACME Corp",
    account: "Bank A",
    amount: 1200,
    type: "IN",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-12-21",
    description: "Office Rent",
    client: "Office Expenses",
    account: "Bank B",
    amount: 500,
    type: "OUT",
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-12-22",
    description: "Consulting Fee",
    client: "John Doe",
    account: "Bank A",
    amount: 800,
    type: "IN",
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-12-23",
    description: "Software License",
    client: "IT Expenses",
    account: "Bank C",
    amount: 300,
    type: "OUT",
    status: "Failed",
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
  { key: "client", label: "Client / Employee / Expense", sortable: true },
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
