var Project = require("../models/project")

// all the middlware goes here
var middlewareObj = {}

middlewareObj.checkProjectOwnership = function(req,res,next){
	// is user logged in
	if (req.isAuthenticated()) {
		Project.findById(req.params.id,function(err, foundCampground){
			if (err) {
				req.flash("error","Project not found");
				res.redirect("back")
			} else {
				// does user own the camp?
				// foundCampground.author.id is Object
				// req.user._id is String
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error","You don't have permission to do that");
					res.redirect("back")
				}
			}
		})
	} else {
		req.flash("error","You need to be logged in to do that");
		res.redirect("back")
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that")
	res.redirect("/login")
}


module.exports = middlewareObj