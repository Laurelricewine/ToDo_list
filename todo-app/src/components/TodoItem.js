import React from 'react';

function TodoItem({ todo, onDeleteTodo, onToggleCompleted }) {
    return (
        <li>
            <span style={{ textDecoration: todo.is_completed ? 'line-through' : 'none' }}>
                {todo.title}
            </span>
            <button onClick={() => onToggleCompleted(todo.id)}>Toggle</button>
            <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
