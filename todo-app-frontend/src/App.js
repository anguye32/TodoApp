import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/todo') // Make sure URL is correct
            .then(response => {
                console.log(response.data); // Check what data is received
                setTodos(response.data.todos);
            })
            .catch(error => console.error('Error fetching data', error));
    }, []);

    const addTodo = (title) => {
        axios.post('http://127.0.0.1:5000/todo', { title })
            .then(response => setTodos([...todos, response.data.todo]))
            .catch(error => console.error('Error adding todo', error));
    };

    const toggleComplete = (id) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            console.error('Todo not found');
            return;
        }
    
        // Toggle the completion status
        const updatedTodo = { ...todo, completed: !todo.completed };
    
        // Send the update request to the backend
        axios.put(`http://127.0.0.1:5000/todo/${id}`, updatedTodo)  // Corrected URL
            .then(response => {
                // Update the state with the new todo list
                setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
            })
            .catch(error => console.error('Error updating todo', error));
    };
    
  

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todo/${id}`) 
        .then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        })
        .catch(error => console.error('Error deleting todo', error));
};


    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo} />
            <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;
