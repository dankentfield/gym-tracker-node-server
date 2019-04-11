const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/userModel')
const bodyParser = require('body-parser')


router.use(bodyParser.json())

router.get('/:id', (req, res) => {

    if (req.params.id) {

        User.findById(req.params.id)
            
            .then(doc => {

                if (doc) {
                    res.status(200).json(true)
                } else {
                    res.status(404).json({ Error: "Error finding user(s)." })
                }
                
               
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an ID"})
    }
})

router.get('/email/:email', (req, res) => {

    if (req.params.email) {

        User.find( { email: { $eq: req.params.email } } )
            
            .then(doc => {

                if (doc[0].email === req,params.email) {
                    res.status(200).json(true)
                } else {
                    res.status(200).json(false)
                }
                
               
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an ID"})
    }
})


router.post('/', (req, res, next) => {

    if(req.body.email && req.body.password) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password
    
        });
        user.save()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc._id)
                } else {
                    res.status(404).json({ Error: "Error creating user." })
                }
                
            })
            .catch(err => res.status(500).json({Error: err}) )
    } else {
        res.status(400).json({"Error": "Please provide an email and password in the body to make a post request."})
    }
    
})




module.exports = router