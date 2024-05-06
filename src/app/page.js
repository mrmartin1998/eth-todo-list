// Filename: src/app/page.client.js

'use client'

import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState(['Example task']);
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
          {tasks.map((task, index) => <li key={index}>{task}</li>)}
        </ul>
      </main>
    </div>
  );
}
