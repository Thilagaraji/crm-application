import { useState, useEffect } from "react";
import "./TeamDashboard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function TeamDashboard() {
  const [stats, setStats] = useState({
    deals: 0,
    revenue: 0,
    leads: 0
  });
  const { role } = useAuth();

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {}); // Ignore errors pre-auth
  }, []);

  const quickLinks = [
    { path: '/pipeline', label: 'Sales Pipeline', roles: ['admin', 'sales'] },
    { path: '/leads', label: 'Leads', roles: ['admin', 'sales'] },
    { path: '/tasks', label: 'Tasks', roles: ['admin', 'user'] }
  ];

  return (
    <div className="container">
      <div className="dashboard-hero">
        <h1>Welcome to Your CRM Dashboard</h1>
        <p>Role: <strong>{role.toUpperCase()}</strong> | Track leads, manage pipeline, stay organized</p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <h3>{stats.deals}</h3>
          <p>Total Deals</p>
        </div>
        <div className="card stat-card">
          <h3>${stats.revenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="card stat-card">
          <h3>{stats.leads}</h3>
          <p>New Leads</p>
        </div>
      </div>

      <div className="quick-links">
        {quickLinks.map(link => (
          link.roles.includes(role) && (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          )
        ))}
      </div>
    </div>
  );
}

export default TeamDashboard;
