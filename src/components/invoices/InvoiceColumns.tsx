import type { Column } from "../../types/TableTypes";
import { FiEdit2, FiEye } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import type { AppDispatch } from "../../store";

export interface Invoice {
    id: number;
    clientName: string;
    receivingAccount: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    tax: number;
}

interface GetInvoiceColumnsParams {
    dispatch: AppDispatch;
    setOpenDrawer: (open: boolean) => void;
}

export const getInvoiceTableColumns = ({
    setOpenDrawer
}: GetInvoiceColumnsParams): Column<Invoice>[] => [
        {
            key: "serial",
            label: "Serial No.",
            sortable: false,
            render: (_row, index) => index + 1,
        },
        {
            key: "clientName",
            label: "Client",
            sortable: true,
        },
        {
            key: "receivingAccount",
            label: "Receiving Account",
            sortable: true,
        },
        {
            key: "invoiceNumber",
            label: "Invoice No.",
            sortable: true,
        },
        {
            key: "issueDate",
            label: "Issue Date",
            sortable: true,
        },
        {
            key: "dueDate",
            label: "Due Date",
            sortable: true,
        },
        {
            key: "tax",
            label: "Tax (%)",
            sortable: true,
            render: (row) => `${row.tax}%`,
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: () => (
                <div className="flex gap-3 text-gray-500">
                    <FiEye size={18} className="cursor-pointer" title="View Invoice" />
                    <FiEdit2 size={18} className="cursor-pointer" title="Edit Invoice" onClick={() => setOpenDrawer(true)} />
                    <LuDownload size={18} className="cursor-pointer" title="Download PDF" />
                </div>
            ),
        },
    ];
