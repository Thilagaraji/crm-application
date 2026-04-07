import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import SalesPipeline from "./pages/SalesPipeline/SalesPipeline";
import TaskReminders from "./pages/TaskReminders/TaskReminders";
import TeamDashboard from "./pages/TeamDashboard/TeamDashboard";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TeamDashboard />} />
          <Route path="/pipeline" element={<SalesPipeline />} />
          <Route path="/tasks" element={<TaskReminders />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;