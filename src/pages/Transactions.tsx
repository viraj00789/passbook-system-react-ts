import { statsData } from "../../data/graphStatesData";
import CardDataStates from "../components/dashboard/Cards/CardDataStates";
import TransactionTable from "../components/transaction/TransactionTable";

const Transactions = () => {
  return (
    <div className="px-2 xl:px-4 pt-2 xl:pt-4 h-full max-h-[calc(100vh-78px)] overflow-auto space-y-2 xl:space-y-4 w-full">
      <div className="grid gap-2 xl:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {statsData?.map((stat, index) => (
          <CardDataStates key={index} {...stat} chartVisible={false} />
        ))}
      </div>
      <div className="">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Transactions;
