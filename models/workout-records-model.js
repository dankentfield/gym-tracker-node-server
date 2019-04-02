const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutRecordSchema = new Schema({
    _id:  mongoose.Types.ObjectId,
    recordDate: Date,
    workout: [Object],


});

module.exports = mongoose.model('workoutRecords', workoutRecordSchema);
