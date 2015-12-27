var PlaybillsController = function($scope, PlaybillsService) {
  PlaybillsService.list().then(function(data) {
    $scope.playbills = data;
    angular.element('.loading-gif').addClass('hidden')
  });
}

PlaybillsController.$inject = ['$scope', 'PlaybillsService']

module.exports = PlaybillsController
