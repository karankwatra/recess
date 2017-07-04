module.exports = {
	createUserAccount: function(req, res, next){
		console.log(req.body);
		res.status(200).json({reached: "here"});
	}
}
