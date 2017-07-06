angular.module("app").controller("homeCtrl", function($scope, $state, $stateParams, homeService){
	$scope.signInTeam = function(team){
		homeService.signInTeam(team).then(function(response){
			if(response.data){
				$state.go('team', {id: response.data.team_id})
			}
		});
	}
})
