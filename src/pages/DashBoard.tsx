import { useNavigate } from "react-router";
import { Filter, type FilterState } from "../Components/dashboard/Filters/GlobalFilter"
import { useEffect, useState } from "react";
import AreaGraph from "../Components/dashboard/Graph/AreaGraph";
import CardStack from "../Components/dashboard/Cards/CredritCardStacks";
import TableUsageExample from "../Components/dashboard/Cards/UserTable";
import CardDataStates from "../Components/dashboard/Cards/CardDataStates";
import { statsData } from "../../Data/graphStatesData";

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
            <div className="flex justify-between items-center sticky top-0 bg-gray-100 dark:bg-dark-blue p-2 lg:p-4 z-10">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text">
                    Dashboard
                </h1>
                <Filter filter={filter} onFilterChange={setFilter} />
            </div>
            <div className="px-2 lg:px-4 h-[calc(100vh-150px)] overflow-auto">
                <div className="grid gap-2 md:gap-3 lg:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statsData?.map((stat, index) => (
                        <CardDataStates key={index} {...stat} />
                    ))}
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <AreaGraph />
                    <CardStack />
                </div>
                <div className="mt-2 lg:mt-6 space-y-0 lg:space-y-4">
                    <TableUsageExample />
                </div>
            </div>
        </>
    )
}

export default DashBoard