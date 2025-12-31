import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import type { Transaction } from "../../store/Transactions/transactionType";
import {
  deleteTransaction,
  setEditingTransaction,
} from "../../store/Transactions/transactionsSlice";
import { useAppDispatch } from "../../store/hooks";

interface Props {
  row: Transaction;
}

export default function TransactionActionsCell({ row }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-2">
      <FiEdit2
        onClick={() => dispatch(setEditingTransaction(row))}
        className="text-gray-500 cursor-pointer"
        size={20}
      />
      <LuTrash2
        onClick={() => dispatch(deleteTransaction(row.id as number))}
        className="text-gray-500 cursor-pointer"
        size={21.5}
      />
    </div>
  );
}
