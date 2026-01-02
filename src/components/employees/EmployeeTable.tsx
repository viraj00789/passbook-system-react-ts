import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import { employeesData } from "../../../data/employeeTableData";
import { getEmployeeeTableColumns } from "./EmployeeColumn";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [employeeResetFn, setEmployeeResetFn] = useState<(() => void) | null>(
    null
  );

  const employeeTableColumns = getEmployeeeTableColumns({
    dispatch,
    setOpenDrawer,
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
        pageSizeByDefault={12}
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
    </>
  );
}
