import React, { useState } from 'react';
import './TodoStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container my-4">
            <form onSubmit={handleSubmit} className="form-inline justify-content-center">
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="form-control mr-2"
                    placeholder="Add a new task..."
                />
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </div>
    );
}
export default AddTodo;