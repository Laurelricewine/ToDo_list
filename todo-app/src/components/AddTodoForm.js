import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTodo({
            title,
            is_completed: false,
            due_date: dueDate
        });
        setTitle(''); // 清空输入框
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter a new todo..."
            />
            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default AddTodoForm;
