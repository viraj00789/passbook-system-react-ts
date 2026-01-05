import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import { employeesData } from "../../../data/employeeTableData";
import { getEmployeeeTableColumns } from "./EmployeeColumn";
import EmployeeForm from "./EmployeeForm";
import PopUp from "../ui/PopUp";

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [employeeResetFn, setEmployeeResetFn] = useState<(() => void) | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
  };

  const employeeTableColumns = getEmployeeeTableColumns({
    dispatch,
    setOpenDrawer,
    onDeleteClick: () => {
      setOpenDeleteModal(true);
    },
  });

  const handleCloseDrawer = () => {
    employeeResetFn?.();
    setOpenDrawer(false);
  };

  return (
    <>
      <DataTable
        title="Employee(s)"
        columns={employeeTableColumns}
        data={employeesData}
        searchable
        paginationAtFooter
        filterable={false}
        addTitle="Add Employee"
        pageSizeByDefault={10}
        addOnClickable={() => setOpenDrawer(true)}
      />
      <RightDrawer
        title="Add Employee"
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
      >
        <EmployeeForm
          onClose={handleCloseDrawer}
          setEmployeeDataReset={setEmployeeResetFn}
        />
      </RightDrawer>
      {openDeleteModal && (
        <PopUp
          popupTitle="Delete Employee"
          setOpenModal={setOpenDeleteModal}
          makeNode={
            <>
              <p className="mb-2 text-bold font-medium text-gray-600 dark:text-gray-200">
                Are you sure you want to delete this employee?
              </p>
            </>
          }
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
