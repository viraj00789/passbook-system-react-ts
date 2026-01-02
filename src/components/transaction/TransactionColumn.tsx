import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import {
  deleteTransaction,
  setEditingTransaction,
} from "../../store/Transactions/transactionsSlice";
import type { Transaction } from "../../store/Transactions/transactionType";
import type { Column } from "../../types/TableTypes";
import type { AppDispatch } from "../../store";

interface GetColumnsParams {
  dispatch: AppDispatch;
  setOpenDrawer: (open: boolean) => void;
}

export const getTransactionsTableColumns = ({
  dispatch,
  setOpenDrawer,
}: GetColumnsParams): Column<Transaction>[] => [
  {
    key: "serial",
    label: "Serial No.",
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
      const map = {
        Completed: "bg-green-status text-secondary dark:bg-dark-green-status",
        Pending:
          "bg-orange-status text-font-orange-status dark:bg-dark-orange-status",
        Failed: "bg-red-status text-font-red-status dark:bg-dark-red-status",
      };

      return (
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            map[row.status]
          }`}
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
      const map = {
        Completed: "text-secondary",
        Pending: "text-font-orange-status",
        Failed: "text-font-red-status",
      };

      return (
        <span className={`font-bold text-md ${map[row.status]}`}>
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
    render: (row) => (
      <span
        className={`font-bold ${
          row.type === "IN" ? "text-secondary" : "text-font-red-status"
        }`}
      >
        {row.type}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (row) => (
      <div className="flex gap-2">
        <FiEdit2
          onClick={() => {
            dispatch(setEditingTransaction(row));
            setOpenDrawer(true);
          }}
          className="text-gray-500 dark:text-gray cursor-pointer"
          size={20}
        />
        <LuTrash2
          onClick={() => dispatch(deleteTransaction(row.id as number))}
          className="text-gray-500 dark:text-gray cursor-pointer"
          size={21.5}
        />
      </div>
    ),
  },
];
