var app = angular.module("playbillApp");

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider.
      when('/post/:postId', {
        templateUrl: '/views/post.html',
        controller: 'PostController'
      }).
      when('/add_post', {
        templateUrl: '/views/post_form.html',
        controller: 'PostController'
      }).
      when('/signin', {
        templateUrl: '/views/signin.html',
        controller: 'UserController'
      }).
      when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'UserController'
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