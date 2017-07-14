require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const userAccountCtrl = require('./server/userAccountCtrl')
var teamCtrl = require('./server/teamCtrl')
const massive = require('massive')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');


app.use(express.static(__dirname + '/public'))
app.use(json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// app.post('/api/signup', userAccountCtrl.createUserAccount)
app.post('/api/getTeam', teamCtrl.getTeam);
app.post('/api/getTeamLocations', teamCtrl.getTeamLocations);
app.post('/api/getTeamName', teamCtrl.getTeamName);
app.post('/api/addLocation', teamCtrl.addLocation);
app.post('/api/checkInOutUser', teamCtrl.checkInOutUser);
app.post('/api/getCheckIns', teamCtrl.getCheckIns);
app.post('/api/reserveLocation', teamCtrl.reserveLocation);
app.post('/api/getReservations', teamCtrl.getReservations);
app.post('/api/deleteReservation', teamCtrl.deleteReservation);
app.post('/api/getMessages', teamCtrl.getMessages);
app.post('/api/sendMessage', teamCtrl.sendMessage);
app.post('/api/getUserSession', teamCtrl.getUserSession);
app.get('/api/getName', teamCtrl.getName);
app.post('/api/startUserSession', teamCtrl.startUserSession);
app.post('/api/findUser', teamCtrl.findUser);
app.get('/api/getAllTeams', teamCtrl.getAllTeams);
app.post('/api/createTeam', teamCtrl.createTeam);

massive(process.env.DATABASE_URL)
.then(function(db) {
	app.set('db', db)
	// app.listen(3000, () => {
	// 	console.log("Server is listening; database connected")
	// })

	io.on('connection', function(socket){
  // 		console.log('a user connected');
		socket.on('newMessage', function(msg){
			// console.log('New Message:', msg)
			// console.log(socket.rooms)
			io.to(msg.room).emit('newRoomMessage', msg)
		});

		socket.on('room', function(room){
			// console.log(room)
			if (room.leaving) {
				socket.leave(room.leaving)
			}
			socket.join(room.joining);
			setTimeout(function() {
				// console.log("Rooms: ", socket.rooms)
			}, 1000)
		})
	});


	http.listen(process.env.PORT, function(){
		console.log('listening on :3000');
	})
})
