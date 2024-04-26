import React from 'react';
import TodoItem from './TodoItem.js';

function TodoList({ todos, onDeleteTodo, onToggleCompleted }) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onToggleCompleted={onToggleCompleted}
                />
            ))}
        </ul>
    );
}

export default TodoList;
