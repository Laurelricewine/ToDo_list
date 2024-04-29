
import './App.css';


import React, { useEffect, useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
function App() {
    const [todos, setTodos] = useState([]);

    // 获取待办事项
    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []); // 空数组确保这个 effect 只在组件加载时运行一次

    const handleAddTodo = (todo) => {
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
        .then(response => response.json())
        .then(data => {
            setTodos([...todos, data]); // Assuming the backend returns the added todo item with an id
        })
        .catch(error => console.error('Error adding todo:', error));
    };
    

    const handleDeleteTodo = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // 这里更新前端状态以反映删除操作
                setTodos(todos.filter(todo => todo.id !== id));
            } else {
                // 如果响应不是成功状态，打印错误信息
                console.error('Failed to delete todo');
            }
        })
        .catch(error => console.error('Error deleting todo:', error));
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

export default App;
