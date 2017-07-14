angular.module("app").controller("createTeamCtrl", function($scope, $state, createTeamService, findTeamService, $timeout, $compile, uiCalendarConfig) {

	$scope.createTeam = function(team){
		findTeamService.getAllTeams().then(function(response){
			console.log(response, team);
			var taken = false;
			for(var i = 0; i < response.length; i++){
				if(response[i].team_name === team.name){
					taken = true;
					console.log("taken");
					$('.ui.modal.taken')
  					.modal('show')
					;
				}
			}
			if(!taken){
				createTeamService.createTeam(team).then(function(response){
					console.log(response);
					$state.go('home')
				})
			}
		})

	}

})
