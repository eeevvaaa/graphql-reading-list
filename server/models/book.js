const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	// mongoDB generates id
	name: String,
	genre: String,
	authodId: String
});

// model - collection
module.exports = mongoose.model('Book', bookSchema);
