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
  const [accountResetFn, setAccountResetFn] = useState<(() => void) | null>(
    null
  );

  const accountTableColumns = getAccountsTableColumns({
    dispatch,
    setOpenDrawer,
  });

  const handleCloseDrawer = () => {
    accountResetFn?.();
    setOpenDrawer(false);
  };

  return (
    <>
      <DataTable
        title="Account(s)"
        columns={accountTableColumns}
        data={AccountsData}
        searchable
        filterable={false}
        paginationAtFooter
        addTitle="Add Account"
        pageSizeByDefault={10}
        addOnClickable={() => setOpenDrawer(true)}
      />

      <RightDrawer
        title="Add Account"
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
      >
        <AccountDrawer
          onClose={handleCloseDrawer}
          setAccount={setAccountResetFn}
        />
      </RightDrawer>
    </>
  );
}
