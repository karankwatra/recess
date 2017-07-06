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

massive(config.postgres)
.then(function(db) {
	app.set('db', db)
	app.listen(3000, () => {
		console.log("Server is listening; database connected")
	})
})
