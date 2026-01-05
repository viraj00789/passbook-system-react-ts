import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getClientTableColumns } from "./ClientsColumn";
import { ClientsData } from "../../../data/clientsTableData";
import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import ClientForm from "./ClientForm";
import PopUp from "../ui/PopUp";

export default function ClientTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clientResetFn, setClientResetFn] = useState<(() => void) | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCloseDrawer = () => {
    clientResetFn?.();
    setOpenDrawer(false);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
  };

  const clientTableColumns = getClientTableColumns({
    dispatch,
    setOpenDrawer,
    onDeleteClick: () => {
      setOpenDeleteModal(true);
    },
  });

  return (
    <>
      <DataTable
        title="Client(s)"
        columns={clientTableColumns}
        data={ClientsData}
        searchable
        paginationAtFooter
        filterable={false}
        addTitle="Add Client"
        addOnClickable={() => setOpenDrawer(true)}
      />
      <RightDrawer
        title="Add Client"
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
      >
        <ClientForm
          onClose={handleCloseDrawer}
          setClientDataReset={setClientResetFn}
        />
      </RightDrawer>

      {openDeleteModal && (
        <PopUp
          popupTitle="Delete Client"
          setOpenModal={setOpenDeleteModal}
          makeNode={
            <>
              <p className="mb-2 text-bold font-medium text-gray-600 dark:text-gray-200">
                Are you sure you want to delete this client?
              </p>
            </>
          }
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
