var assert = require('assert');
var Collection = require('../../../apps/service/collection')

describe('Collection', () => {
  var collection

  it('should initialize a collection', () => {
    collection = new Collection()
    assert.deepEqual([], collection.collection)
  })

  describe('orderByActor', () => {
    it('should handle first and last name for simple names', () => {
      var expected = {
        A: {'Atri, Pierre': [{ "id": "1", "title": "The Winter's Tale" }],
            'Ayeh, Jaygann': [{ "id": "1", "title": "The Winter's Tale" }]},
        B: {'Bateman, Tom': [{ "id": "1", "title": "The Winter's Tale" }]}
      }

      collection = new Collection(testDataSet.slice(0, 1))
      var orderedCollection = collection.orderByActor()

      assert.deepEqual(expected, orderedCollection)
    })

    it('should handle three names', () => {
      var expected = {
        G: {'Green, Dana': [{ "id": "2", "title": "Constellations" }]},
        M: {'Mitchell, Silas Weir': [{ "id": "2", "title": "Constellations" }]}
      }

      collection = new Collection(testDataSet.slice(1, 2))
      var orderedCollection = collection.orderByActor()

      assert.deepEqual(expected, orderedCollection)
    })

    it('should handle three names and a middle initial', () => {
      var expected = {
        H: {'Hennessy, Sara': [{ "id": "3", "title": "Feathers and Teeth" }]},
        O: {'Olson, Agatha Day': [{ "id": "3", "title": "Feathers and Teeth" }]},
        P: {'Pierce, Darius': [{ "id": "3", "title": "Feathers and Teeth" }]},
        R: {'Rodríguez, Dámaso J.': [{ "id": "3", "title": "Feathers and Teeth" }]},
      }

      collection = new Collection(testDataSet.slice(2, 3))
      var orderedCollection = collection.orderByActor()

      assert.deepEqual(expected, orderedCollection)
    })

    it('should handle van der hoovers', () => {
      var expected = {
        W: {'Weaver, Nikki': [{ "id": "4", "title": "Our New Girl" }]},
        M: {'McKinney, Paige A.': [{ "id": "4", "title": "Our New Girl" }]},
        S: {'Salmon, Atticus': [{ "id": "4", "title": "Our New Girl" }]},
        V: {'Van Noris, Todd': [{ "id": "4", "title": "Our New Girl" }],
          'Van der Noris, Todd': [{ "id": "4", "title": "Our New Girl" }]},
      }

      collection = new Collection(testDataSet.slice(3, 4))
      var orderedCollection = collection.orderByActor()

      assert.deepEqual(expected, orderedCollection)
    })
  })
})

var testDataSet = [
  { "_id":"1",
    "title":"The Winter's Tale",
    "company":"Kenneth Branagh Theatre Company",
    "director":"Robert Ashford, Kenneth Branagh",
    "rating":4,
    "cast":[
      {"index":0,"name":"Pierre Atri"},
      {"index":1,"name":"Jaygann Ayeh"},
      {"index":2,"name":"Tom Bateman"}
    ]
  },
  { "_id":"2",
    "title":"Constellations",
    "company":"Portland Center Stage",
    "director":"Chris Coleman",
    "rating":5,
    "cast": [
      {"character":"Marianne","index":0,"name":"Dana Green"},
      {"character":"Roland","index":1,"name":"Silas Weir Mitchell"}
    ]
  },
  {
    "_id":"3",
    "title":"Feathers and Teeth",
    "company":"Artists Repertory Theatre",
    "cast":[
      {"name":"Sara Hennessy","index":0,"character":"Carol"},
      {"name":"Agatha Day Olson","index":1,"character":"Chris"},
      {"name":"Darius Pierce","index":2,"character":"Arthur"},
      {"name":"Dámaso J. Rodríguez","index":3,"character":"Hugo Schmidt"}
    ]
  },
  {
    "_id":"4",
    "title":"Our New Girl",
    "company":"Corrib Theatre",
    "rating":3,
    "cast":[
      {"index":0,"name":"Nikki Weaver"},
      {"index":1,"name":"Paige A. McKinney"},
      {"index":2,"name":"Todd Van Noris"},
      {"index":3,"name":"Atticus Salmon"},
      {"index":4,"name":"Todd Van der Noris"},
    ]
  }
]
