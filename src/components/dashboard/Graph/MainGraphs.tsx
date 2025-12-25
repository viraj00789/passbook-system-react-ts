import MonthlyInOut from "./BarGraph";
import ExpensePie from "./ExpensePie";
import AccountDonut from "./DonutGraph";

const MainGraphs = () => {
  return (
    <div className="my-4 text">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow">
          <h3 className="mb-3 font-bold text-xl text ">Monthly IN vs OUT</h3>
          <MonthlyInOut />
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow">
          <h3 className="mb-3 font-bold text-xl text ">Expense Breakdown</h3>
          <ExpensePie />
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow">
          <h3 className="mb-3 font-bold text-xl text ">Account-wise Balance</h3>
          <AccountDonut />
        </div>
      </div>
    </div>
  );
};

export default MainGraphs;
