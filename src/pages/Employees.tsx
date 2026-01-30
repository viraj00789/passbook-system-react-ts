import EmployeeTable from "../components/employees/EmployeeTable";

const Employees = () => {
  return (
    <div className="p-2 xl:p-4 h-full max-h-[calc(100vh-75px)] 2xl:max-h-[calc(100vh-21px)] overflow-auto w-full">
      <EmployeeTable />
    </div>
  );
};

export default Employees;
