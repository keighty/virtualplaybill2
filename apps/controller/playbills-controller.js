var PlaybillsController = function($scope, PlaybillsService) {
  PlaybillsService.list().then(function(data) {
    $scope.playbills = data;
  });
}

PlaybillsController.$inject = ['$scope', 'PlaybillsService']

module.exports = PlaybillsController
