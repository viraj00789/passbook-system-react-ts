import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { invoiceDummyData } from "../../../data/invoiceDummyData";
import { getInvoiceTableColumns } from "./InvoiceColumns";
import RightDrawer from "../ui/RightDrawer";
import DataTable from "../ui/Table";
import InvoiceForm from "./InvoiceForm";


export default function InvoiceTable() {
    const dispatch = useAppDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [invoiceResetFn, setInvoiceResetFn] = useState<(() => void) | null>(
        null
    );

    const invoiceTableColumns = getInvoiceTableColumns({
        dispatch,
        setOpenDrawer,
    });

    const handleCloseDrawer = () => {
        invoiceResetFn?.();
        setOpenDrawer(false);
    };

    return (
        <>
            <DataTable
                title="Invoice(s)"
                columns={invoiceTableColumns}
                data={invoiceDummyData}
                searchable
                paginationAtFooter
                filterable={false}
                addTitle="Add Invoice"
                pageSizeByDefault={12}
                addOnClickable={() => setOpenDrawer(true)}
            />
            <RightDrawer
                title="Add Invoice"
                isOpen={openDrawer}
                onClose={handleCloseDrawer}
            >
                <InvoiceForm onClose={handleCloseDrawer} setInvoiceDataReset={setInvoiceResetFn} />
            </RightDrawer>
        </>
    );
}
