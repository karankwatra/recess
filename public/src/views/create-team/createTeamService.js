angular.module("app").service("createTeamService", function($http){

	this.createTeam = function(team){
		return $http.post('/api/createTeam', {team: team}).then(function(response){
			return response; 
		})
	}

})
