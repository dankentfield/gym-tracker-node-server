const mongoose = require('mongoose');
const connection = require('../database/index')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:  mongoose.Types.ObjectId,
    email: String,
    password: String
});

module.exports = mongoose.model('users', userSchema);