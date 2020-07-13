var express = require("express")
var router = express.Router();
var Project = require("../models/project");
var middleware = require("../middleware");

router.get("/",function(req,res){
	// get all projects from DB
	Project.find({},function(err,allProjects){
		if (err) {
			console.log(err)
		} else {
			// res.render("../views/landing", {projects:allProjects});
			res.render("projects/index", {projects:allProjects});
		}
	})
});

// create: add new project to DB
router.post("/", middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var dsc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var companyUrl = req.body.companyUrl
	var jobTitle = req.body.jobTitle
	var jobRequriement = req.body.jobRequriement

	var newProject = {
		name:name, 
		img:image, 
		description:dsc, 
		author:author,
		companyUrl: companyUrl,
		jobTitle: jobTitle,
		jobRequriement: jobRequriement
	};
	// create a new project and save to DB
	Project.create(newProject, function(err, newCreatProject){
		if (err) {
			console.log(err);
		} else {
			// redirect back to projects page
			res.redirect("/projects");
		}
	})
	
})

// New: show form to create new project
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("projects/new")
})

// Show: show more info about the project
router.get("/:id",function(req,res){
	// find the project with ID
	Project.findById(req.params.id,function(err, foundProject){
		if (err) {
			console.log(err);
		} else {
			// render show template with that project
			res.render("projects/show", {project: foundProject})
		}
	})
	
})

// Edit project route
router.get("/:id/edit",middleware.checkProjectOwnership, function(req,res){
	Project.findById(req.params.id,function(err, foundProject){
		res.render("projects/edit",{project: foundProject})
	})	
})
// Update project route
router.put("/:id",middleware.checkProjectOwnership,function(req,res){
	// find and update the correct project
	Project.findByIdAndUpdate(req.params.id, req.body.project, function(err,updatedProject){
		if (err) {
			res.redirect("/projects")
		} else {
			res.redirect("/projects/" + req.params.id)
		}
	})
	
})

// Destroy project route
router.delete("/:id",middleware.checkProjectOwnership,function(req,res){
	Project.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect("/projects")
		} else {
			res.redirect("/projects")
		}
	})
})

module.exports = router

