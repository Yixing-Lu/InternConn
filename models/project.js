var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
	name: String,
	img: String,
	description: String,
	author: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
	},
	companyUrl: String,
	jobTitle: String,
	jobRequriement: String
});

module.exports = mongoose.model("Project", projectSchema);