import DataTable from "../../ui/Table";
import { TransactionData } from "../../../../data/transactionTableData";
import PopUp from "../../ui/PopUp";
import { getTransactionsTableColumns } from "../../transaction/TransactionColumn";
import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import RightDrawer from "../../ui/RightDrawer";
import TransactionDrawer from "../../transaction/TransactionForm";

export default function TableUsageExample() {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [transactionResetFn, setTransactionResetFn] = useState<
    (() => void) | null
  >(null);
  const TransactionTableColumns = getTransactionsTableColumns({
    dispatch,
    onDeleteClick: () => {
      setOpenDeleteModal(true);
    },
  });

  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
  };
  const handleCloseDrawer = () => {
    transactionResetFn?.();
    setOpenDrawer(false);
  };

  return (
    <>
      <DataTable
        title="Recent Transaction(s)"
        columns={TransactionTableColumns}
        data={TransactionData}
        paginationAtHeader
        searchable
      />

      <RightDrawer
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        title={"Add Transaction"}
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
