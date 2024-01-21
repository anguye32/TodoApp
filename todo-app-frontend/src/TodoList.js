import React from 'react';
import './TodoStyles.css';
function TodoList({ todos, toggleComplete, deleteTodo }) {
    console.log(todos); 

    if (todos.length === 0) {
        return <p>No todos available. Add some!</p>;
    }

    return (
        <div className="container">
            {todos.map(todo => (
                <div key={todo.id} className="card my-2">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <p className="mb-0">{todo.title}</p>
                        <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default TodoList;
