import DataTable from "../ui/Table";
import {
  TransactionData,
  TransactionsColumns,
} from "../../../data/transactionTableData";
import RightDrawer from "../ui/RightDrawer";
import { useState } from "react";

export default function TransactionTable() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <DataTable
        title="Transaction"
        columns={TransactionsColumns}
        data={TransactionData}
        searchable
        paginationAtFooter
        addTitle="Add Transaction"
        addOnClickable={() => setOpenDrawer(true)}
      />
      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Add New Transaction"
      >
        {/* Drawer Content */}
        <p className="text-sm text-gray-600">
          Your transaction form goes here.
        </p>
      </RightDrawer>
    </>
  );
}
