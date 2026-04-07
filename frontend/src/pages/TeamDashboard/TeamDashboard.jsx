import { useState, useEffect } from "react";

function TeamDashboard() {

  const [stats, setStats] = useState({
    deals:0,
    revenue:0,
    leads:0
  });

  useEffect(()=>{

    fetch("/api/dashboard")
      .then(res=>res.json())
      .then(data=>setStats(data));

  },[]);

  return (

    <div>

      <h2>Team Dashboard</h2>

      <div>

        <h3>Total Deals</h3>
        <p>{stats.deals}</p>

      </div>

      <div>

        <h3>Total Revenue</h3>
        <p>${stats.revenue}</p>

      </div>

      <div>

        <h3>New Leads</h3>
        <p>{stats.leads}</p>

      </div>

    </div>

  );
}

export default TeamDashboard;