module.exports = {

	getTeam: function(req, res, next){

		db = req.app.get('db');

			db.findTeam([req.body.name, req.body.password]).then(function(response){
				console.log("not logged in");
				req.session.team = response[0];
				req.session.user = "";
				console.log(req.session.team);
				res.status(200).json(response[0])
			})
	},

	getUserSession: function(req, res, next){
		console.log(req.body);
		if(req.session.team){
			if(req.session.team.team_id === req.body.id){
				res.status(200).json({loggedIn: true});
			}
			else{
				res.status(200).json({loggedIn: false});
			}
		}
		else{
			res.status(200).json({loggedIn: false});
		}
	},

	getTeamLocations: function(req, res, next){
		db = req.app.get('db');

		db.getTeamLocations([req.body.id]).then(function(response){
			res.status(200).json(response);
		})
	},

	getTeamName: function(req, res, next){
		db = req.app.get('db');

		db.getTeamName([req.body.id]).then(function(response){
			res.status(200).json(response[0]);
		})
	},

	addLocation: function(req, res, next){

		db = req.app.get('db');

		db.addLocation([req.body.id, req.body.location_name]).then(function(response){
			res.status(200).json(response)
		})
	},

	checkInOutUser: function(req, res, next){
		db = req.app.get('db');

		console.log(req.body.name, req.body.activeLocation.location_id);
		db.checkInOutUser([req.body.name, req.body.activeLocation.location_id]).then(function(response){
			res.status(200).json(response);
		})
	},

	getCheckIns: function(req, res, next){
		db = req.app.get('db');

		db.getCheckIns([req.body.location_id]).then(function(response){
			res.status(200).json(response);
		})

	},

	reserveLocation: function(req, res, next){

		db = req.app.get('db');

		db.reserveLocation([req.body.reservationTitle, req.body.name, req.body.location_id, req.body.fromTime, req.body.toTime]).then(function(response){
			res.status(200).json(response);
		})
	},

	getReservations: function(req, res, next){
		db = req.app.get('db');

		db.getReservations([req.body.location_id]).then(function(response){
			res.status(200).json(response);
		})
	},

	deleteReservation: function(req, res, next){
		db = req.app.get('db');

		db.deleteReservation([req.body.reservation_id]).then(function(response){
			res.status(200).send("deleted reservation");
		})
	},

	getMessages: function(req, res, next){
		db = req.app.get('db');

		db.getMessages([req.body.location_id]).then(function(response){
			// console.log(response);
			res.status(200).json(response);
		})
	},

	sendMessage: function(req, res, next){
		db = req.app.get('db');

		db.sendMessage([req.body.location_id, req.body.message, req.body.sender]).then(function(response){
			res.status(200).send('sent message')
		})
	},

	getName: function(req, res, next){
		res.status(200).json({user: req.session.user});
	},

	startUserSession: function(req, res, next){
		req.session.user = req.body.name;
		res.status(200).send("user logged in")
	},

	findUser: function(req, res, next){
		db = req.app.get('db');

		db.findUser([req.body.user.username]).then(function(response){
			if(response.length){
				if(req.body.user.password === response[0].user_password){
					response[0].loggedIn = true;
					res.status(200).json(response[0])
				}
				else{
					response[0].loggedIn = false;
					res.status(200).send(response[0])
				}
			}
			else{
				db.createUser([req.body.user.username, req.body.user.password]).then(function(response){
					console.log(response);
					response[0].loggedIn = true;
					res.status(200).send(response[0])
				})
			}
		})
	},

	getAllTeams: function(req, res, next){
		db = req.app.get('db');

		db.getAllTeams().then(function(response){
			res.status(200).send(response);
		})
	},

	createTeam: function(req, res, next){
		db = req.app.get('db');

		db.createTeam([req.body.team.name, req.body.team.password]).then(function(response){
			res.status(200).send('team created');
		})
	}
}
