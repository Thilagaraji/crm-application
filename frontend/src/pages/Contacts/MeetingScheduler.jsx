import React, { useState } from "react";
import "./Style.css";  
function MeetingScheduler() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addMeeting = () => {
    if (!title || !date || !time) return;

    setMeetings([...meetings, { title, date, time }]);
    setTitle("");
    setDate("");
    setTime("");
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