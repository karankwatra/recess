angular.module("app", ['ui.router'])

.run(function(){
	console.log("app running");
})

.config(function($urlRouterProvider, $stateProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state("home", {
			url:"/",
			templateUrl: './src/views/home/home.html',
			controller: "homeCtrl"
		})
		.state("sign-up", {
			url:"/sign-up",
			templateUrl: './src/views/sign-up/sign-up.html',
			controller: "signUpCtrl"
		})

})
