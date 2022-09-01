const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String }
}, { timestamps: true });

const userDetails = model('userDetail', userSchema);
module.exports = userDetails;

