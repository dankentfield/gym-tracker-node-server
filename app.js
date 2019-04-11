const express = require('express');
const app = express();

const exercises = require('./routes/exercise.js')
const workoutDayList = require('./routes/workoutday-list')
const workoutRecord = require('./routes/workout-records')
const user = require('./routes/user.js')
const port = 3000;


app.use('/exercise/', exercises)
app.use('/workout-list/', workoutDayList)
app.use('/workout/', workoutRecord)
app.use('/user/', user)



app.listen(port, () => {
    console.log(`Connected to server on port ${port}`)
})