var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// set schema
var wordSchema   = new Schema({
    id: Number,
    english_word: String,
    part_of_speech: String,
    malayalam_definition: String
}, { collection : 'words' });

module.exports = mongoose.model('Word', wordSchema);