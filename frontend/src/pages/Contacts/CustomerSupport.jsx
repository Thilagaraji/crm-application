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
      .then(data => {
        if (Array.isArray(data)) setTickets(data);
      })
      .catch(err => console.error(err));
  }, []);

  const addTicket = async (e) => {
    e.preventDefault();
    if (!issue) return;

    const newTicket = { issue, status: "Open" };
    try {
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
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "Failed to submit ticket");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting ticket. Check backend connection.");
    }
  };

  return (
    <div className="crm-container">
      <h2>Customer Support</h2>

      <form onSubmit={addTicket} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter Issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Submit Ticket</button>
      </form>

      <ul>
        {tickets.map((t, i) => (
          <li key={t._id || i}>
            {t.issue} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerSupport;