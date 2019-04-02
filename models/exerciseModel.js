const mongoose = require('mongoose');
const connection = require('../database/index')

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    _id:  mongoose.Types.ObjectId,
    exerciseName: String,
});

module.exports = mongoose.model('Exercise', exerciseSchema);