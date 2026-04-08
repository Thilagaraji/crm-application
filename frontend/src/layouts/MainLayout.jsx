import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function MainLayout() {

  const { role, logout } = useAuth();

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#0B6B6E",
        color: "white",
        padding: "20px"
      }}>

        <h2>CRM</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>

          <li>
            <Link to="/" style={{ color: "white" }}>Dashboard</Link>
          </li>

          {(role === "admin" || role === "sales") && (
            <li>
              <Link to="/pipeline" style={{ color: "white" }}>
                Sales Pipeline
              </Link>
            </li>
          )}

          {(role === "admin" || role === "sales") && (
            <li>
              <Link to="/leads" style={{ color: "white" }}>
                Leads
              </Link>
            </li>
          )}

          {(role === "admin" || role === "user") && (
            <li>
              <Link to="/tasks" style={{ color: "white" }}>
                Task Reminders
              </Link>
            </li>
          )}

        </ul>

        <button onClick={logout}>Logout</button>

      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default MainLayout;