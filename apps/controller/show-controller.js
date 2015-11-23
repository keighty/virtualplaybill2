var ShowController = function ($rootScope, $scope, $routeParams, $http, $location, PlaybillsService) {
  $scope.contentLoaded = false
  var showId = $routeParams.id
  if(showId) {
    PlaybillsService.show(showId).then(function (data) {
      $rootScope.show = data[0]
      if (!$rootScope.show.cast) $rootScope.show.cast = []
      if (!$rootScope.show.ratings) $rootScope.show.ratings = {}
      $rootScope.show.location = $location.absUrl()
      $scope.contentLoaded = true
    })
  } else {
    $rootScope.show = { cast: [], rating: 0, ratings: {} }
  }

  $scope.addPlaybill = function (show) {
    PlaybillsService.newShow(show).then(function(data) {
      $location.path('/')
    })
  }

  $scope.toggleEditing = function () { $scope.editing = !$scope.editing }
  $scope.cancelEdit = $scope.toggleEditing

  $scope.editPlaybill = function (show) {
    show.rating = averageRating(show.ratings)
    PlaybillsService.editShow(show).then(function(data) {
      $scope.toggleEditing()
    })
  }

  var averageRating = function (allRatings) {
    var userCount = 0,
        userRating = 0

    for (var k in allRatings){
      userCount += 1
      userRating += allRatings[k]
    }

    return Math.ceil(userRating / userCount)
  }

  $scope.deleteShow = function (show) {
    PlaybillsService.deleteShow(show).then(function(data) {
      $location.path('/')
    })
  }

  $scope.ratingsCount = function () {
    return $rootScope.show.ratings ? Object.keys($rootScope.show.ratings).length : 0
  }
}

ShowController.$inject = ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'PlaybillsService']

module.exports = ShowController
