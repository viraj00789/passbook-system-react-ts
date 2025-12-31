import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getClientTableColumns } from "./ClientsColumn";
import { ClientsData } from "../../../data/clientsTableData";
import DataTable from "../ui/Table";
import RightDrawer from "../ui/RightDrawer";
import ClientForm from "./ClientForm";

export default function ClientTable() {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clientResetFn, setClientResetFn] = useState<(() => void) | null>(null);

  const clientTableColumns = getClientTableColumns({
    dispatch,
    setOpenDrawer,
  });

  const handleCloseDrawer = () => {
    clientResetFn?.();
    setOpenDrawer(false);
  };

  return (
    <>
      <DataTable
        title="Clients"
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
    </>
  );
}
