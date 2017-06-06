var DirectoryController = function ($scope, $route, $location, $filter, PlaybillsService, CollectionService){

  var sortedPlaybills
  $scope.ordering = $location.hash() || 'title'

  $scope.$watch('ordering', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      $scope.glossary = CollectionService
                          .group(sortedPlaybills)
                          .by(newVal)
      $location.hash(newVal)
    }
  })

  var startTime = Date.now()

  PlaybillsService.list().then(function (data) {
    sortedPlaybills = $filter('orderBy')(data, $scope.ordering)

    $scope.glossary = CollectionService
                        .group(sortedPlaybills)
                        .by($scope.ordering)
  })
}

DirectoryController.$inject = ['$scope', '$route', '$location', '$filter','PlaybillsService', 'CollectionService']

module.exports = DirectoryController
