angular.module("app").controller("signUpCtrl", function($scope, $state, signUpService) {

	// $('input:text, .ui.button', '.ui.action.input')
	// 	.on('click', function(e) {
	// 		$('input:file', $(e.target).parents()).click();
	// 	});
	//
	// $('input:file', '.ui.action.input')
	// 	.on('change', function(e) {
	// 		var name = e.target.files[0].name;
	// 		$('input:text', $(e.target).parent()).val(name);
	// 		console.log(name);
	// 	});
	//
	// $scope.createAccount = function(user){
	// 	signUpService.createAccount(user)
	// 	.then(function(response) {
	// 		console.log(response);
	// 		if(response.status === 200){
	// 			$state.go('home')
	// 		}
	// 		else{
	// 			$route.reload(); wqe;;;
	// 			// $scope.errors = "errors";
	// 			// $state.go('sign-up')
	// 		}
	// 	})
	// 	// 	$scope.user = response.data
	// 	// 	console.log("Success")
	// 	// 	$state.go('home')
	// 	// })
	// 	// .catch(function(err) {
	// 	// 	console.log("Error", err)
	// 	// 	$scope.errors = err
	// 	// })
	// }

	//
	// $('.ui.form')
	// 	.form({
	// 		fields: {
	// 			firstname: 'empty',
	// 			lastname: 'empty',
	// 			username: 'empty',
	// 			email: 'empty',
	// 			password: ['minLength[6]', 'empty'],
	// 			password2: ['minLength[6]', 'empty']
	// 		}
	// 	});
	//
	// $('.ui.form')
	// 	.form({
	// 		fields: {
	// 			firstname: {
	// 				identifier: 'firstname',
	// 				rules: [{
	// 					type: 'empty',
	// 					prompt: 'Please enter your first name'
	// 				}]
	// 			},
	//
	// 			lastname: {
	// 				identifier: 'lastname',
	// 				rules: [{
	// 					type: 'empty',
	// 					prompt: 'Please enter your last name'
	// 				}]
	// 			},
	// 			username: {
	// 				identifier: 'username',
	// 				rules: [{
	// 						type: 'empty',
	// 						prompt: 'Please enter a username'
	// 					},
	// 					{
	// 						type: 'minLength[6]',
	// 						prompt: 'Your username must be at least {ruleValue} characters'
	// 					}
	// 				]
	// 			},
	// 			email: {
	// 				identifier: 'email',
	// 				rules: [{
	// 						type: 'empty',
	// 						prompt: 'Please enter an email'
	// 					},
	// 					{
	// 						type: 'email',
	// 						prompt: 'Please enter a valid e-mail'
	// 					}
	// 				]
	// 			},
	// 			password: {
	// 				identifier: 'password',
	// 				rules: [{
	// 						type: 'empty',
	// 						prompt: 'Please enter a password'
	// 					},
	// 					{
	// 						type: 'minLength[6]',
	// 						prompt: 'Your password must be at least {ruleValue} characters'
	// 					}
	// 				]
	// 			},
	// 			password2: {
	// 				identifier: 'password2',
	// 				rules: [{
	// 						type: 'empty',
	// 						prompt: 'Please confirm your password'
	// 					},
	// 					{
	// 						type: 'minLength[6]',
	// 						prompt: 'Your password must be at least {ruleValue} characters'
	// 					},
	// 					{
	// 						type: 'match[password]',
	// 						prompt: 'Your passwords must match'
	// 					}
	// 				]
	// 			},
	// 		}
	// 	});


})
