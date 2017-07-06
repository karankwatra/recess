module.exports = {
		createUserAccount: function(req, res, next) {

			console.log("got here");
			db = req.app.get('db');
			var validation_errors = false;

			function validateEmail(email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			}
			if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email || !req.body.password1 || !req.body.password2) {
				validation_errors = true;
			} else if (req.body.username.length < 6 || req.body.password1.length < 6) {
				validation_errors = true;
			} else if (req.body.password1 !== req.body.password2) {
				validation_errors = true;
			} else if (!validateEmail(req.body.email)) {
				validation_errors = true;
			}
			console.log(validation_errors);

			if (!validation_errors) {
				db.findExistingUser([req.body.email, req.body.username])
					.then(function(response) {
						if (!response.length) {
							db.createUserAccount([req.body.username, req.body.password1, req.body.email, req.body.firstname, req.body.lastname])
								.then(function(response) {
									console.log("New User", response)
									return res.status(200).json(response[0])
								})
								.catch(err => {
									console.log("Create Error", err)
									return res.status(500).json(err)
								})
						} else {
							var message;
							if (response[0].user_name === req.body.username) {
								message = "Username already exists"
							} else {
								message = "Email already exists"
							}
							return res.status(401).json({
								message: message
							})
						}
					})
			}
	},

	loginUser: function(req, res, next) {

	}
}
