import { BrowserRouter, Routes } from "react-router";
import { SidebarProvider } from "./providers/SideBarContext";
import { ThemesProvider } from "./providers/ThemesProvider";
import SignIn from "./pages/SignIn";
import { Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoutes,";
import DashBoard from "./pages/DashBoard";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Clients from "./pages/Clients";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/sign-in" element={<SignIn />} />

          {/* Protected */}
          <Route
            element={
              <SidebarProvider>
                <ThemesProvider>
                  <ProtectedRoute />
                </ThemesProvider>
              </SidebarProvider>
            }
          >
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashBoard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/employees" element={<div>Employees</div>} />
              <Route path="/expenses" element={<div>Expenses</div>} />
              <Route path="/invoices" element={<div>Invoices</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
