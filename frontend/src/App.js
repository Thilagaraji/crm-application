import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";


import Login from "./pages/Login";
import Register from "./pages/Register";
import TeamDashboard from "./pages/TeamDashboard/TeamDashboard";
import SalesPipeline from "./pages/SalesPipeline/SalesPipeline";
import TaskReminders from "./pages/TaskReminders/TaskReminders";
import Leads from "./pages/Leads/Leads";

import ContactManagement from "./pages/Contacts/ContactManagement";
import MeetingScheduler from "./pages/Contacts/MeetingScheduler";
import CustomerSupport from "./pages/Contacts/CustomerSupport";

const IndexRedirect = () => {
  const { user, role, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${role}`} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Layout */}
          <Route path="/" element={<IndexRedirect />} />
          <Route
            path="/:role"
            element={
              <ProtectedRoute allowedRoles={["admin","sales","user"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >

            <Route index element={<TeamDashboard />} />

            <Route path="pipeline" element={<SalesPipeline />} />
            <Route path="tasks" element={<TaskReminders />} />
            <Route path="leads" element={<Leads />} />

            <Route path="contacts" element={<ContactManagement />} />
<Route path="meetings" element={<MeetingScheduler />} />
<Route path="support" element={<CustomerSupport />} />

          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;