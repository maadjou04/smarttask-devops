import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    setTitle('');
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>SmartTask</h1>
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div>
            <strong>{task.title}</strong>
            <div><span className={`status ${task.status}`}>{task.status}</span></div>
          </div>
          <div>
            <button onClick={() => toggleStatus(task)}>✓</button>
            <button onClick={() => deleteTask(task.id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
