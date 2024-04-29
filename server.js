const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 数据库连接设置
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myNewSecurePassword123', // 替换成你的 MySQL root 用户的密码
    database: 'ToDoApp' // 确保这是你创建的数据库名
});

// 连接数据库
db.connect(err => {
    if (err) {
        console.error('Database connection error: ' + err);
        return;
    }
    console.log('Connected to database');
});

// API 路由
// 获取所有待办事项
app.get('/todos', (req, res) => {
    const sql = `SELECT * FROM Todos`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error fetching todos', error: err });
        }
        res.json(results);
    });
});

// 获取单个待办事项
app.get('/todos/:id', (req, res) => {
    const sql = `SELECT * FROM Todos WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error fetching todo', error: err });
        }
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send({ message: 'Todo not found' });
        }
    });
});

// 创建新的待办事项
app.post('/todos', (req, res) => {
    const { user_id, title, description, is_completed, due_date } = req.body;
    const sql = `INSERT INTO Todos (user_id, title, description, is_completed, due_date) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [user_id, title, description, is_completed, due_date], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error adding new todo', error: err });
        }
        // 查询刚刚插入的待办事项
        const queryNewTodoSql = `SELECT * FROM Todos WHERE id = ?`;
        db.query(queryNewTodoSql, [result.insertId], (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error fetching new todo', error: err });
            }
            // 返回新创建的待办事项数据
            res.status(201).send(results[0]);
        });
    });
});


// 更新待办事项
app.put('/todos/:id', (req, res) => {
    const { title, description, is_completed } = req.body;
    const sql = `UPDATE Todos SET title = ?, description = ?, is_completed = ? WHERE id = ?`;
    db.query(sql, [title, description, is_completed, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error updating todo', error: err });
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Todo not found' });
        } else {
            res.send({ message: 'Todo updated' });
        }
    });
});

// 删除待办事项
app.delete('/todos/:id', (req, res) => {
    const sql = `DELETE FROM Todos WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error deleting todo', error: err });
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Todo not found' });
        } else {
            res.send({ message: 'Todo deleted' });
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


