import { useState, useEffect } from "react";

function TaskReminders() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTasks(data);
      })
      .catch(err => console.error(err));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const newTask = { title, date };

    try {
      const res = await fetch("/api/tasks", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask)
      });

      if (res.ok) {
        const data = await res.json();
        setTasks([...tasks, data]);
        setTitle("");
        setDate("");
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "Failed to add task");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding task. Check backend connection.");
    }
  };

  return (
    <div className="crm-container" style={{ padding: "20px" }}>
      <h2>Task Reminder</h2>

      <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Add Task</button>
      </form>

      <ul>
        {tasks.map((task, i) => (
          <li key={task._id || i}>
            <strong>{task.title}</strong> - {task.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskReminders;