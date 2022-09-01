const { Router } = require('express')
const routes = Router();
const todoModel = require('../models/todoModel')
const { userRegistration, userLogin } = require('./userAuth')
const { GetTodo, PostTodo, DeleteTodo } = require('./Todo')

routes.post('/login', userLogin)
routes.post('/signup', userRegistration);
routes.get('/todos', GetTodo)
routes.get("/todos/:todoID", async (req, res) => {
    const userId = req.params.userId
    const tasks = await todoModel.find({ userId })
    res.send(tasks)
})
routes.post('/todos/create', PostTodo)
routes.patch("/todos/edit/:todoID", async (req, res) => {
    // res.send(req.body);
    try {
        await todoModel.findOneAndUpdate({ _id: req.params.todoID }, req.body)
            .lean()
            .exec();
        const task = await todoModel.findOne({ _id: req.params.todoID });
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
routes.post('/todos/delete/:todoID', async (req, res) => {
    console.log('param', req.params)
    await todoModel.deleteOne({ _id: req.params.todoID });
    res.send(`Successfully delete todo with id ${req.params.todoID}`)
})




module.exports = routes

// - /login
// - /signup
// - /todos - to get all todos
// - /todos?status=pending
// - /todos?status=done&tag=personal  —> and all similar combinations
// - /todos/:todoID - to get a specific todo with ID
// - /todos/create - to create a todo
// - /todos/edit/:todoID - to edit a specific todo
// - /todos/delete/:todoID - to delete a specific todo 
