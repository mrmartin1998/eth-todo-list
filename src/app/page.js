'use client'

// Import necessary hooks and Web3
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Define your main page component
function HomePage() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    // Initialize web3 and fetch accounts
    useEffect(() => {
        async function loadWeb3() {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const acc = await web3Instance.eth.requestAccounts();
                setAccounts(acc);
            } else {
                alert("Please install MetaMask to use this app.");
            }
        }
        loadWeb3();
    }, []);

    // Function to handle new task addition
    const addTask = async () => {
        if (!input.trim()) {
            alert('Please enter a valid task.');
            return;
        }
        // Assume todoContract is already defined
        try {
            await todoContract.methods.addTask(input).send({ from: accounts[0] });
            setInput('');
            loadTasks(); // Optionally refresh the task list
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Function to load tasks from the smart contract
    const loadTasks = async () => {
        // Implementation depends on your smart contract methods
    };

    // Input change handler
    const handleInputChange = (event) => setInput(event.target.value);

    // Render your component
    return (
        <div>
            <h1>Welcome to your dApp Checklist</h1>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li> // Update to display task details appropriately
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
