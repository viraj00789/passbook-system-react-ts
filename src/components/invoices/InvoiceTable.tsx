import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { invoiceDummyData } from "../../../data/invoiceDummyData";
import { getInvoiceTableColumns } from "./InvoiceColumns";
import RightDrawer from "../ui/RightDrawer";
import DataTable from "../ui/Table";
import InvoiceForm from "./InvoiceForm";
import PopUp from "../ui/PopUp";

export default function InvoiceTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [invoiceResetFn, setInvoiceResetFn] = useState<(() => void) | null>(
    null
  );

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
  };
  const invoiceTableColumns = getInvoiceTableColumns({
    dispatch,
    setOpenDrawer,
    onDeleteClick: () => {
      setOpenDeleteModal(true);
    },
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
        addOnClickable={() => setOpenDrawer(true)}
      />
      <RightDrawer
        title="Add Invoice"
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
      >
        <InvoiceForm
          onClose={handleCloseDrawer}
          setInvoiceDataReset={setInvoiceResetFn}
        />
      </RightDrawer>
      {openDeleteModal && (
        <PopUp
          popupTitle="Delete Invoice"
          setOpenModal={setOpenDeleteModal}
          makeNode={
            <>
              <p className="mb-2 text-bold font-medium text-gray-600 dark:text-gray-200">
                Are you sure you want to delete this invoice?
              </p>
            </>
          }
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
