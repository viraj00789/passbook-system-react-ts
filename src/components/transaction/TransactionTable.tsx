import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store";
import { setEditingTransaction } from "../../store/Transactions/transactionsSlice";
import TransactionDrawer from "./TransactionForm";
import { getTransactionsTableColumns } from "./TransactionColumn";

export default function TransactionTable() {
  const dispatch = useDispatch();
  const { transactions, editingTransaction } = useSelector(
    (state: RootState) => state.transactions
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const TransactionTableColumns = getTransactionsTableColumns({
    dispatch,
    setOpenDrawer,
  });
  const [transactionResetFn, setTransactionResetFn] = useState<
    (() => void) | null
  >(null);
  const handleCloseDrawer = () => {
    transactionResetFn?.();
    setOpenDrawer(false);
  };

  return (
    <>
      <DataTable
        title="Transaction(s)"
        columns={TransactionTableColumns}
        data={transactions}
        searchable
        paginationAtFooter
        addTitle="Add Transaction"
        addOnClickable={() => {
          dispatch(setEditingTransaction(null));
          setOpenDrawer(true);
        }}
      />

      <RightDrawer
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
      >
        <TransactionDrawer
          onClose={handleCloseDrawer}
          setTransactionReset={setTransactionResetFn}
        />
      </RightDrawer>
    </>
  );
}
