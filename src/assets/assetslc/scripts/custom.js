//materialize initiation starts here...
$('.carousel').carousel();
$('.carousel').carousel({full_width: true});
$('select').material_select();
//materialize initiation ends here...

//home page parallaz navigation...
$(".prallaxNav a").click(function() {
	$('.prallaxNav a').removeClass('active');
	$(this).addClass('active');
	var myID = $(this).attr('href').split('#')[1];
	//alert(myID);
    $('html, body').animate({
        scrollTop: $("#"+myID).offset().top
    }, 1000);
});


//$('.scrollspy').scrollSpy();

$('.menu, #slide-out a').on('click', function(e){
	//e.preventDefault();
	$('body').toggleClass('nav-expanded');
	if($('body').hasClass('nav-expanded')){
		$('.menu').addClass('open');
	} else{
		$('.menu').removeClass('open');
	}
	//Materialize.showStaggeredList('#slide-out ul');

});

$(document).ready(function(){
	setInterval(function(){
		var len = $('.heading h1').length,
			pos = $('.heading h1.active').index();
		if(pos == len -1 ){
			$('.heading h1:first-child').addClass('active fadeUp').siblings().removeClass('active fadeUp');
		}
		else {
			$('.heading h1.active').removeClass('active fadeUp').next().addClass('active fadeUp');
		}
	}, 6000);

});

//Custom Modal
$('.open-modal').on('click', function(){
	var myID = $(this).attr('href').split('#')[1];
	$('#'+myID).addClass('active');
	$('body').css('overflow', 'hidden');
});

$('.custom-Modal .close-modal').on('click', function(){
	$(this).parents('.custom-Modal').removeClass('active');
	$('body').css('overflow', '');
});





//Angular JS

var app = angular.module('myApp', []);
//Community  and upcomingEvents data population from server...
app.controller('communityCtrl', function($scope, $http) {
  $http.get("/json/community.json").then(function (response) {
      $scope.communityData = response.data.data;
  });
  $http.get("/json/upcomingEvents.json").then(function (response) {
      $scope.upcomingEventsData = response.data.data;
  });
});

//Request Invite Controller...
app.controller('inviteController', function($scope, $http) {
      // create a blank object to handle form data.
        $scope.user = {};
		var data = $scope.user;
      // calling our submit function.
        $scope.submitForm = function() {
        // Posting data to php file
        $http({
          method  : 'POST',
          url     :  '/php/invite.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              //$scope.errorName = data.errors.name;
              //$scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
			 // console.log(data);
            } else {
              $scope.message = data.message;
            }
          });
        };
});

//Request Invite Controller...
app.controller('loginController', function($scope, $http) {
      // create a blank object to handle form data.
        $scope.user = {};
		var data = $scope.user;
		console.log(data);
      // calling our submit function.
        $scope.submitLoginForm = function() {
        // Posting data to php file
        $http({
          method  : 'POST',
          url     :  'http://35.161.138.102/src/public/userDetails.php/checkLogin',
          data    : data, //forms user object

    crossDomain: true, //simple way to overcome browser restrictions when sending request from different domains from the client
    dataType: 'jsonp',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              //$scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.password;
              $scope.errorEmail = data.errors.email;
			 // console.log(data);
            } else {
              $scope.message = data.message;
            }
          });
        };
});

app.controller('regController', function($scope, $http) {
	$scope.submitRegForm=function(){
        ///* while compiling form , angular created this object
        var data=$scope.user;
		//console.log(data);
        /* post to server*/
        $http.post(url, data);
    }

});

app.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
}]);
