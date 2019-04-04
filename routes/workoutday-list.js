const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const WorkoutDayList = require('../models/workoutday-lists-model')
const bodyParser = require('body-parser')


router.use(bodyParser.json())


router.get('/', (req, res) => {

    WorkoutDayList.find()
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({"Documents found successfully": doc})
            } else {
                res.status(404).json({ Error: "Error finding documents." })
            }           
                
        })
        .catch(err => console.log(err))
})

router.get('/:userid', (req, res) => {

    if (req.params.userid) {

        WorkoutDayList.find({"userid": {$eq: req.params.userid}})
            
            .then(doc => {
                if (doc) {
                    res.status(200).json({"Document successfully found": doc})
                } else {
                    res.status(404).json({ Error: "No document found" })
                }
                
               
            })
            .catch(err => console.log(err))
    } else {
        res.status(500).json({"Error": "Please provide an ID"})
    }
})


router.post('/', (req, res, next) => {
    if (req.body.exerciseName && req.body.userid) { 
        const workoutList = new WorkoutDayList({
            _id: new mongoose.Types.ObjectId(),
            userid: req.body.userid,
            exerciseName: req.body.exerciseName
    
        });
        workoutList.save()
            .then(doc => {
                if (doc) {
                    res.status(200).json({"Document successfully saved": doc})
                } else {
                    res.status(404).json({ Error: "Error saving document." })
                }
            })
            .catch(err => console.log(err))
    } else {
        res.status(400).json({ Error: "Please provide a string value in 'exerciseName' in the request body." })
    }
    
})


router.put('/:id', (req, res, next) => {
    const payload = req.body

    if(payload && req.params.id) {
        WorkoutDayList.findByIdAndUpdate(req.params.id, payload)
        .then(doc => {
            if (doc) {
                res.status(200).json({"Document successfully updated": doc})
            } else {
                res.status(404).json({ Error: "Error updating document." })
            }
           
            
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({"Error": "Please provide an ID and payload to update"})
    }
})

router.delete('/:id', (req, res, next) => {
    
    if(req.params.id) {
        WorkoutDayList.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (doc) {
                res.status(200).json({"Document successfully deleted": doc})
            } else {
                res.status(404).json({ Error: "Error deleting document." })
            }
           
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({"Error": "Please provide an ID in the URL to delete"})
    }
})

module.exports = router