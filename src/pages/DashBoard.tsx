import { useNavigate } from "react-router";
import { Filter } from "../components/dashboard/Filters/GlobalFilter";
import { useEffect } from "react";
import AreaGraph from "../components/dashboard/Graph/AreaGraph";
import CardStack from "../components/dashboard/Cards/CredritCardStacks";
import TableUsageExample from "../components/dashboard/Cards/RecentTransaction";
import CardDataStates from "../components/dashboard/Cards/CardDataStates";
import { statsData } from "../../data/graphStatesData";
import MainGraphs from "../components/dashboard/Graph/MainGraphs";

const DashBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    navigate(isAuthenticated ? "/" : "/sign-in");
  }, [navigate]);
  return (
    <>
      <div className="grow">
        <div className="flex flex-row items-center justify-between sticky top-0 bg-gray-100 dark:bg-dark-blue py-3 xl:py-4 px-3 xl:px-5 z-10 w-full">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text">
            Dashboard
          </h1>
          <Filter />
        </div>
        <div className="px-2 lg:px-3 xl:px-4 h-[calc(100vh-160px)] overflow-auto w-full">
          <div className="grid gap-2 lg:gap-3 xl:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-2 lg:py-3 xl:py-4">
            {statsData?.map((stat, index) => (
              <CardDataStates key={index} {...stat} />
            ))}
          </div>
          <div className="flex flex-col 2xl:flex-row gap-2 lg:gap-3 xl:gap-4 w-full">
            <AreaGraph />
            <CardStack />
          </div>
          <MainGraphs />
          <div className="mt-2 lg:mt-3 xl:mt-4 space-y-0 xl:space-y-4">
            <TableUsageExample />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
