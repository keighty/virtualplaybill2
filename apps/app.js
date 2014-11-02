var playbills = angular.module("playbillApp", ['ngRoute']);

playbills.config(['$routeProvider', '$locationProvider',
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
        controller: 'NewPlaybillController'
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
        controller: 'PlaybillController'
      });
  }
]);

playbills.controller('PlaybillController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/playbills').success(function(data) {
      $scope.playbills = data;
      $scope.playbillRows = partition(data, 3);
    }).error(function(res) {
      console.log(res);
    });

    function partition(input, size) {
      var rows = [];
      for (var i=0; i < input.length; i+=size) {
        rows.push(input.slice(i, i+size));
      }
      return rows;
    }
  }
]);

playbills.controller('NewPlaybillController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.addPlaybill = function(show) {
      var addPlaybillUrl = 'http://localhost:3030/new_post';
      $http.post(addPlaybillUrl, show)
        .success(function(err, res) {
          $location.path('/');
          // TODO always redirect to index
          // TODO handle errors
        });
    };
  }
]);

playbills.controller('UserController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/user/profile').success(function(data) {
      $scope.user = data;
      $scope.error = "";
    }).error(function(data) {
      $scope.user = {};
      $scope.error = data;
    });
  }
]);

playbills.controller('PostController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.templates =
      [ { name: 'post_show.html', url: '/views/post_show.html'},
        { name: 'post_edit.html', url: '/views/post_form.html'} ];

    // retrieve the post
    $http.get('playbill/' + $routeParams.postId).success(function(data) {
      $scope.show = data[0];
      $scope.show.showDate = Date.parse(data[0].showDate);
      $scope.template = $scope.templates[0];
    });

    // edit the post
    $scope.showForm = function() {
      // show the form
      $scope.template = $scope.templates[1];
      // populate the form
    };
  }]);
