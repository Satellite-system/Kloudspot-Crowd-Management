import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../Layouts/MainLayout";
import OverviewPage from "../pages/OverviewPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route path="/" element={<MainLayout children={Dashboard} />} /> */}


        {/* Apply the Layout component to all routes that need the sidebar/header */}
        <Route path="/" element={<MainLayout />}>
          {/* These are the children passed to the Layout component */}
          {/* <Route index element={<Dashboard />} /> Renders the Overview content */}
          <Route index element={<OverviewPage />} /> {/* Renders the Overview content */}
          {/* <Route path="crowd-entries" element={<OverviewPage />} /> */}
        </Route>

        {/* Protected Example */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
