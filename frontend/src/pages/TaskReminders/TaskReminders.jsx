import { useState, useEffect } from "react";

function TaskReminders() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {

    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));

  }, []);

  const addTask = async () => {

    const newTask = { title, date };

    const res = await fetch("/api/tasks", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(newTask)
    });

    const data = await res.json();

    setTasks([...tasks, data]);

  };

  return (

    <div>

      <h2>Task Reminder</h2>

      <input
        type="text"
        placeholder="Task"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        type="date"
        onChange={(e)=>setDate(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      {tasks.map(task => (

        <div key={task._id}>

          <p>{task.title}</p>
          <p>{task.date}</p>

        </div>

      ))}

    </div>

  );
}

export default TaskReminders;