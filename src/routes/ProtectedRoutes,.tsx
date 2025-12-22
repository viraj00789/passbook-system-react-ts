import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
    return !!localStorage.getItem("auth");
};

export default function ProtectedRoute() {
    if (!isAuthenticated()) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
