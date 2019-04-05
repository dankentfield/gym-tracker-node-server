const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Exercise = require('../models/exerciseModel')
const bodyParser = require('body-parser')


router.use(bodyParser.json())


router.get('/', (req, res) => {

    Exercise.find()
        .exec()
        .then(doc => {

            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ Error: "Error finding document(s)." })
            }
           
                
        })
        .catch(err => res.status(500).json({Error: err}) )
})

router.get('/:id', (req, res) => {

    if (req.params.id) {

        Exercise.findById(req.params.id)
            
            .then(doc => {

                if (doc) {
                    res.status(200).json(doc)
                } else {
                    res.status(404).json({ Error: "Error finding document(s)." })
                }
                
               
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an ID"})
    }
})


router.post('/', (req, res, next) => {

    if(req.body.exerciseName && req.body.imageUrl) {
        const exercise = new Exercise({
            _id: new mongoose.Types.ObjectId(),
            id: req.body.id,
            exerciseName: req.body.exerciseName,
            imageUrl: req.body.imageUrl
    
        });
        exercise.save()
            .then(doc => {
                if (doc) {
                    res.status(200).json({"Document sent successfully": doc})
                } else {
                    res.status(404).json({ Error: "Error posting document." })
                }
                
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an exercise name in the body under 'exerciseName' to make a post request."})
    }
    
})


router.put('/:id', (req, res, next) => {

    if(req.params.id && req.body) {
        const payload = req.body
        if(payload && req.params.id) {
            Exercise.findByIdAndUpdate(req.params.id, payload)
            .then(doc => {

                if (doc) {
                    res.status(200).json({"Document updated successfully": doc})
                } else {
                    res.status(404).json({ Error: "Error updating document." })
                }
                
                
            })
            .catch(err => res.status(500).json({Error: err}) )
        } else {
            res.status(400).json({"Error": "Please provide an ID and payload to update"})
        }
    } else {
        res.status(400).json({"Error": "Please provide an ID AND exercise name in the body under 'exerciseName' to update."})
    }

    
})

router.delete('/:id', (req, res, next) => {
    
    
    if(req.params.id) {
        Exercise.findByIdAndDelete(req.params.id)
        .then(doc => {

            if (doc) {
                res.status(200).json({"Document deleted successfully": doc})
            } else {
                res.status(404).json({ Error: "Error deleting document." })
            }
           
           
        })
        .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an ID in the URL to delete"})
    }
})

module.exports = router