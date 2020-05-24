const express = require('express');
const passport = require('passport')


require('./config/db')
require('./config/passport')

const app = express();
app.use(passport.initialize());





app.use('/', require('./routes'))
app.use('/auth', require('./routes/auth'))


const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})