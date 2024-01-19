import React, { useState } from 'react';


function AddTodo({ addTodo }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        addTodo(title);
        setTitle('');
    };

    const formStyle = {
        margin: '20px 0',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <button type="submit">Add</button>
        </form>
    );
}
export default AddTodo;