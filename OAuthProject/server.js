var express = require('express');
var app = express();
var port = process.env.PORT || 8080;//use port or 8080

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//body-parser funciona como middleware entre o server e o browser
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

/*while(mongoose.connection.readyState ==2){
	console.log(mongoose.connection.readyState);
}
*/

app.use(morgan('dev'));//use morgan as middelware(gohere before the actual app), to log
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'anystringoftext',
				saveUninitializad: true,
				resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');


/*app.use('/', function(req, res){
	res.send('Our First Express program');
	console.log(req.cookies);
	console.log('--------------');
	console.log(req.session);
});*/



require('./app/routes.js')(app, passport);
//isso é o mesmo que:
//var func = require('./app/routes.js');
//func(app);
//adicionou o passport também, depois


app.listen(port);
console.log('server running on port: ' + port);


