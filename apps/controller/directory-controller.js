var DirectoryController = function ($scope, $route, $filter, PlaybillsService){
  var sortedPlaybills
  $scope.ordering = 'title'

  $scope.$watch('ordering', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      $scope.glossary = glossary(sortedPlaybills, newVal)
      newrelic.addPageAction("directory", {ordering: $scope.ordering})
    }
  })

  PlaybillsService.list().then(function (data) {
    sortedPlaybills = $filter('orderBy')(data, $scope.ordering)
    $scope.glossary = glossary(sortedPlaybills, $scope.ordering)
  })
}

function glossary (data, sortBy) {
  CollectionBuilder.initializeCollection(sortBy)
  data.forEach(function (item) { CollectionBuilder.add(item) })
  return CollectionBuilder.collection
}

CollectionBuilder = {
  initializeCollection: function (sortBy) {
    this.collection = {}
    this.sortBy = sortBy
  },
  add: function (item) {
    if (this.isDigit(item)) { this.handleDigit(item) }
    else { this.handleString(item) }
  },
  isDigit: function (item) {
    return this.firstChar(item).match(/\d/)
  },
  firstChar: function (item) {
    return item[this.sortBy] && item[this.sortBy].charAt(0).toUpperCase() || 'unknown'
  },
  handleDigit: function (item) {
    if (this.collection['#']) this.collection['#'].push(item)
    else this.collection['#'] = [item]
  },
  handleString: function (item) {
    var temp
    if (this.sortBy === 'title') {
      temp = this.firstChar(item)
    } else {
      temp = item[this.sortBy]
    }
    if (this.collection[temp]) { this.collection[temp].push(item) }
    else { this.collection[temp] = [item] }
  }
}

DirectoryController.$inject = ['$scope', '$route', '$filter','PlaybillsService']

module.exports = DirectoryController
