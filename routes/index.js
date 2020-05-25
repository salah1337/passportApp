const express = require('express');
const router = express.Router()
var User = require('../models/User')

const data = require('../config/data')

router.get('/', (req, res)=>{
    if ( req.params.id ){
        User.findById(req.params.id)
        .then(user => {
            return res.render('profile', { user })
        })
    }
    res.render('home', { data })
  })
router.get('/:id', (req, res)=>{
    if ( req.params.id ){
        User.findById(req.params.id)
        .then(user => {
            return res.render('profile', { user })
        })
    }
  })

router.get('/login', (req, res)=>{
    res.send('Fail')
})

module.exports = router