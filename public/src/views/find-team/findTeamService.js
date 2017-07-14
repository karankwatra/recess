angular.module("app").service("findTeamService", function($http){

	this.getAllTeams = function(){
		return $http.get('/api/getAllTeams').then(function(response){
			return response.data;
		})
	}


})
