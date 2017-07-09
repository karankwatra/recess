const express = require('express')
const {json} = require('body-parser')
const userAccountCtrl = require('./server/userAccountCtrl')
var teamCtrl = require('./server/teamCtrl')
const massive = require('massive')
const config = require('./server/config')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(json())

// app.post('/api/signup', userAccountCtrl.createUserAccount)
app.post('/api/getTeam', teamCtrl.getTeam);
app.post('/api/getTeamLocations', teamCtrl.getTeamLocations);
app.post('/api/getTeamName', teamCtrl.getTeamName);
app.post('/api/addLocation', teamCtrl.addLocation);
app.post('/api/checkInOutUser', teamCtrl.checkInOutUser);
app.post('/api/getCheckIns', teamCtrl.getCheckIns);
app.post('/api/reserveLocation', teamCtrl.reserveLocation); 

massive(config.postgres)
.then(function(db) {
	app.set('db', db)
	app.listen(3000, () => {
		console.log("Server is listening; database connected")
	})
})
