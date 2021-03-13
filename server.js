require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts');
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
var MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 3000

//Databse Connection
const url = 'mongodb://localhost/pizza'

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

var store = new MongoDBStore({
    uri: 'mongodb://localhost/pizza',
    collection: 'mySessions'
  });



//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hrs
}))

//Flash
app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.json())

//Global middleware
app.use((req,res,next) => {
    res.locals.session = req.session
    next()
})

//Set template Engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)

app.listen(3000,() => {
    console.log(`Server is listening at ${PORT}`);
})