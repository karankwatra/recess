angular.module("app").controller("teamCtrl", function($scope, $state, teamService) {

	$('#enter-name-modal')
		.modal({
			blurring: true
		})
		.modal('show');

	$(document).ready(function() {
		$('.team-nav-buttons').on('click', function() {
			$('.team-nav-buttons').removeClass('active');
			$(this).addClass('active');
		});
	});

	$scope.id = $state.params.id;
	$scope.name = "";

	teamService.getTeamName($scope.id).then(function(response) {
		$scope.teamName = response.team_name;
	})

	teamService.getTeamLocations($scope.id).then(function(response) {
		$scope.locations = response;
		$scope.locationName = response[0].location_name;
		$scope.activeLocation = response[0];
		teamService.getCheckIns(response[0].location_id).then(function(response){
			$scope.checkIns = response.data; 
		})
	});


	$scope.getName = function(name) {
		$scope.name = name;
	}

	$scope.changeLocation = function(location) {
		$scope.activeLocation = location;
		$scope.locationName = location.location_name;
		teamService.getCheckIns(location.location_id).then(function(response){
			$scope.checkIns = response.data;
			console.log($scope.checkIns);
		});
	}

	$scope.triggerLocationModal = function(){
		$('#enter-location-modal')
			.modal({
				blurring: true
			})
			.modal('show');
	}

	$scope.addLocation = function(location_name){
		teamService.addLocation(location_name, $scope.id).then(function(response){
			teamService.getTeamLocations($scope.id).then(function(response){
				$scope.locations = response;
			})
		});
	}

	$scope.checkInOutUser = function(){
		teamService.checkInOutUser($scope.id, $scope.activeLocation, $scope.name);
	}



})
