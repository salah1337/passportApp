const express = require('express');
const passport = require('passport')
const bodyparser = require('body-parser')

require('./config/db')
require('./config/passport')

const app = express();
app.use(passport.initialize());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes'))
app.use('/auth', require('./routes/auth'))


const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})