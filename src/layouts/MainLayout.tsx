import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";


export default function MainLayout() {
    return (
        <div className="w-full h-screen flex flex-col bg-gray-100 dark:bg-dark-blue border-b border-gray-200 dark:border-gray-600">
            <Navbar />
            <div className="flex grow">
                <Sidebar />
                <div className="grow"><Outlet /></div>
            </div>
        </div>
    );
}
