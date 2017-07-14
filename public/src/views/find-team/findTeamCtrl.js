angular.module("app").controller("findTeamCtrl", function($scope, $state, findTeamService, $timeout, $compile, uiCalendarConfig) {

	findTeamService.getAllTeams().then(function(response){
		$scope.teams = response; 
	})


})
