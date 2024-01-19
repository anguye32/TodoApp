import React from 'react';
function TodoList({ todos }) {
    console.log(todos); // Check received todos

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList; 