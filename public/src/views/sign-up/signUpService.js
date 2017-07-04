angular.module("app").service("signUpService", function($http){
	this.createAccount = function(user){
		$http.post('/api/signup', user).then(function(res){
			return res;
		})
	}

})
