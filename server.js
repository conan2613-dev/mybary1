const express = require('express');
const expressLayout = require('express-ejs-layouts');
const indexRouter = require('./routes/index')
const mongoose = require('mongoose');

//MLABS MONGO DB
mongoose.connect('mongodb+srv://sagar:sagar12345@myfirstmongodb-tldsv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
});

db.once('open', () => {
    console.log('Connected to database')
})


const app = express();

app.set('view engine', 'ejs')

app.set('views', './views')
app.set('layout', 'layouts/layout')
app.use(expressLayout);
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);