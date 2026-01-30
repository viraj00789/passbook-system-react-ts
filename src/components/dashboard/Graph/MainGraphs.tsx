import MonthlyInOut from "./BarGraph";
import ExpensePie from "./ExpensePie";
import AccountDonut from "./DonutGraph";

const MainGraphs = () => {
  return (
    <div className="my-2 lg:my-3 xl:my-4 text">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3 xl:gap-4">
        <div className="bg-white dark:bg-gray-900 p-3 lg:p-4 border-radius-3xl shadow border border-gray-300 dark:border-gray-700">
          <h3 className="mb-3 font-bold text-md lg:text-xl text">
            Monthly IN vs OUT
          </h3>
          <MonthlyInOut />
        </div>

        <div className="bg-white dark:bg-gray-900 p-3 lg:p-4 border-radius-3xl shadow border border-gray-300 dark:border-gray-700">
          <h3 className="mb-3 font-bold text-md lg:text-xl text">
            Expense Breakdown
          </h3>
          <ExpensePie />
        </div>

        <div className="bg-white dark:bg-gray-900 p-3 lg:p-4 border-radius-3xl shadow last:xl:col-span-1 last:md:col-span-2 border border-gray-300 dark:border-gray-700">
          <h3 className="mb-3 font-bold text-md lg:text-xl text">
            Account-wise Balance
          </h3>
          <AccountDonut />
        </div>
      </div>
    </div>
  );
};

export default MainGraphs;
