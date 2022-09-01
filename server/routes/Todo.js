const todoModel = require('../models/todoModel')

const PostTodo = async (req, res) => {
    const { taskname, status, tag } = req.body;
    var blog = await todoModel.create(req.body)
    console.log(blog)
    res.send({message:'Todo Created Successfully'})
}

const GetTodo = async(req, res) => {
    var blog = await todoModel.find()
    console.log(blog)
    res.send(blog)
}

module.exports = { PostTodo, GetTodo }

