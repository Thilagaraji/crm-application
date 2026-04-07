import { Link } from "react-router-dom";
import { LayoutDashboard, Kanban, CheckSquare } from "lucide-react";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "#0B6B6E",
          color: "white",
          padding: "25px"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>CRM System</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <Link
            to="/"
            style={{ color: "white", textDecoration: "none", display: "flex", gap: "10px" }}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link
            to="/pipeline"
            style={{ color: "white", textDecoration: "none", display: "flex", gap: "10px" }}
          >
            <Kanban size={18} /> Sales Pipeline
          </Link>

          <Link
            to="/tasks"
            style={{ color: "white", textDecoration: "none", display: "flex", gap: "10px" }}
          >
            <CheckSquare size={18} /> Task Reminders
          </Link>

        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE7",
          padding: "30px"
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default MainLayout;