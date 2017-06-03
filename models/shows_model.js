const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const showSchema = mongoose.Schema({
  title: String,
  company: String,
  author: String,
  music: String,
  director: String,
  choreographer: String,
  lyrics: String,
  synopsis: String,
  showDate: { type: Date, default: Date.now },
  imageUrl: String,
  userId: String,
  postAuthor: String,
  submitted: Number,
  cast: { type: Object , "default": {} },
  rating: Number,
  ratings: {type: Object, "default": {} },
  venue: String,
  scenery: String,
  review: String,
});

const Show = mongoose.model('Show', showSchema, 'shows');
module.exports = Show;
