var CollectionService = function () {
  var collection

  return {
    group: function (collection) {
      this.collection = collection
      return this
    },
    by: function (category) {
      switch (category) {
        case 'title':
          return orderByTitle(this.collection)
        case 'company':
          return orderByCompany(this.collection)
        default:
          return orderByTitle(this.collection)
      }
    }
  }

  function orderByTitle (collection) {
    var newCollection =  collection.reduce(function (acc, item) {
      var first = firstChar(item.title)
      if (typeof(acc[first]) === 'undefined') {
        acc[first] = []
      }
      acc[first].push(item)
      return acc
    }, {})

    delete newCollection.undefined
    return newCollection
  }

  function orderByCompany (collection) {
    var newCollection =  collection.reduce(function (acc, item) {
      var first = item.company
      if (typeof(acc[first]) === 'undefined') {
        acc[first] = []
      }
      acc[first].push(item)
      return acc
    }, {})

    delete newCollection.undefined
    return newCollection
  }

  function firstChar (str) {
    if (!str) { return }
    switch(true) {
      case /^[0-9]/.test(str):
        return '#'
      case /^[Tt]he\s\s*/.test(str):
        return firstChar(str.replace(/^[Tt]he\s+/, ''))
      case /^[a-zA-Z]/.test(str):
        return str.charAt(0).toUpperCase()
      default:
        return firstChar(str.substring(1))
    }
  }
}

module.exports = CollectionService
