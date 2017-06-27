var User = require('./models/user');

//exportant a function do routes, passando app como parâmetro
module.exports = function(app){
	app.get('/', function(req, res){
		res.send("Hello World");
	});

	app.get('/:username/:password', function(req, res){
		var newUser = new User();
		console.log(req.params.username);
		newUser.local.username = req.params.username;
		newUser.local.password = req.params.password;
		console.log(newUser.local.username + " " + newUser.local.password);
		newUser.save(function(err){
			if(err)
				throw err;
		});
		res.send("Success")
	})
}