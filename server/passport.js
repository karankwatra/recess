var passportLocal = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

		// passport session setup ==================================================
		// required for persistent login sessions
		// passport needs ability to serialize and unserialize users out of session

		// used to serialize the user for the session
		passport.serializeUser(function(user, done) {
			return done(null, user);
		});

		// used to deserialize the user
		passport.deserializeUser(function(user, done) {
			return done(null, user)
		});

		// LOCAL SIGNUP ============================================================
		// we are using named strategies since we have one for login and one for signup
		// by default, if there was no name, it would just be called 'local'

		passport.use('local-signup', new passportLocal({
					// by default, local strategy uses username and password, we will override with email
					usernameField: 'username',
					passwordField: 'password1',
					passReqToCallback: true // allows us to pass back the entire request to the callback
				},
				function(req, email, password, done) {
					// process.nextTick(function() {

							// return done(null, {email, password})
							db = req.app.get('db');
							console.log(db)
							//validate create account form
							// req.checkBody("firstname", "Enter a first name").notEmpty();
							// req.checkBody("lastname", "Enter a last name").notEmpty();
							// req.checkBody("username", "Enter a valid username").notEmpty().len(6);
							// req.checkBody("email", "Enter a valid email address.").notEmpty().isEmail();
							// req.checkBody("password1", "Enter a valid password").notEmpty().matches(req.body.password2).len(6);
							//
							// var errors = req.validationErrors();
							// if (errors) {
							// 	console.log(errors)
							// 	return done(errors);
							// } else {


								db.findExistingUser([req.body.email, req.body.username])
									.then(function(response) {
										console.log(response)
										console.log(req.params);
										// return done(null, {email, password})
										if (!response.length) {
											db.createUserAccount([req.body.username, req.body.password1, req.body.email, req.body.firstname, req.body.lastname])
												.then(function(response) {
													console.log("New User", response)
													return done(null, response[0])
												})
												.catch(err => {
													console.log("Create Error", err)
													return done(err, false)
												})
										} else {
											console.log("Here")
											var message;
											if (response[0].user_name === req.body.username) {
												message = "Username already exists"
											} else {
												message = "Email already exists"
											}
											return done(null, false, {message: message})
										}
									})
								// }
								// .catch(function(err) {
								// 	console.log(err)
								// 	return done(null, {email, password})
								// })
								// db.findExistingUser([req.body.email, req.body.username]).then(function(response) {
								// 	if (response.length > 0) {
								// 		return done(null, false, {'signupMessage': 'That email is already taken.'});
								// 	} else {
								// 		console.log("success");
								// 		db.createUserAccount([req.body.username, req.body.password1, req.body.email,
								// 				req.body.firstname, req.body.lastname
								// 			])
								// 			.then(function(response) {
								// 			console.log("User created", response[0])
								// 				return done(null, response[0])
								// 			})
								// 	}
								// })
								// }
								// })
							// })
					}));

		};
