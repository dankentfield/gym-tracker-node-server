const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutDayListSchema = new Schema({
    _id:  mongoose.Types.ObjectId,
    userid: Number,
    workout: [Object],

});

module.exports = mongoose.model('workoutDayList', workoutDayListSchema);