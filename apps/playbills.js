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

app.controller('AllPlaybillsController', ['$scope', 'PlaybillsService',
  function($scope, PlaybillsService) {
    PlaybillsService.list().then(function(data) {
      $scope.playbills = data;
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
          if (!$rootScope.show.cast   ) { $rootScope.show.cast    = []; }
          if (!$rootScope.show.ratings) { $rootScope.show.ratings = {}; }
        }).
        error(function(data, status, headers, config) {
          $rootScope.show = { cast: [], rating: 0, ratings: {} };
        });
    } else {
      $rootScope.show = { cast: [], rating: 0, ratings: {} };
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
      show.rating = averageRating(show.ratings);
      var editUrl = '/edit_post';
      $http.post(editUrl, show)
        .success(function(err, res) {
          $scope.editing = false;
        });
    };

    var averageRating = function(allRatings) {
      var userCount = 0,
          userRating = 0;

      for (var k in allRatings){
        userCount += 1;
        userRating += allRatings[k];
      }

      return Math.ceil(userRating / userCount);
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

    $scope.ratingsCount = function() {
      return $rootScope.show.ratings ? Object.keys($rootScope.show.ratings).length : 0;
    };
  }
]);