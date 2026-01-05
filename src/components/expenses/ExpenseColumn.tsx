import { FiEdit2 } from "react-icons/fi";
import type { AppDispatch } from "../../store";
import type { Column } from "../../types/TableTypes";
import { LuTrash2 } from "react-icons/lu";

interface GetExpensesColumnsParams {
  dispatch: AppDispatch;
  setOpenDrawer: (open: boolean) => void;
  onDeleteClick: () => void;
}

export type ExpenseOptions =
  | "Rent"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Others";

export interface Expense {
  id: number;
  expenseOptions?: ExpenseOptions | null;
  notes?: string;
}

export const getExpenseTableColumns = ({
  setOpenDrawer,
  onDeleteClick,
}: GetExpensesColumnsParams): Column<Expense>[] => [
  {
    key: "serial",
    label: "Serial No.",
    sortable: false,
    render: (_: Expense, index: number) => index + 1,
  },
  {
    key: "expenseOptions",
    label: "Expense Options",
    sortable: true,
  },
  {
    key: "notes",
    label: "Notes",
    sortable: true,
    render: (row) => (
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {row.notes || "-"}
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
        <LuTrash2
          size={21}
          className="cursor-pointer text-gray-500"
          onClick={onDeleteClick}
        />
      </div>
    ),
  },
];
