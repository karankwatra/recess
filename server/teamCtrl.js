module.exports = {

	getTeam: function(req, res, next){

		db = req.app.get('db');

		db.findTeam([req.body.name, req.body.password]).then(function(response){
			res.status(200).json(response[0])
		})
	}



}
