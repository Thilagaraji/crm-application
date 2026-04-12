import React, { useState } from "react";
import "./Style.css";  
function CustomerSupport() {
  const [tickets, setTickets] = useState([]);
  const [issue, setIssue] = useState("");

  const addTicket = () => {
    if (!issue) return;

    setTickets([...tickets, { issue, status: "Open" }]);
    setIssue("");
  };

  return (
    <div className="crm-container">
      <h2>Customer Support</h2>

      <input
        placeholder="Enter Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />

      <button onClick={addTicket}>Submit Ticket</button>

      <ul>
        {tickets.map((t, i) => (
          <li key={i}>
            {t.issue} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerSupport;