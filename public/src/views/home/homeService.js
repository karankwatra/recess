angular.module("app").service("homeService", function($http){
	this.signInTeam = function(team){
		return $http.post('/api/getTeam', team).then(function(response){
			return response;
		})
	}

})
