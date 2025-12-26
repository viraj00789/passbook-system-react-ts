import DataTable from "../ui/Table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAccountsTableColumns } from "./AccountsColumn";
import { AccountsData } from "../../../data/accounTabletData";
import RightDrawer from "../ui/RightDrawer";
import AccountDrawer from "./AccountForm";

export default function AccountTable() {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const accountTableColumns = getAccountsTableColumns({
    dispatch,
    setOpenDrawer,
  });

  return (
    <>
      <DataTable
        title="Accounts"
        columns={accountTableColumns}
        data={AccountsData}
        searchable
        filterable={false}
        paginationAtFooter
        addTitle="Add Account"
        pageSizeByDefault={12}
        addOnClickable={() => setOpenDrawer(true)}
      />

      <RightDrawer
        title="Add Account"
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <AccountDrawer onClose={() => setOpenDrawer(false)} />
      </RightDrawer>
    </>
  );
}
