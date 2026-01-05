import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store";
import { setEditingTransaction } from "../../store/Transactions/transactionsSlice";
import TransactionDrawer from "./TransactionForm";
import { getTransactionsTableColumns } from "./TransactionColumn";
import PopUp from "../ui/PopUp";

export default function TransactionTable() {
  const dispatch = useDispatch();
  const { transactions, editingTransaction } = useSelector(
    (state: RootState) => state.transactions
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [transactionResetFn, setTransactionResetFn] = useState<
    (() => void) | null
  >(null);
  const handleCloseDrawer = () => {
    transactionResetFn?.();
    setOpenDrawer(false);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
  };

  const TransactionTableColumns = getTransactionsTableColumns({
    dispatch,
    setOpenDrawer,
    onDeleteClick: () => {
      setOpenDeleteModal(true);
    },
  });

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
      {openDeleteModal && (
        <PopUp
          popupTitle="Delete Transaction"
          setOpenModal={setOpenDeleteModal}
          makeNode={
            <>
              <p className="mb-2 text-bold font-medium text-gray-600 dark:text-gray-200">
                Are you sure you want to delete this transaction?
              </p>
            </>
          }
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
