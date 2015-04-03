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

app.controller('PostController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'PlaybillsService',
  function($rootScope, $scope, $routeParams, $http, $location, PlaybillsService) {

    var showId = $routeParams.postId;
    if(showId) {
      PlaybillsService.show(showId).then(function(data) {
        $rootScope.show = data[0];
        if (!$rootScope.show.cast   ) { $rootScope.show.cast    = []; }
        if (!$rootScope.show.ratings) { $rootScope.show.ratings = {}; }
      });
    } else {
      $rootScope.show = { cast: [], rating: 0, ratings: {} };
    }

    $scope.addPlaybill = function(show) {
      PlaybillsService.newShow(show).then(function(data) {
        $location.path('/');
      });
    };

    $scope.toggleEditing = function() {
      $scope.editing = !$scope.editing;
    };

    $scope.editPlaybill = function(show) {
      show.rating = averageRating(show.ratings);
      PlaybillsService.editShow(show).then(function(data) {
        $scope.toggleEditing();
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

    $scope.deleteShow = function(show) {
      PlaybillsService.deleteShow(show).then(function(data) {
        $location.path('/');
      });
    };

    $scope.ratingsCount = function() {
      return $rootScope.show.ratings ? Object.keys($rootScope.show.ratings).length : 0;
    };
  }
]);
