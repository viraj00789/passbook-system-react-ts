import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import type { Column } from "../../types/TableTypes";
import type { AppDispatch } from "../../store";

interface GetAccountColumnsParams {
  dispatch: AppDispatch;
  setOpenDrawer: (open: boolean) => void;
}

export interface Account {
  id: number;
  accountName: string;
  accountNumber: string;
  ifscOrSwift: string;
  openingBalance: number;
  remark: string;
}

export const getAccountsTableColumns = ({
  setOpenDrawer,
}: GetAccountColumnsParams): Column<Account>[] => [
  {
    key: "serial",
    label: "Serial",
    sortable: false,
    render: (_: Account, index: number) => index + 1,
  },
  { key: "accountName", label: "Account Name", sortable: true },
  {
    key: "accountNumber",
    label: "Account Number",
    sortable: false,
    render: (row) => (
      <span className="font-mono tracking-wider">{row.accountNumber}</span>
    ),
  },
  {
    key: "ifscOrSwift",
    label: "IFSC / SWIFT",
    sortable: true,
    render: (row) => (
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {row.ifscOrSwift}
      </span>
    ),
  },
  {
    key: "openingBalance",
    label: "Opening Balance",
    sortable: true,
    render: (row) => (
      <span className="font-bold text-secondary">
        ₹ {row.openingBalance.toLocaleString()}
      </span>
    ),
  },
  {
    key: "remark",
    label: "Remark",
    sortable: false,
    render: (row) => (
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {row.remark}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2">
        <FiEdit2
          size={20}
          className="cursor-pointer text-gray-500"
          onClick={() => {
            setOpenDrawer(true);
          }}
        />
        <LuTrash2 size={21} className="cursor-pointer text-gray-500" />
      </div>
    ),
  },
];
