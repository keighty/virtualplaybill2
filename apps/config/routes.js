module.exports = function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.html5Mode({
    requireBase: false
  });
  $routeProvider.
    when('/show/:id', {
      templateUrl: '/views/show.html',
      controller: 'ShowController'
    }).
    when('/add_show', {
      templateUrl: '/views/show_new.html',
      controller: 'ShowController'
    }).
    when('/directory', {
      templateUrl: '/views/directory.html',
      controller: 'DirectoryController'
    }).
    when('/about', {
      templateUrl: '/views/about.html',
      controller: 'DirectoryController'
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