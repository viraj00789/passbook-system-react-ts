import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import type { Transaction } from "../../store/Transactions/transactionType";
import {
  deleteTransaction,
  setEditingTransaction,
} from "../../store/Transactions/transactionsSlice";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface Props {
  row: Transaction;
}

export default function TransactionActionsCell({ row }: Props) {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.transactions);
  console.log("🚀 ~ TransactionActionsCell ~ data:", data);

  return (
    <div className="flex gap-2">
      <FiEdit2
        onClick={() => dispatch(setEditingTransaction(row))}
        className="text-gray-500 cursor-pointer"
        size={20}
      />
      <LuTrash2
        onClick={() => dispatch(deleteTransaction(row.id))}
        className="text-gray-500 cursor-pointer"
        size={21.5}
      />
    </div>
  );
}
