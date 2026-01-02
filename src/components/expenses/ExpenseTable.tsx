import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import { getExpenseTableColumns } from "./ExpenseColumn";
import { ExpenseTableData } from "../../../data/expenseTableData";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [expenseResetFn, setExpenseResetFn] = useState<(() => void) | null>(
    null
  );

  const expenseTableColumns = getExpenseTableColumns({
    dispatch,
    setOpenDrawer,
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
    </>
  );
}
