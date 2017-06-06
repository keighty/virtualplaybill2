var Collection = require('./collection')

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
          return this.collection.orderByActor()
      }
    }
  }
}

module.exports = CollectionService
