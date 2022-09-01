const { Schema, model } = require('mongoose');
const todoSchema = new Schema({
    taskname: { type: String, required: true },
    status: { 
        type: String,
        required: true 
    },
    tag:{
        type:String,
        enum: [ 'Personal', 'Official', 'Family' ],
        required: true
    },
    email: String
})

const todoModel = model("todo", todoSchema);
module.exports = todoModel;
