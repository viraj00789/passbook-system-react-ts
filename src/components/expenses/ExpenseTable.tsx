import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import { getExpenseTableColumns } from "./ExpenseColumn";
import { ExpenseTableData } from "../../../data/expenseTableData";
import ExpenseForm from "./ExpenseForm";
import PopUp from "../ui/PopUp";

export default function ExpenseTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [expenseResetFn, setExpenseResetFn] = useState<(() => void) | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
  };

  const expenseTableColumns = getExpenseTableColumns({
    dispatch,
    setOpenDrawer,
    onDeleteClick: () => {
      setOpenDeleteModal(true);
    },
  });

  const handleCloseDrawer = () => {
    expenseResetFn?.();
    setOpenDrawer(false);
  };

  return (
    <>
      <DataTable
        title="Expense(s)"
        columns={expenseTableColumns}
        data={ExpenseTableData}
        searchable
        paginationAtFooter
        filterable={false}
        addTitle="Add Expense"
        addOnClickable={() => setOpenDrawer(true)}
      />
      <RightDrawer
        title="Add Expense"
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
      >
        <ExpenseForm
          onClose={handleCloseDrawer}
          setExpenseDataReset={setExpenseResetFn}
        />
      </RightDrawer>
      {openDeleteModal && (
        <PopUp
          popupTitle="Delete Expense"
          setOpenModal={setOpenDeleteModal}
          makeNode={
            <>
              <p className="mb-2 text-bold font-medium text-gray-600 dark:text-gray-200">
                Are you sure you want to delete this expense?
              </p>
            </>
          }
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
