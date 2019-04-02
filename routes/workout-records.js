const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Workout = require('../models/workout-records-model')
const bodyParser = require('body-parser')


router.use(bodyParser.json())


router.get('/', (req, res) => {

    Workout.find()
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json({"Documents successfully found: ": doc})
            } else {
                res.status(404).json({Error: "No documents found"})
            }
           
                
        })
        .catch(err => res.status(500).json({Error: err}) )
})

router.get('/:id', (req, res) => {

    if (req.params.id) {

        Workout.findById(req.params.id)

            .then(doc => {

                if (doc) {
                    res.status(200).json({"Document successfully found": doc})
                } else {
                    res.status(404).json({ Error: "No document found" })
                }
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({ "Error": "Please provide an ID" })
    }
})


router.post('/', (req, res, next) => {

    if (req.body) {
        const workout = new Workout({
            _id: new mongoose.Types.ObjectId(),
            workout: req.body.workout,

        });
        workout.save()
            .then(doc => {

                if (doc) {
                    res.status(200).json({"Document successfully saved": doc})
                } else {
                    res.status(404).json({ Error: "Error saving document." })
                }
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({ Error: "Please provide a payload in 'workout' and date in 'recordDate' in the request body." })
    }

})


router.put('/:id', (req, res, next) => {
    const payload = req.body
    if(payload && req.params.id) {
        Workout.findByIdAndUpdate(req.params.id, payload)
        .then(doc => {

            if (doc) {
                res.status(200).json({"Document updated successfully": doc})
            } else {
                res.status(404).json({ Error: "Error updating document." })
            }
            
        })
        .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an ID and payload under 'workout' in the request body to update"})
    }
})

router.delete('/:id', (req, res, next) => {

    if (req.params.id) {
        Workout.findByIdAndDelete(req.params.id)
            .then(doc => {

                if (doc) {
                    res.status(200).json({"Document deleted successfully": doc})
                } else {
                    res.status(404).json({ Error: "Error deleting document." })
                }

            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({ "Error": "Please provide an ID in the URL to delete" })
    }
})

module.exports = router