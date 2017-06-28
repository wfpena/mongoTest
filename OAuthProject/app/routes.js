var User = require('./models/user');

//exportant a function do routes, passando app como parâmetro
module.exports = function(app, passport){
	app.get('/', function(req, res){
		//console.log('Success');
		//res.end('SS');
		res.render('index.ejs');
	});

	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect: '/',//if success take them back to the homepage
		failureRedirect: '/signup',
		failureFlash: true//if there was a failure, expect a request flash msg back
	}));
		//function(req, res){
		// var newUser = new User();

		// //Aqui o middleware body-parser é usado, pra acessar o post do user
		// //com o valor email e password, definidos no html
		// newUser.local.username = req.body.email;
		// newUser.local.password = req.body.password;
		// newUser.save(function(err){
		// 	if(err)
		// 		throw err;
		// });

		// res.redirect('/');
	//});

	app.get('/:username/:password', function(req, res){
		var newUser = new User();
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