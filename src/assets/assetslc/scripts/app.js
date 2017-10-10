'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

//var app = angular.module('myApp', []);
var app = angular.module('myApp', [
  'Authentication',
  'Home',
  'ngRoute',
  'ngCookies'
]);
app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
	.when('/', {
		controller: 'HomeController',
		templateUrl: 'views/index.html'
	})
    .when('/home', {
		templateUrl: 'views/home.html'
	})
	.when('/about', {
		controller: 'AboutController',
		templateUrl: 'views/about.html'
	 })
	.when('/wayto', {
		controller: 'waytoController',
		templateUrl: 'views/wayto.html'
	})
	.when('/wayto/research', {
		controller: 'waytoController',
		templateUrl: 'views/wayto-research.html'
	})
	.when('/wayto/fund', {
		controller: 'waytoController',
		templateUrl: 'views/wayto-fund.html'
	})
	.when('/wayto/mentor', {
		controller: 'waytoController',
		templateUrl: 'views/wayto-mentor.html'
	})
	.when('/wayto/learn', {
		controller: 'waytoController',
		templateUrl: 'views/wayto-learn.html'
	})
	.when('/wayto/exhibit', {
		controller: 'waytoController',
		templateUrl: 'views/wayto-exhibit.html'
	})
	.when('/commongood', {
		controller: 'commonGoodController',
		templateUrl: 'views/commongood.html'
	})
	.when('/profile', {
		controller: 'profileController',
		templateUrl: 'views/create-profile.html'
	})
	.when('/profileDetails', {
		controller: 'profileController',
		templateUrl: 'views/profile.html'
	})
	//login redirections
	.otherwise({
		redirectTo: '/'
	});
}])

app.run(['$rootScope', '$location', '$cookieStore', '$http',
  function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    /*$rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in
      var allowedPages = $.inArray($location.path(), ['/','#!', '/about', '/wayto', '/commongood', '/register', '/wayto/research', '/wayto/fund', '/wayto/mentor', '/wayto/learn', '/wayto/exhibit']) === -1;
  	  var loggedIn = $rootScope.globals.currentUser;
  		if (allowedPages && !loggedIn) {
  			$location.path('/login');
  		  }
      });*/
  }
]);

app.controller('profileController', function($scope, $http){
	  $scope.createProfile = false;
    $scope.toggle = function() {
        $scope.createProfile = !$scope.createProfile;
    };
    var emailID = [];
    $http.post("http://35.161.138.102/src/public/userDetails.php/getUserDetailsByEmailId", {"emailID": emailID}).then(function (emailID) {
        $scope.profileData = response.data;
        console.logo(response);
    });

	/*profileFactory.getprofileData().then(
			function(response){
				  //$scope.profileData = response.data;
          console.log(response);
  			},
			function(err){
				console.log(err.status);
			}
		);*/
});

app.controller('projectController', function($scope){
	$scope.createProject = false;
	$scope.toggle = function() {
		$scope.createProject = !$scope.createProject
	};
	$scope.toggleClass = function() {
		$scope.createClass = !$scope.createClass;
	};
	$scope.profileEdit = function() {
		$scope.editProfile = !$scope.editProfile;
	};
});

app.controller('IndexCtrl', function($scope){
	$scope.message = function() {
		$scope.MessageForm = !$scope.MessageForm;
	};
	$scope.search = function() {
		$scope.SearchForm = !$scope.SearchForm;
	};
});

app.factory("profileFactory", function($http){
	return {
		getprofileData  : function(emailID){
			return $http.post("http://35.161.138.102/src/public/userDetails.php/getUserDetailsByEmailId", {"emailID": emailID})
    }
	}
});


app.controller('communityCtrl', function($scope, $http) {
  $http.get("json/community.json").then(function (response) {
      $scope.communityData = response.data.data;
  });
  $http.get("json/upcomingEvents.json").then(function (response) {
      $scope.upcomingEventsData = response.data.data;
  });
});
