import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import SalesPipeline from "./pages/SalesPipeline/SalesPipeline";
import TaskReminders from "./pages/TaskReminders/TaskReminders";
import TeamDashboard from "./pages/TeamDashboard/TeamDashboard";
import Leads from "./pages/Leads/Leads";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['admin', 'sales', 'user']}>
              <MainLayout>
                <Routes>
                  <Route index element={
                    <ProtectedRoute allowedRoles={['admin', 'sales', 'user']}>
                      <TeamDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="pipeline" element={
                    <ProtectedRoute allowedRoles={['admin', 'sales']}>
                      <SalesPipeline />
                    </ProtectedRoute>
                  } />
                  <Route path="tasks" element={
                    <ProtectedRoute allowedRoles={['admin', 'user']}>
                      <TaskReminders />
                    </ProtectedRoute>
                  } />
                  <Route path="leads" element={
                    <ProtectedRoute allowedRoles={['admin', 'sales']}>
                      <Leads />
                    </ProtectedRoute>
                  } />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
