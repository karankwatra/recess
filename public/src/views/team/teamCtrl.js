angular.module("app").controller("teamCtrl", function($scope, $state){
	console.log($state.params.id);
	$scope.id = $state.params.id; 
})
