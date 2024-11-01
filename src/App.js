import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);
    //This is used to load Task from local storage when app loads
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

   //saving task whenever they change it save our task to local storage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // adding the task 
    const addTask = () => {
        const taskText = taskInput.trim();
        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }
        setTasks([...tasks, { text: taskText, completed: false }]);
        setTaskInput('');
    };

   // deleting  the task
    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };
    // editing the task
    const editTask = (index) => {
        const newTasks = [...tasks];
        const originalText = newTasks[index].text;
        const editInput = window.prompt('Edit Task', originalText) || originalText;
        newTasks[index].text = editInput.trim() || originalText;
        setTasks(newTasks);
    };
    //completion of task
    const toggleCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };
    // clearing all task
    const clearAllTasks = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to clear all tasks?')) {
            setTasks([]);
        }
    };

    return (
        <div className="todo-container">
            <h1>Daily To Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    id="new-task-input"
                    placeholder="Add new list item"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') addTask();
                    }}
                />
                <button id="add-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <ul className="todo-list">
                {tasks
                    .sort((a, b) => a.completed - b.completed)
                    .map((task, index) => (
                        <li
                            key={index}
                            className={`todo-item ${task.completed ? 'completed' : ''}`}
                        >
                            <input
                                type="radio"
                                checked={task.completed}
                                onChange={() => toggleCompletion(index)}
                            />
                            <label
                                onDoubleClick={() => editTask(index)}
                            >
                                {task.completed ? <s>{task.text}</s> : task.text}
                            </label>
                            <button onClick={() => deleteTask(index)}>✕</button>
                        </li>
                    ))}
            </ul>
            <div className="footer">
                <span>
                    {tasks.length} item{tasks.length !== 1 ? 's' : ''} selected
                </span>
                <a href="#" id="clear-all" onClick={clearAllTasks}>
                    Clear All
                </a>
            </div>
        </div>
    );
}

export default App;
