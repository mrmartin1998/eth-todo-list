// Filename: src/app/page.js
'use client';

import Head from 'next/head';
import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';

export default function Home() {
  const [input, setInput] = useState('');
  const { tasks, addTask, updateStatus } = useTasks();

  const handleInputChange = (event) => setInput(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      addTask(input.trim());
      setInput('');
    }
  };

  const handleStatusChange = (index, isChecked) => updateStatus(index, isChecked);

  return (
    <div>
      <Head>
        <title>Checklist dApp</title>
        <meta name="description" content="Decentralized Task Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to your dApp Checklist</h1>
        <div>
          <input type="text" value={input} onChange={handleInputChange} placeholder="Enter a new task" />
          <button onClick={handleSubmit}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => handleStatusChange(task.index, !task.isDone)}
              />
              {task.task}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
