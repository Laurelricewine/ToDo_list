
import './App.css';


import React, { useEffect, useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
function App() {
    const [todos, setTodos] = useState([]);

    // 获取待办事项
    useEffect(() => {
        fetch('/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []); // 空数组确保这个 effect 只在组件加载时运行一次

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
