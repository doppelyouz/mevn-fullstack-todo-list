const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');

mongoose.connect('mongodb://localhost/MyDataBase', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const todoSchema = new mongoose.Schema({
    todo: String
});

const Todo = mongoose.model('todos', todoSchema);

(async () => {
    app.get('/todos', async (req, res) => { 
        const todos = await Todo.find({});
        if (todos) {
            res.status(200).send(todos);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });
    app.post('/todos', async (req, res) => { 
        const todo = new Todo();
        todo.todo = req.body.todo;
        await todo.save();
        res.status(200).send({ msg: "todo was create" });
    });
    app.delete('/todos/:id', async (req, res) => { 
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            await todo.delete();
            res.status(200).send({ msg: "Todo was remove" });
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
});
