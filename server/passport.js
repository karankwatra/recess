var passportLocal = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

	// passport session setup ==================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// used to deserialize the user
	passport.deserializeUser(function(user, done) {
		done(null, user)
	});

	// LOCAL SIGNUP ============================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new passportLocal({
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password1',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function(req, email, password, done) {
			db = req.app.get('db');
			// console.log(db);
			// console.log(req.body);
			db.createUserAccount([req.body.username, req.body.password1, req.body.email,
									req.body.firstname, req.body.lastname])
									.then(function(response){
										return done(null, response)
									})
									.catch(function(err){
										console.log(err);
									})
			// asynchronous
			// User.findOne wont fire unless data is sent back
			process.nextTick(function() {





				// if (email === 'anything@gmail.com' && password == '123') {
				// 	return done(null, {name: "Karan", email: "anything@gmail.com"})
				// } else {
				// 	return done(null, false)
				// }



				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				// User.findOne({
				// 	'local.email': email
				// }, function(err, user) {
				// 	// if there are any errors, return the error
				// 	if (err)
				// 		return done(err);
				//
				// 	// check to see if theres already a user with that email
				// 	if (user) {
				// 		return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				// 	} else {
				//
				// 		// if there is no user with that email
				// 		// create the user
				// 		var newUser = new User();
				//
				// 		// set the user's local credentials
				// 		newUser.local.email = email;
				// 		newUser.local.password = newUser.generateHash(password);
				//
				// 		// save the user
				// 		newUser.save(function(err) {
				// 			if (err)
				// 				throw err;
				// 			return done(null, newUser);
				// 		});
				// 	}
				//
				// });

			});

		}));

};
