var express = require("express")
var router = express.Router();
var Project = require("../models/project");
var passport = require("passport")
var User = require("../models/user")

// root route
router.get("/",function(req,res){
	// get all projects from DB
	Project.find({},function(err,allProjects){
		if (err) {
			console.log(err)
		} else {
			res.render("landing", {projects:allProjects});
		}
	})
})


// root route
router.get("/about",function(req,res){
	res.render("about");
})

// show register form
router.get("/register",function(req,res){
	res.render("register")
})

// handle sign up logic
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username, email: req.body.username})
	User.register(newUser, req.body.password,function(err,user){
		if(err) {
			return res.render("register", {"error":err.message})
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to InternConn " + user.username)
			res.redirect("/projects")
		})
	})
})

// show login form
router.get("/login",function(req,res){
	res.render("login")
})

// handling login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/projects",
	failureRedirect: "/login"
	}),function(req,res){
	
})

// logout route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out!")
	res.redirect("/projects")
})


module.exports = router

