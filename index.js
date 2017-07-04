var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var port = 3000;
var massive = require('massive');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
require('./server/passport')(passport)

var config = require('./server/config');
var userAccountCtrl = require('./server/userAccountCtrl');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", express.static(__dirname + '/public'));

app.post('/api/signup', passport.authenticate('local-signup', {
	successRedirect : '/user', // redirect to the secure profile section
	failureRedirect : '/failure', // redirect back to the signup page if there is an error
	failureFlash : false // allow flash messages
}));
// app.post('/api/signup', userAccountCtrl.createUserAccount);

app.get('/user', function(req, res, next) {
	res.send(req.user)
})
app.get('/failure', function(req, res, next) {
	res.status(401).json({message: "Invalid password or email"})
})

massive(config.postgres).then(function(db) {
	app.set('db', db);
})

app.listen(port, function() {
	console.log('server listening on port', port);
})
