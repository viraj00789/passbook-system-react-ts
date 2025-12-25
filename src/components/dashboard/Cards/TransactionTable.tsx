import DataTable from "../../ui/Table";
import {
  TransactionsColumns,
  TransactionData,
} from "../../../../data/transactionTableData";

export default function TableUsageExample() {
  return (
    <DataTable
      title="Recent Transaction(s)"
      columns={TransactionsColumns}
      data={TransactionData}
      paginationAtHeader
      searchable
    />
  );
}
