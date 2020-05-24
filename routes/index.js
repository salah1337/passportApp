const express = require('express');
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('home.ejs')
  })
  
router.get('/login', (req, res)=>{
    res.send('<a href="/auth/github">go</a>')
})

module.exports = router