var CalendarController = function ($scope) {
  $scope.dates = getYears(2014)
}

function getYears(startYear) {
  var thisYear = (new Date()).getFullYear()
  var years = []
  for (var i = +startYear; i <= thisYear; i++) {
    years.push(i)
  }
  return years
}


CalendarController.$inject = ['$scope', '$route', '$location', '$filter','PlaybillsService']

module.exports = CalendarController
