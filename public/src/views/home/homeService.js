angular.module("app").service("homeService", function($http){
	var self = this
	this.loggedIn = false;
	this.loggedInTeam = null;

	this.signInTeam = function(team){
		return $http.post('/api/getTeam', team).then(function(response){
			if(response){
				console.log(response);
				self.loggedIn = true;
				self.loggedInTeam = response.data.team_id; 
				return response;
			}
		})
	}
	this.isLoggedIn = function(){
		console.log(self.loggedIn);
		return self.loggedIn;
	}

})
