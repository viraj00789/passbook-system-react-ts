import { useNavigate } from "react-router";
import {
  Filter,
  type FilterState,
} from "../components/dashboard/Filters/GlobalFilter";
import { useEffect, useState } from "react";
import AreaGraph from "../components/dashboard/Graph/AreaGraph";
import CardStack from "../components/dashboard/Cards/CredritCardStacks";
import TableUsageExample from "../components/dashboard/Cards/TransactionTable";
import CardDataStates from "../components/dashboard/Cards/CardDataStates";
import { statsData } from "../../data/graphStatesData";
import MainGraphs from "../components/dashboard/Graph/MainGraphs";

const DashBoard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterState>({
    type: "all",
    dateRange: {
      start: null,
      end: null,
    },
  });
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    navigate(isAuthenticated ? "/" : "/sign-in");
  }, [navigate]);
  return (
    <>
      <div className="flex justify-between items-center sticky top-0 bg-gray-100 dark:bg-dark-blue p-4 z-10">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text">
          Dashboard
        </h1>
        <Filter filter={filter} onFilterChange={setFilter} />
      </div>
      <div className="px-2 lg:px-2 xl:px-4 h-[calc(100vh-150px)] overflow-auto">
        <div className="grid gap-2 xl:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {statsData?.map((stat, index) => (
            <CardDataStates key={index} {...stat} />
          ))}
        </div>
        <div className="flex flex-col 2xl:flex-row gap-0 lg:gap-0.5 xl:gap-4 w-full">
          <AreaGraph />
          <CardStack />
        </div>
        <MainGraphs />
        <div className="mt-2 lg:mt-6 space-y-0 xl:space-y-4">
          <TableUsageExample />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
