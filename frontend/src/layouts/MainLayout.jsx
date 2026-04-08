import { Link } from "react-router-dom";
import { LayoutDashboard, Kanban, CheckSquare, Users, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

function MainLayout({ children }) {
  const { user, role, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'sales', 'user'] },
    { path: '/pipeline', label: 'Pipeline', icon: Kanban, roles: ['admin', 'sales'] },
    { path: '/leads', label: 'Leads', icon: Users, roles: ['admin', 'sales'] },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare, roles: ['admin', 'user'] }
  ];

  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>CRM System</h2>
          <div className="user-info">
            <span>{user?.email || role}</span>
            <button onClick={logout} className="logout-btn" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map(item => (
            item.roles.includes(role) && (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </div>

      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
