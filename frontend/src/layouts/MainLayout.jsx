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
            <Link to={`/${role}`} style={{ color: "blue" }}>Dashboard</Link>
          </li>

          {(role === "admin" || role === "sales") && (
            <li>
              <Link to={`/${role}/pipeline`} style={{ color: "blue" }}>
                Sales Pipeline
              </Link>
            </li>
          )}

          {(role === "admin" || role === "sales") && (
            <li>
              <Link to={`/${role}/leads`} style={{ color: "blue" }}>
                Leads
              </Link>
            </li>
          )}

          {(role === "admin" || role === "user") && (
            <li>
              <Link to={`/${role}/tasks`} style={{ color: "blue" }}>
                Task Reminders
              </Link>
            </li>
          )}
          <li>
            <Link to={`/${role}/contacts`} style={{ color: "blue" }}>
              Contact Management
            </Link>
          </li>

          <li>
            <Link to={`/${role}/meetings`} style={{ color: "blue" }}>
              Meeting Scheduler
            </Link>
          </li>

          <li>
            <Link to={`/${role}/support`} style={{ color: "blue" }}>
              Customer Support
            </Link>
          </li>

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