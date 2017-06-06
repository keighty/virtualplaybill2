var Collection = function (data) {
  this.collection = data || []
}

Collection.prototype.orderByTitle = function () {
  var newCollection =  this.collection.reduce(function (acc, item) {
    var char = firstChar(item.title)
    acc[char] ? acc[char].push(item) : acc[char] = [item]
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
    var company = item.company
    acc[company] ? acc[company].push(item) : acc[company] = [item]
    return acc
  }, {})

  delete newCollection.undefined
  return newCollection
}

Collection.prototype.orderByActor = function () {
  var newCollection = this.collection.reduce(function (acc, item) {
    var cast = item.cast
    if (cast && cast.length) {
      cast.forEach(function (actor) {
        if (! actor.name) { return }
        var name = extractName(actor.name)
        var firstChar = name.toUpperCase().match(/[a-zA-z]{1}/)
        var show = {id: item._id, title: item.title}
        if (acc[firstChar]) {
          if (acc[firstChar][name]) {
            acc[firstChar][name].push(show)
          } else {
            acc[firstChar][name] = [show]
          }
        } else {
          acc[firstChar] = {}
          acc[firstChar][name] = [show]
        }
        // acc[name] ? acc[name].push(show) : acc[name] = [show]
      })
    }
    return acc
  }, {})

  function extractName (name) {
    var arr = name.split(' ')
    if (arr.length <= 1) { return name }
    var last = arr.pop()
    if (/[Vv]an/.test(arr.slice(-1).pop())) {
      last = [arr.pop(), last].join(' ')
    }

    if (/der/.test(arr.slice(-1).pop())) {
      last = [last, arr.pop(), arr.pop()].reverse().join(' ')
    }
    return last + ', ' + arr.join(' ')
  }

  console.log(newCollection)
  return newCollection
}

module.exports = Collection
