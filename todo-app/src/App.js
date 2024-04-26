
import './App.css';


import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
function App() {
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (todo) => {
        setTodos([...todos, { ...todo, id: Date.now() }]);
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleToggleCompleted = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, is_completed: !todo.is_completed };
            }
            return todo;
        }));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <AddTodoForm onAddTodo={handleAddTodo} />
            <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onToggleCompleted={handleToggleCompleted} />
        </div>
    );
}

//export default App;


export default App;
