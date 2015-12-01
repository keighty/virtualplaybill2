var DirectoryController = function ($scope, $filter, PlaybillsService){
  PlaybillsService.list().then(function (data) {
    var sortedPlaybills = $filter('orderBy')(data, "title")
    $scope.glossary = glossary(sortedPlaybills)
  })
}

function glossary (data) {
  var collection = {'#': []}

  data.forEach(function (item) {
    var firstChar = item.title.charAt(0).toUpperCase()

    if (firstChar.match(/\d/)) { collection['#'].push(item) }
    else { stringTitle(firstChar, item) }
  })

  function stringTitle (char, item) {
    if (collection[char]) { collection[char].push(item) }
    else { collection[char] = [item] }
  }

  return collection
}

DirectoryController.$inject = ['$scope', '$filter','PlaybillsService']

module.exports = DirectoryController
