var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
	companyName: String,
	companyLogo: String,
	companyDescription: String,
	jobTitle: String,
	jobDescription: String
});

module.exports = mongoose.model("Project", projectSchema);