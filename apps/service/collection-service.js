var CollectionService = function () {
  var collection

  return {
    group: function (collection) {
      this.collection = new Collection(collection)
      return this
    },
    by: function (category) {
      switch (category) {
        case 'title':
          return this.collection.orderByTitle()
        case 'company':
          return this.collection.orderByCompany()
        default:
          return this.collection.orderByTitle()
      }
    }
  }
}

var Collection = function (data) {
  this.collection = data || {}
}

Collection.prototype.orderByTitle = function () {
  var newCollection =  this.collection.reduce(function (acc, item) {
    var first = firstChar(item.title)
    if (typeof(acc[first]) === 'undefined') {
      acc[first] = []
    }
    acc[first].push(item)
    return acc
  }, {})

  delete newCollection.undefined
  return newCollection

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

Collection.prototype.orderByCompany = function () {
  var newCollection =  this.collection.reduce(function (acc, item) {
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

module.exports = CollectionService
