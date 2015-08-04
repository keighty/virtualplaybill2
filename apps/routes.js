var app = angular.module("playbillApp");

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider.
      when('/post/:postId', {
        templateUrl: '/views/post_show.html',
        controller: 'PostController'
      }).
      when('/add_post', {
        templateUrl: '/views/post_new.html',
        controller: 'PostController'
      }).
      when('/directory', {
        templateUrl: '/views/directory.html',
        controller: 'AllPlaybillsController'
      }).
      when('/signin', {
        templateUrl: '/views/signin.html'
      }).
      when('/signup', {
        templateUrl: '/views/signup.html'
      }).
      when('/logout', {
        templateUrl: '/views/signin.html',
        controller: function() {
          window.location.reload();
        }
      }).
      when('/', {
        templateUrl: 'views/index.html',
        controller: 'AllPlaybillsController'
      });
  }
]);