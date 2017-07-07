module.exports = {

	getTeam: function(req, res, next){

		db = req.app.get('db');

		db.findTeam([req.body.name, req.body.password]).then(function(response){
			res.status(200).json(response[0])
		})
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

		var time = new Date().getTimezoneOffset();
		console.log(time)

		console.log(req.body);

		res.status(200).send("hello")
	},

	getCheckIns: function(req, res, next){
		db = req.app.get('db');

		db.getCheckIns([req.body.location_id]).then(function(response){
			res.status(200).json(response);
		})

	}



}
