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
      .then(data => setMeetings(data))
      .catch(err => console.error(err));
  }, []);

  const addMeeting = async () => {
    if (!title || !date || !time) return;

    const newMeeting = { title, date, time };
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
    }
  };

  return (
    <div className="crm-container">
      <h2>Meeting Scheduling</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={addMeeting}>Schedule</button>

      <ul>
        {meetings.map((m, i) => (
          <li key={i}>
            {m.title} - {m.date} at {m.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingScheduler;