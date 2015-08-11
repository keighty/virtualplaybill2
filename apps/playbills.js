var app = angular.module("playbillApp");

app.directive("showdetails", function() {
  return {
    restrict: "E",
    templateUrl: "/views/show_details.html",
    controller: "ShowController"
  };
});

app.directive("showunit", function() {
  return {
    restrict: "E",
    templateUrl: "/views/show_unit.html",
    controller: "ShowController"
  };
});

app.directive("showform", function() {
  return {
    restrict: "E",
    templateUrl: "/views/show_form.html",
    controller: "ShowController"
  };
});

app.controller('AllPlaybillsController', ['$scope', 'PlaybillsService',
  function($scope, PlaybillsService) {
    PlaybillsService.list().then(function(data) {
      $scope.playbills = data;
    });
  }
]);

app.controller('ShowController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'PlaybillsService',
  function($rootScope, $scope, $routeParams, $http, $location, PlaybillsService) {
    $scope.contentLoaded = false;
    var showId = $routeParams.id;
    if(showId) {
      PlaybillsService.show(showId).then(function(data) {
        $rootScope.show = data[0];
        if (!$rootScope.show.cast   ) { $rootScope.show.cast    = []; }
        if (!$rootScope.show.ratings) { $rootScope.show.ratings = {}; }
        $rootScope.show.location = $location.absUrl();
        $scope.contentLoaded = true;
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
