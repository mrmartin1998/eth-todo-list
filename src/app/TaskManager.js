// src/app/TaskManager.js
import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => setInput(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      setTasks(prevTasks => [...prevTasks, input.trim()]);
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} placeholder="Enter a new task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => <li key={index}>{task}</li>)}
      </ul>
    </div>
  );
}

export default TaskManager;
