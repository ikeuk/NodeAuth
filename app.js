require('./config/db');
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const app = express()
require('./config/passport')(passport)
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
//Express session middle ware
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes/index'))
app.listen(3000, () => console.log("listening on port 3000"))