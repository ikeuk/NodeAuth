const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../models/User')


router.get("/", (req, res) => {
	res.render("index.ejs")
})
router.get("/login", (req, res) => {
		res.render("login")
})
// router.post("/login", (req, res) => {
// 		console.log(req.body)
// })

//admin login POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register'
    })(req, res, next)
}) 



router.get("/register", (req, res) => {
		res.render("register")
})

router.post("/register", (req, res) => {
	const {name, email, password } = req.body
	User.findOne({email: email })
	.then(user => {
		if(user){
			res.render('register')
		} else {
			const newUser = new User({
				name,
				email,
				password
			})
			
			bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) =>{
			if(err) throw err
				newUser.password = hash
				newUser.save()
				.then(user => {
					res.redirect('/login')
				})
				.catch(err => console(err))
			}))
		}
	})
})
module.exports = router