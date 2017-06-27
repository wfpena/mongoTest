var express = require('express');
var app = express();
var port = process.env.PORT || 8080;//use port or 8080

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
/*while(mongoose.connection.readyState ==2){
	console.log(mongoose.connection.readyState);
}
*/

app.use(morgan('dev'));//use morgan as middelware(gohere before the actual app), to log
app.use(cookieParser());
app.use(session({secret: 'anystringtext',
				saveUninitializad: true,
				resave: true}));



/*app.use('/', function(req, res){
	res.send('Our First Express program');
	console.log(req.cookies);
	console.log('--------------');
	console.log(req.session);
});*/

require('./app/routes.js')(app);

app.listen(port);
console.log('server running on port: ' + port);


