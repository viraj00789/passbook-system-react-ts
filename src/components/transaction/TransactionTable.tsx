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

  return (
    <>
      <DataTable
        title="Transaction"
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
        onClose={() => setOpenDrawer(false)}
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
      >
        <TransactionDrawer onClose={() => setOpenDrawer(false)} />
      </RightDrawer>
    </>
  );
}
