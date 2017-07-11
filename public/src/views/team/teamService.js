angular.module("app").service("teamService", function($http){

	this.getTeamLocations = function(id){
		console.log(parseInt(id));
		return $http.post('/api/getTeamLocations', {id: parseInt(id)}).then(function(response){
			return response.data;
		})
	}

	this.getTeamName = function(id){
		return $http.post('/api/getTeamName', {id: parseInt(id)}).then(function(response){
			return response.data;
		})
	}

	this.addLocation = function(location_name, id){
		return $http.post('/api/addLocation', {location_name: location_name, id: parseInt(id)}).then(function(response){
			return response;
		})
	}

	this.checkInOutUser = function(id, activeLocation, name){
		return $http.post('/api/checkInOutUser', {id: parseInt(id), activeLocation: activeLocation, name: name}).then(function(response){
			return response;
		})
	}

	this.getCheckIns = function(location_id){
		return $http.post('/api/getCheckIns', {location_id, location_id}).then(function(response){
			for(var i = 0; i < response.data.length; i++){
				response.data[i].from_time = moment(response.data[i].from_time).tz(moment.tz.guess()).calendar();
			}
			return response;
		})
	}

	this.reserveLocation = function(reservationTitle, name, location_id, fromTime, toTime){

		return $http.post('/api/reserveLocation', {reservationTitle, name, location_id, fromTime, toTime}).then(function(response){
			return response;
		})

		console.log(reservationTitle, name, fromTime, toTime);
	}

	this.getReservations = function(location_id){
		return $http.post('/api/getReservations', {location_id: location_id}).then(function(response){
			for(var i = 0; i < response.data.length; i++){
				response.data[i].from_time = moment(response.data[i].from_time).tz(moment.tz.guess()).format();
				response.data[i].to_time = moment(response.data[i].to_time).tz(moment.tz.guess()).format();
			}
			return response.data;
		})
	}

})
