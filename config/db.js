const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://samhyde:mgtow1337@cluster0-yxb9t.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB succesfully connected'))
.catch(err => console.log(err))
