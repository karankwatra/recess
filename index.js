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

var validator = require('express-validator');
require('./server/passport')(passport)

var config = require('./server/config');
var userAccountCtrl = require('./server/userAccountCtrl');
var teamCtrl = require('./server/teamCtrl');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
// app.use(validator());
massive(config.postgres).then(function(db) {
	app.set('db', db);
})

// app.post('/api/signup', passport.authenticate('local-signup'), function(req, res, next) {
// 	res.redirect('http://localhost:3000/#!/')
// })
// app.post('/api/signup', userAccountCtrl.createUserAccount);
// app.get('/users/:id', function(req, res, next) {
// 	console.log(req.params.id)
// 	return res.send(req.user)
// })


app.listen(port, function() {
	console.log('server listening on port', port);
})
