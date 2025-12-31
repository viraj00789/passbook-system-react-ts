import { FiEdit2 } from "react-icons/fi";
import type { AppDispatch } from "../../store";
import type { Column } from "../../types/TableTypes";
import { LuTrash2 } from "react-icons/lu";

interface GetEmplyoeesColumnsParams {
  dispatch: AppDispatch;
  setOpenDrawer: (open: boolean) => void;
}

export type Role = "Web" | "App" | "Designer" | "Admin";
export type PaymentAccount =
  | "Bank of Baroda"
  | "HDFC Bank"
  | "ICICI Bank"
  | "SBI Bank";

export interface Employee {
  id: number;
  employeeName: string;
  email: string;
  role: Role;
  monthlySalary: number;
  paymentAccount?: PaymentAccount;
}

export const getEmployeeeTableColumns = ({
  setOpenDrawer,
}: GetEmplyoeesColumnsParams): Column<Employee>[] => [
  {
    key: "serial",
    label: "Serial No.",
    sortable: false,
    render: (_: Employee, index: number) => index + 1,
  },
  {
    key: "employeeName",
    label: "Employee Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
  },
  {
    key: "monthlySalary",
    label: "Monthly Salary",
    sortable: true,
  },
  {
    key: "paymentAccount",
    label: "Payment Account",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2">
        <FiEdit2
          size={20}
          className="cursor-pointer text-gray-500"
          onClick={() => {
            setOpenDrawer(true);
          }}
        />
        <LuTrash2 size={21} className="cursor-pointer text-gray-500" />
      </div>
    ),
  },
];
