angular.module("app").controller("signUpCtrl", function($scope, $state) {

	$('input:text, .ui.button', '.ui.action.input')
		.on('click', function(e) {
			$('input:file', $(e.target).parents()).click();
		});

	$('input:file', '.ui.action.input')
		.on('change', function(e) {
			var name = e.target.files[0].name;
			$('input:text', $(e.target).parent()).val(name);
			console.log(name);
		});

	$('.ui.form')
		.form({
			fields: {
				firstname: 'empty',
				lastname: 'empty',
				username: 'empty',
				email: 'empty',
				password: ['minLength[6]', 'empty'],
				password2: ['minLength[6]', 'empty']
			}
		});

	$('.ui.form')
		.form({
			fields: {
				firstname: {
					identifier: 'firstname',
					rules: [{
						type: 'empty',
						prompt: 'Please enter your first name'
					}]
				},

				lastname: {
					identifier: 'lastname',
					rules: [{
						type: 'empty',
						prompt: 'Please enter your last name'
					}]
				},
				username: {
					identifier: 'username',
					rules: [{
							type: 'empty',
							prompt: 'Please enter a username'
						},
						{
							type: 'minLength[6]',
							prompt: 'Your username must be at least {ruleValue} characters'
						}
					]
				},
				email: {
					identifier: 'email',
					rules: [{
							type: 'empty',
							prompt: 'Please enter an email'
						},
						{
							type: 'email',
							prompt: 'Please enter a valid e-mail'
						}
					]
				},
				password: {
					identifier: 'password',
					rules: [{
							type: 'empty',
							prompt: 'Please enter a password'
						},
						{
							type: 'minLength[6]',
							prompt: 'Your password must be at least {ruleValue} characters'
						}
					]
				},
				password2: {
					identifier: 'password2',
					rules: [{
							type: 'empty',
							prompt: 'Please confirm your password'
						},
						{
							type: 'minLength[6]',
							prompt: 'Your password must be at least {ruleValue} characters'
						},
						{
							type: 'match[password]',
							prompt: 'Your passwords must match'
						}
					]
				},
			}
		});


})
