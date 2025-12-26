import { statsData } from "../../data/graphStatesData";
import CardDataStates from "../components/dashboard/Cards/CardDataStates";
import TransactionTable from "../components/transaction/TransactionTable";

const Transactions = () => {
  return (
    <div className="p-2 xl:p-4 h-full max-h-[calc(100vh-90px)] overflow-auto">
      <div className="grid gap-2 xl:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {statsData?.map((stat, index) => (
          <CardDataStates key={index} {...stat} chartVisible={false} />
        ))}
      </div>
      <div className="mt-2 space-y-0 xl:space-y-4">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Transactions;
