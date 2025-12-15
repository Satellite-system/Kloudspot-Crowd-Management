import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../Layouts/MainLayout";
import OverviewPage from "../pages/OverviewPage";

export default function AppRouter() {
  console.log("Inside AppRouter.jsx");
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="crowd-entries" element={<OverviewPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
