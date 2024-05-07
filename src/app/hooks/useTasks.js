// Filename: src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';

const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "taskIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "task",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isDone",
          "type": "bool"
        }
      ],
      "name": "TaskAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "taskIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "task",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isDone",
          "type": "bool"
        }
      ],
      "name": "TaskCompleted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_task",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskIndex",
          "type": "uint256"
        }
      ],
      "name": "getTask",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "task",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isDone",
              "type": "bool"
            }
          ],
          "internalType": "struct ToDoList.Task",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskIndex",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "updateStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskIndex",
          "type": "uint256"
        }
      ],
      "name": "deleteTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTaskCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

const contractAddress = '0x636B1Dd4f8f4685741b05BF91aC7Aa3bFEC2DAa7';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const taskContract = new web3Instance.eth.Contract(contractABI, contractAddress);

          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setContract(taskContract);

          loadTasks(taskContract, accounts[0]);

          window.ethereum.on('accountsChanged', async (accounts) => {
            setAccount(accounts[0]);
            loadTasks(taskContract, accounts[0]);
          });

          window.ethereum.on('chainChanged', () => window.location.reload());
        } catch (error) {
          console.error('User denied account access:', error);
        }
      } else {
        alert('Web3 is not detected. Please install MetaMask or use a compatible browser to use this dApp.');
      }
    };

    initWeb3();
  }, []);

  const loadTasks = async (contract, account) => {
    try {
      const taskCount = await contract.methods.getTaskCount().call({ from: account });
      const loadedTasks = [];
      for (let i = 0; i < taskCount; i++) {
        const task = await contract.methods.getTask(i).call({ from: account });
        loadedTasks.push({ task: task.task, isDone: task.isDone, index: i });
      }
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async (task) => {
    if (task.trim() === '') {
      alert('Please enter a valid task.');
      return;
    }
    try {
      await contract.methods.addTask(task).send({ from: account });
      loadTasks(contract, account);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateStatus = async (index, status) => {
    try {
      await contract.methods.updateStatus(index, status).send({ from: account });
      loadTasks(contract, account);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return { tasks, addTask, updateStatus };
};
