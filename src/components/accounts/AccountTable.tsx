import DataTable from "../ui/Table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAccountsTableColumns, type Account } from "./AccountsColumn";
import { AccountsData } from "../../../data/accounTabletData";
import RightDrawer from "../ui/RightDrawer";
import AccountDrawer from "./AccountForm";
import PopUp from "../ui/PopUp";

export default function AccountTable() {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [accountResetFn, setAccountResetFn] = useState<(() => void) | null>(
    null
  );
  // 🆕 Delete modal state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const accountTableColumns = getAccountsTableColumns({
    dispatch,
    setOpenDrawer,
    onDeleteClick: (account) => {
      setSelectedAccount(account);
      setOpenDeleteModal(true);
    },
  });

  const handleCloseDrawer = () => {
    accountResetFn?.();
    setOpenDrawer(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedAccount) return;
    setOpenDeleteModal(false);
    setSelectedAccount(null);
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
      {openDeleteModal && (
        <PopUp
          popupTitle="Delete Account"
          setOpenModal={setOpenDeleteModal}
          makeNode={
            <>
              <p className="mb-2 text-bold font-medium text-gray-600 dark:text-gray-200">
                Are you sure you want to delete this account?
              </p>
            </>
          }
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
