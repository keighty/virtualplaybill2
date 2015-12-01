var DirectoryController = function ($scope, $filter, PlaybillsService){
  PlaybillsService.list().then(function (data) {
    var sortedPlaybills = $filter('orderBy')(data, "title")
    $scope.glossary = glossary(sortedPlaybills)
  })
}

function glossary (data) {
  data.forEach(function (item) { CollectionBuilder.add(item) })
  return CollectionBuilder.collection
}

CollectionBuilder = {
  collection: {'#': []},
  add: function (item) {
    if (this.isDigit(item)) { this.handleDigit(item) }
    else { this.handleString(item) }
  },
  isDigit: function (item) {
    return this.firstChar(item).match(/\d/)
  },
  firstChar: function (item) {
    return item.title && item.title.charAt(0).toUpperCase() || 'unknown'
  },
  handleDigit: function (item) {
    this.collection['#'].push(item)
  },
  handleString: function (item) {
    var temp = this.firstChar(item)
    if (this.collection[temp]) { this.collection[temp].push(item) }
    else { this.collection[temp] = [item] }
  }
}

DirectoryController.$inject = ['$scope', '$filter','PlaybillsService']

module.exports = DirectoryController
