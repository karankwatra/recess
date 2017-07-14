angular.module("app", ['ui.router', 'ui.calendar'])

	.run(function() {
		console.log("app running");
	})

	.config(function($urlRouterProvider, $stateProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: './src/views/home/home.html',
				controller: "homeCtrl"
			})
			.state("sign-up", {
				url: "/sign-up",
				templateUrl: './src/views/sign-up/sign-up.html',
				controller: "signUpCtrl"
			})
			.state("team", {
				url: "/team/:id",
				templateUrl: './src/views/team/team.html',
				controller: "teamCtrl",
				resolve: {
					isLoggedIn: function(homeService, $state, $stateParams) {
						var promise = new Promise(function(resolve, reject) {
							var id = $stateParams.id;
							console.log(homeService.isLoggedIn(id))
							homeService.isLoggedIn($stateParams.id).then(function(response){
								if(response.data.loggedIn){
									resolve(true)
								}
								else{
									$state.go('home')
								}
							})
						})
						return promise
					}
				}
			})
			.state("find-team", {
				url:"/find-team",
				templateUrl: './src/views/find-team/find-team.html',
				controller: "findTeamCtrl"
			})
			.state("create-team", {
				url:"/create-team",
				templateUrl: './src/views/create-team/create-team.html',
				controller: "createTeamCtrl"
			})
	})
