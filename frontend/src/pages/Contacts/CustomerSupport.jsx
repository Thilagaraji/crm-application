import React, { useState, useEffect } from "react";
import "./Style.css";  
function CustomerSupport() {
  const [tickets, setTickets] = useState([]);
  const [issue, setIssue] = useState("");

  useEffect(() => {
    fetch("/api/support", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error(err));
  }, []);

  const addTicket = async () => {
    if (!issue) return;

    const newTicket = { issue, status: "Open" };
    const res = await fetch("/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newTicket)
    });

    if (res.ok) {
      const data = await res.json();
      setTickets([...tickets, data]);
      setIssue("");
    }
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