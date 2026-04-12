import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import TeamDashboard from "./pages/TeamDashboard/TeamDashboard";
import SalesPipeline from "./pages/SalesPipeline/SalesPipeline";
import TaskReminders from "./pages/TaskReminders/TaskReminders";
import Leads from "./pages/Leads/Leads";

import ContactManagement from "./pages/Contacts/ContactManagement";
import MeetingScheduler from "./pages/Contacts/MeetingScheduler";
import CustomerSupport from "./pages/Contacts/CustomerSupport";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Layout */}
          <Route
            path="/"
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