const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { columns } = require('./show_attributes')

const showSchema = mongoose.Schema(columns);

const Show = mongoose.model('Show', showSchema, 'shows');
module.exports = Show;
