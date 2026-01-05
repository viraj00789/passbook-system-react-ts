import { FiEdit2 } from "react-icons/fi";
import type { AppDispatch } from "../../store";
import type { Column } from "../../types/TableTypes";
import { LuTrash2 } from "react-icons/lu";

interface GetClientsColumnsParams {
  dispatch: AppDispatch;
  setOpenDrawer: (open: boolean) => void;
  onDeleteClick: () => void;
}

export interface Client {
  id: number;
  clientName: string;
  email: string;
  phone?: string;
  bankName?: {
    name?: string;
    accountNumber?: string;
    ifscCode?: string;
  };
  notes?: string;
}

export const getClientTableColumns = ({
  setOpenDrawer,
  onDeleteClick,
}: GetClientsColumnsParams): Column<Client>[] => [
  {
    key: "serial",
    label: "Serial No.",
    sortable: false,
    render: (_: Client, index: number) => index + 1,
  },
  {
    key: "clientName",
    label: "Client Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "phone",
    label: "Phone",
    sortable: true,
    render: (row) => (
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {row.phone || "-"}
      </span>
    ),
  },
  {
    key: "bankName",
    label: "Bank Name",
    sortValue: (row) => row.bankName?.name ?? "",
    sortable: true,
    render: (row) => {
      const { name, accountNumber, ifscCode } = row.bankName || {};
      return (
        <p className="font-semibold text-gray-700 dark:text-gray-300 gap-2">
          Account Name : {name || "-"}
          {
            <>
              {accountNumber && (
                <p className="text-gray-500 dark:text-gray-200 font-semibold">
                  Acc. No. :
                  <span className="text-gray-500 dark:text-gray-400 font-normal">
                    {accountNumber ? ` ${accountNumber}` : "-"}
                  </span>
                </p>
              )}
              {ifscCode && (
                <p className="text-gray-500 dark:text-gray-200 font-semibold">
                  Ifsc. Code :
                  <span className="text-gray-500 dark:text-gray-400 font-normal">
                    {ifscCode ? ` ${ifscCode}` : "-"}
                  </span>
                </p>
              )}
            </>
          }
        </p>
      );
    },
  },
  {
    key: "notes",
    label: "Notes",
    sortable: true,
    render: (row) => (
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {row.notes || "-"}
      </span>
    ),
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
        <LuTrash2
          size={21}
          className="cursor-pointer text-gray-500"
          onClick={() => onDeleteClick()}
        />
      </div>
    ),
  },
];
