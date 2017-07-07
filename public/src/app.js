angular.module("app", ['ui.router'])

	.run(function() {
		console.log("app running");
	})

	.config(function($urlRouterProvider, $stateProvider, $qProvider) {

		$qProvider.errorOnUnhandledRejections(false);

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
							console.log(homeService.isLoggedIn())
							if (homeService.isLoggedIn() && homeService.loggedInTeam == $stateParams.id) {
								resolve(true)
							} else {
								$state.go('home')
								// reject(false)
							}
						})
						return promise
					}
				}
			})
	})
