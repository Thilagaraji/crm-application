import React, { useState, useEffect } from "react";
import "./Style.css";  

function MeetingScheduler() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch("/api/meetings", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMeetings(data);
      })
      .catch(err => console.error(err));
  }, []);

  const addMeeting = async (e) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const newMeeting = { title, date, time };
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newMeeting)
      });

      if (res.ok) {
        const data = await res.json();
        setMeetings([...meetings, data]);
        setTitle("");
        setDate("");
        setTime("");
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "Failed to schedule meeting");
      }
    } catch (err) {
      console.error(err);
      alert("Error scheduling meeting. Check backend connection.");
    }
  };

  return (
    <div className="crm-container">
      <h2>Meeting Scheduling</h2>

      <form onSubmit={addMeeting} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Schedule</button>
      </form>

      <ul>
        {meetings.map((m, i) => (
          <li key={m._id || i}>
            {m.title} - {m.date} at {m.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingScheduler;