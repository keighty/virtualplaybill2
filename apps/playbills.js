var app = angular.module("playbillApp");

app.directive("postdetails", function() {
  return {
    restrict: "E",
    templateUrl: "/views/post_details.html",
    controller: "PostController"
  };
});

app.directive("postunit", function() {
  return {
    restrict: "E",
    templateUrl: "/views/post_unit.html",
    controller: "PostController"
  };
});

app.directive("postform", function() {
  return {
    restrict: "E",
    templateUrl: "/views/post_form.html",
    controller: "PostController"
  };
});

app.controller('AllPlaybillsController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/playbills').success(function(data) {
      $scope.playbills = data;
    }).error(function(res) {
      console.log(res);
    });

  }
]);

app.controller('PostController', ['$rootScope', '$scope', '$routeParams', '$http', '$location',
  function($rootScope, $scope, $routeParams, $http, $location) {
    // retrieve the post
    if($routeParams.postId) {
      $http.get('playbill/' + $routeParams.postId).
        success(function(data) {
          $rootScope.show = data[0];
          if (!$rootScope.show.cast) { $rootScope.show.cast = []; }
        }).
        error(function(data, status, headers, config) {
          $scope.show = { cast: [], rating: 1 };
        });
    } else {
      $scope.show = { cast: [], rating: 1 };
    }

    // edit the post
    $scope.toggleEditing = function() {
      $scope.editing = !$scope.editing;
    };

    $scope.addPlaybill = function(show) {
      $http.post('/new_post', show)
        .success(function(err, res) {
          $location.path('/');
          // TODO always redirect to index
          // TODO handle errors
        });
    };

    $scope.editPlaybill = function(show) {
      var editUrl = '/edit_post';
      $http.post(editUrl, show)
        .success(function(err, res) {
          $scope.editing = false;
        });
    };

    // delete the post
    $scope.deleteShow = function(show) {
      var deleteUrl = '/delete_post';
      $http.post(deleteUrl, show)
        .success(function(err, res) {
          $scope.editing = false;
          $location.path('/');
        });
    };
  }
]);