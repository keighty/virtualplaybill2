var mongoose = require('mongoose');

var showSchema = mongoose.Schema({
  title : String,
  company : String,
  author : String,
  music : String,
  director: String,
  choreographer : String,
  synopsis: String,
  showDate : { type: Date, default: Date.now },
  imageUrl: String,
  userId : String,
  postAuthor : String,
  submitted : Number,
  cast : { type : Object , "default" : {} },
  rating: Number,
  ratings: {type : Object, "default" : {} },
  venue: String
});

var Show = mongoose.model('Show', showSchema, 'shows');
module.exports = Show;
