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
	}



}
