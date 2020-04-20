const express = require('express');
const expressLayout = require('express-ejs-layouts');
const indexRouter = require('./routes/index')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const authorRouter = require('./routes/authors')

//MLABS MONGO DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });



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
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/', indexRouter);
app.use('/authors', authorRouter);


app.listen(process.env.PORT || 3000);