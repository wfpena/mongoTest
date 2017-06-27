var mongoose = require('mongoose');//requiring mongoose module

//creating mongoose schema
var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	}
});

//exporting this schema, to use it on other files
module.exports = mongoose.model('User', userSchema);