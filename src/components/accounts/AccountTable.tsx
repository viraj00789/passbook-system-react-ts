import DataTable from "../ui/Table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TransactionDrawer from "../transaction/TransactionForm";
import { getAccountsTableColumns } from "./AccountsColumn";
import { AccountsData } from "../../../data/accounTabletData";
import RightDrawer from "../ui/RightDrawer";

export default function AccountTable() {
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const accounTableColumns = getAccountsTableColumns({
    dispatch,
    setOpenDrawer,
  });

  return (
    <>
      <DataTable
        title="Accounts"
        columns={accounTableColumns}
        data={AccountsData}
        searchable
        filterable={false}
        paginationAtFooter
        addTitle="Add Account"
        pageSizeByDefault={12}
      />

      <RightDrawer
        title="Add Account"
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <TransactionDrawer onClose={() => setOpenDrawer(false)} />
      </RightDrawer>
    </>
  );
}
